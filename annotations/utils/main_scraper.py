from recipe_scrapers import scrape_me
import requests
from bs4 import BeautifulSoup
import bs4
import uuid
import json
import os
import jsonlines
import typing
from numpy import nan as nr
from typing import List
import re
from utils.general.scraper_utils import *
from utils.tasks.allergens_intolerances import *
from utils.tasks.ocassion_task import *


def scrape(url: str, class_: str, tag_id: str) -> bs4.element.ResultSet:
    '''
    Takes the url, HTML class and tag and reutrns the associated HTML
    '''
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    if class_ != '':
        return soup.find_all(tag_id, class_= class_)
    else:
        return soup.find_all(tag_id)


def bbc_dict_scrape(recipe_list_urls: List, list_dict: List, name: str):
    '''
    Utilises the Scraper module. If a schmea doesn't exist, BeautifulSoup will be instead utilised.
    Returns the scraped data as a dict.
    This is thus far utilised for BBC
    '''
    name = name.replace('&amp;', '')
    # give the url as a string, it can be url from any site listed below
    for i, r_url in enumerate(recipe_list_urls):
        scraper = scrape_me(r_url)
        recipe_dict = {}
        temp_dict = {}
        try:
            temp_dict['name'] = scraper.title()
        except:
            try:
                #print('no ingredients')
                header_soup = scrape(url=r_url,
                        class_='post-header__title post-header__title--masthead-layout heading-1', tag_id='h1')
                header=str(header_soup[0])
                header_name = cleanhtml(header)
                header_name = header_name.replace('&amp;', '')
                temp_dict['name'] = header_name
            except:
                print('Failed to extract any names, skipping')
                temp_dict['name'] = name
                pass
            pass
        try:
            temp_dict['ingredients'] = str(scraper.ingredients()).replace('[', '').replace(']', '')
        except:
            try:
                #print(' no ingredients')
                ingredient_soup=scrape(url=r_url, class_='pb-xxs pt-xxs list-item list-item--separator', tag_id='li')
                ingredient_list, ingredients = [], []
                [ingredient_list.append(str(ingredient)) for ingredient in ingredient_soup]
                for ingredient in ingredient_list:
                    ingredients.append(cleanhtml(ingredient))
                temp_dict['ingredients'] = str(ingredients).replace('[', '').replace(']', '')
            except:
                #print('failed to get any ingredients, skipping')
                continue
            #print('Obtained ingredients via other means')
            pass
        try:
            temp_dict['instructions'] = scraper.instructions()
        except:
            try:
                instruction_soup = scrape(url=r_url, class_='editor-content', tag_id='div')
                instructions = instruction_soup[1:]
                instruction_values = [cleanhtml(str(x)) for x in list(instructions)]
                instruction_values = list(filter(None, instruction_values))
                temp_dict['instructions'] = ' '.join(instruction_values)
            except:
                temp_dict['instructions'] = str(nr)
                pass
        try:
            temp_dict['serves'] = scraper.yields()
        except:
            try:
                serve_soup = scrape(url=r_url, class_='icon-with-text__children', tag_id='div')
                for serve_ in serve_soup:
                    if 'serve' in str(serve_).lower():
                        serve = str(serve_)
                serve = cleanhtml(serve)
                temp_dict['serves'] = serve.replace('Serves ', '')
            except:
                temp_dict['serves'] = str(nr)
                pass
        try:
            temp_dict['time'] = scraper.total_time()
        except:
            try:
                time_type_soup = scrape(url=r_url, class_='body-copy-bold mr-xxs', tag_id='span')
                time_unit_soup = scrape(url=r_url, class_='', tag_id='time')
                keys = [cleanhtml(str(x)) for x in list(time_type_soup)]
                values = [cleanhtml(str(x)) for x in list(time_unit_soup)]
                time_dict = dict(zip(keys, values))
                temp_dict['time'] = time_dict
            except:
                temp_dict['time'] = str(nr)
                pass

        try:
            temp_dict['nutrients'] = scraper.nutrients()
        except:
            try:
                key_soup=scrape(url=r_url, class_='key-value-blocks__key', tag_id='td')
                value_soup=scrape(url=r_url, class_='key-value-blocks__value', tag_id='td')
                # fetch nutritional info
                keys = [cleanhtml(str(x)) for x in list(key_soup)]
                values = [cleanhtml(str(x)) for x in list(value_soup)]
                nutrition = dict(zip(keys, values))
                temp_dict['nutrients'] = nutrition
            except:
                temp_dict['nutrients'] = str(nr)
                #print('failed to get any ingredients, skipping')
                pass
        temp_dict['uuid'] = str(uuid.uuid4())
        recipe_dict['recipe'] = temp_dict

        list_dict.append(recipe_dict)


def  scraper_fn(url: str, allergen_task_: bool, ocassion_task_bool: bool,  recipe_count: int, name: str, dir_name: str, ds: str) -> int:

    if not isinstance(url, List):
        # Fetch all recipes
        link_list = fetch_url(tag_='a', url=url, class_="standard-card-new__article-title qa-card-link")
        recipe_list, recipe_list_urls = [], []
        [recipe_list.append(str(l)) for l in link_list]
        [recipe_list_urls.append(format(recipe)) for recipe in recipe_list]
        recipe_count += len(recipe_list_urls)
        recipe_list_dict = []
        # Redudancy - refactor
        if 'bbc' in ds:
            bbc_dict_scrape(recipe_list_urls=recipe_list_urls, list_dict=recipe_list_dict, name = name)
        if allergen_task_ is True:
            allergens_fn(recipe_list_dict=recipe_list_dict, fn=name, ds=ds)
        if ocassion_task_bool is True:
            ocassion_fn(recipe_list_dict=recipe_list_dict, fn=name, ds=ds)

        #Write the data out
        recipes_ = {}
        for i, d in enumerate(recipe_list_dict):
            recipes_[i] = d
        with open(f'{os.getcwd()}/data/{ds}/output/json/{dir_name}{name}', 'w') as w:
            json.dump(recipes_, w )
    else:
        # Paginated
        recipe_list, recipe_list_urls = [], []
        recipe_list_dict = []
        for page_url in url:
            link_list = fetch_url(tag_='a', url=page_url, class_="standard-card-new__article-title qa-card-link")
            [recipe_list.append(str(l)) for l in link_list]
            [recipe_list_urls.append(format(recipe)) for recipe in recipe_list]
            recipe_count += len(recipe_list_urls)
            if 'bbc' in ds:
                bbc_dict_scrape(recipe_list_urls=recipe_list_urls, list_dict=recipe_list_dict, name=name)
        if allergen_task_ is True:
            allergens_fn(recipe_list_dict=recipe_list_dict, fn=name, ds=ds)
        if ocassion_task_bool is True:
            ocassion_fn(recipe_list_dict=recipe_list_dict, fn=name, ds=ds)

        #Write the data out
        recipes_ = {}
        for i, d in enumerate(recipe_list_dict):
            recipes_[i] = d
        with open(f'{os.getcwd()}/data/{ds}/output/json/{dir_name}{name}.json', 'w') as w:
            json.dump(recipes_, w )
    return recipe_count

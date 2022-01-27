import requests
from bs4 import BeautifulSoup
import bs4
import uuid
import json
import os
import jsonlines
import typing
from typing import List
import re

def cleanhtml(raw_html: str) -> str:
    '''
    This function will remove any HTML elements from the body of text given
    '''
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext

def fetch_url(tag_: str, url: str, class_: str) -> List:
    '''
    This will return any BeautifulSoup related HTML data from the URL given
    The associated data will be returned for anything in the given tag and class
    '''
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    return [a['href'] for a in soup.find_all(tag_, class_, href=True) if a.text]

def fetch_main_urls(url_list: List, recipe_url_list: List, url_main: str ):
    '''
    Fetches all the URLs from the associated recipe sites

    Requires the list of urls to be fetched i.e. from a config with associated collection names

    Void method, appends to list given in memory
    '''
    print('Fetching main URLs')
    for recipe_url in url_list:
        recipe_collection_name = recipe_url.replace(url_main, '')

        # Fetch all recipes from BBC good foods
        link_list = fetch_url(tag_='a', url=recipe_url, class_="standard-card-new__article-title qa-card-link")
        pag_list = fetch_url(tag_='a', url=recipe_url, class_="pagination-item")
        if len(pag_list) == 0:
            recipe_url_list.append(recipe_url)
        # Check for other pages
        if len(pag_list) > 0:
            pagination_list = []
            pagination_list.append(recipe_url)
            pagination_l,pag_url = [], []
            [pagination_l.append(str(l)) for l in pag_list]
            [pag_url.append(format(p)) for p in pagination_l]
            pagination_numbers = set([u.split('/')[-1] for u in pag_url])

            for i in pagination_numbers:
                pagination_list.append(f'{recipe_url}/{i}')
            recipe_url_list.append(pagination_list)
    print('Finished fetching URLS')

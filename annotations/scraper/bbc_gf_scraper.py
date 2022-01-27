from recipe_scrapers import scrape_me
import requests
from bs4 import BeautifulSoup
import bs4
import uuid
import json
import os, sys
import typing
from numpy import nan as nr
from typing import List
import re
sys.path.insert(1, '..')
from utils.general.scraper_utils import *
from utils.main_scraper import *
from os.path import dirname


url_list = []
with open(f'{dirname(os.getcwd())}/configs/bbc_config.txt') as line:
    for l in line:
        url_list.append(l.replace('\n', ''))

recipe_count = 0
recipe_url_list = []
format = lambda x: x.split('>')[0].split('href=')[1].replace('"', '')


# Fetch URLs
fetch_main_urls(url_list=url_list, recipe_url_list=recipe_url_list, url_main='https://www.bbcgoodfood.com/recipes/collection/')

print('Scraping data now')
for url in recipe_url_list:
    if not isinstance(url, List):
        name = url.replace('https://www.bbcgoodfood.com/recipes/collection/', '')
        name = name.replace('/', '-')
        url = cleanhtml(url)
        url = url.replace('/a>', '')
    else:
        name = url[0].replace('https://www.bbcgoodfood.com/recipes/collection', '').split('/')[1]
        name = name.replace('/', '-')
        url = [cleanhtml(u) for u in url]
        url = [u.replace('/a>', '') for u in url]

    recipe_count += scraper_fn(url=url , allergen_task_=True, ocassion_task_bool=True, recipe_count=recipe_count,
                                name=name, dir_name='/bbc_foods_full_', ds='bbc')

print(f"counted {recipe_count} recipes")

# NEED TO WRITE OUT NORMAL DATA TOO, MODULARISE THE TASKS

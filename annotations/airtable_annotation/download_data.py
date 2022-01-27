import airtable
import requests
from config.secrets import base_airtable_raw, base_airtable_prep, api_key_airtable, aws_access_key_id, aws_secret_access_key
from config.configs import region_name, endpoint_name, table_name
import typing
import pandas as pd
from collections import OrderedDict, Counter
import json
from typing import Dict, List
import jsonlines
import os

def fetch_names(url: str, api_key_airtable: str) -> List:
# Raw
    ingredients = []
    headers = {"Authorization": f"Bearer {api_key_airtable}" }
    offset_list = []
    counter=0
    while True:
        if counter == 0:
            response = requests.get(
                url,
                headers=headers,
            )
        else:
            response = requests.get(
                url,
                headers=headers,
                params={'offset': offset_list[counter-1]}
            )
        json_response = response.json()
        try:
            offset = json_response['offset']
        except:
            print(f'Finished at iteration {counter}')
            break
        offset_list.append(offset)
        if counter > 0:
            print(offset_list[counter], offset_list[counter-1])
            if offset_list[counter] == offset_list[counter - 1]:
                print(f'Finished at iteration {counter}')
                break
            else:
                for i in json_response['records']:
                    ingredients.append(str(i['fields']['name']))
                counter += 1
        else:
            for i in json_response['records']:
                ingredients.append(str(i['fields']['name']))
            counter += 1
    return ingredients

# Extend to work with config file for any datasource, need a dictionary of keys and [names, sources]
ds = 'bbc'
# Alter as needed
prep_key, raw_key = 'app6rrsSpdToK8AtF', 'app7tCGsvW9oNciys'
prep_ingredients_list = fetch_names(url=f'https://api.airtable.com/v0/{prep_key}/Nutrient%20Annotation?&view=Grid%20view', api_key_airtable=api_key_airtable)
raw_ingredients_list = fetch_names(f'https://api.airtable.com/v0/{raw_key}/Nutrient%20Annotation?&view=Grid%20view', api_key_airtable=api_key_airtable)

names = set(prep_ingredients_list) | set(raw_ingredients_list)

name_list = []
for n in names:
    name_list.append({'ingredients': n, 'label': [], 'meta': {'source': ds}})

# Transform to JSONL with name field and empty labels
with jsonlines.open(f'{os.getcwd()}/data/{ds}/output/ner/airtable/{ds}_foods_allergens_airtable.jsonl', 'w') as writer:
    writer.write_all(name_list)

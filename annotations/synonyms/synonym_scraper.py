import json
import re
import requests
import pandas as pd
import json
from bs4 import BeautifulSoup
import os
import time
import typing
import os
from utils.general.scraper_utils import *
import glob


# Request on url header - https://www.synonym.com/synonyms/

def synoymn_finder(name: str, dict: typing.Dict, iterator: int, length: int):
    #time.sleep(1) # Let's just wait a second... requests can be tough work to servers. Be kind.
    try:
        # Step 1: We will set up the HTTP request to get the raw content with our food
        print(name)
        name = 'thermometer'
        html_content = requests.get(f'https://www.synonym.com/synonyms/{name}').text

        # Step 2: We will now parse the HTML content
        soup = BeautifulSoup(html_content, 'lxml')

        # Step 3: We will now fetch the main tag
        meta = soup.find_all('meta')
        finder = re.findall(fr'"{name} | = .*?;', str(meta))

        # Step 4: Convert variable to a JSON
        #var_json_list = finder[0].replace(foodb_name_list[0].capitalize(), '').lstrip('[').lstrip('{').rstrip(';').rstrip(']').rstrip('}').split('},{')
        synoymn_list  = []
        for synoymn in meta:
            if f'="{name} | ' in str(synoymn):
                if '"twitter' not in synoymn:
                    #print('f',synoymn)
                    synoymn_list.append(synoymn)

        synoymn_l = str(synoymn_list[0]).split('|')
        for i, s in enumerate(synoymn_l):
            if 'synonyms' in s:
                index = i

        synoymn_list = cleanhtml(synoymn_l[index].replace(' synonyms: ', '').replace('property="og:description"/>', '').replace('"', ''))

        synoymn_list = synoymn_list.split(',')
        synoymn_list = [x.lstrip(' ').rstrip(' ') for x in synoymn_list]
        synoymn_list = [cleanhtml(x) for x in synoymn_list]

        dict[name.capitalize()] = ','.join(synoymn_list)
        if iterator % 10 == 0:
            print(f"Iteration: {iterator}")
        if iterator == length - 1:
            print("Last iteration to go!\n")
    except:
        dict[name.capitalize()] = 'Not found'


# Fetch relevant files
data_file_list = []
with open(f'{os.getcwd()}/datasources.txt', 'r') as d:
    ds = d.read()
    ds = ds.rstrip('\n')
    data_file_list.append(glob.glob(f'{os.getcwd()}/data/{ds}/output/ner/airtable/*.jsonl'))

json_data = []
for file in data_file_list:
    with open(file[0]) as f:
        for line in f:
            json_data.append(json.loads(line))

name_list = []
for name in json_data:
    name_list.append(name['ingredients'])

food_df = pd.DataFrame(name_list, columns={'name'})
food_name_list = food_df['name']
# Init dict
synoymn_name_dict = {}

for i, name in enumerate(food_name_list):
    synoymn_finder(name, synoymn_name_dict, i, len(food_name_list))

synoymn_df = pd.DataFrame.from_dict(synoymn_name_dict, orient='index')
synoymn_df.columns = ['synoymn']
synoymn_df['name'] = synoymn_df.index
synoymn_df.reset_index(drop=True, inplace=True)
synoymn_df = synoymn_df[['name', 'synoymn']]
synoymn_df['synoymn'] = synoymn_df['synoymn'].str.replace('property="og:description"/>', '')
synoymn_df['synoymn'] = synoymn_df['synoymn'].str.replace('" ', '')

synoymn_df_name_found = synoymn_df[~synoymn_df['synoymn'].str.contains("Not found")]
synoymn_df_name_found.reset_index(inplace=True, drop=True)
#del synoymn_df_name_found['index']

food_db_synoymn_merged_df = synoymn_df_name_found.merge(food_df, on='name')
food_db_synoymn_merged_df.to_csv(f'{os.getcwd()}/', sep='\t', index=None)

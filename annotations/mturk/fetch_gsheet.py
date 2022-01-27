import pandas as pd
import os
from numpy import NaN
from algoliasearch.search_client import SearchClient
import json
from collections import Counter
import gspread
import df2gspread as d2g
from gspread_dataframe import set_with_dataframe
import oauth2client as o2c
import collections
import re

def get_df(i, name, sh):
    df = pd.DataFrame(sh.get_worksheet(i+2).get_all_records())
    df['cuisine'] = name
    df.columns = ['starters & side dishes', 'main', 'desserts', 'cuisine']
    return df

def resturant_id_list(df):
    restaurant_counter = 0
    restaurant_id = f'restaurant_id_{restaurant_counter}'
    id_list = []
    for index, row in df.iterrows():
        id_list.append(restaurant_id)
        if row['main'] == '-' and row['starters & side dishes'] == '-' and row['desserts'] == '-':
            restaurant_id = f'restaurant_id_{restaurant_counter}'
            restaurant_counter += 1
    return id_list

def fetch_sheet(cwd):
    if cwd is '':
        cwd = f'{os.getcwd()}/credentials'


    gc = gspread.service_account(filename=f'{cwd}/google_api_key.json')
    url = 'https://docs.google.com/spreadsheets/d/1m8S44S4E36TLBfG-3c6YQCsUY4ag92MdhBLD2-ZDdbY/edit?ts=60dc6e6f#gid=348719994'
    sh = gc.open_by_url(url)

    worksheet_names = sh.worksheets()[2:]
    menu_names = [str(x).split("'")[1] for x in worksheet_names]
    # Get the spreadsheets
    # s.sheets[:]
    # Cuisine dataframes

    gsheet_df_list = []
    for i, name in enumerate(menu_names):
        gsheet_df_list.append(get_df(i, name, sh))
        #test_df = get_df(i, name)
    df = pd.concat(gsheet_df_list)

    id_list = resturant_id_list(df)
    df['restaurant_id'] = id_list

    # to_drop = []
    # for i, row in df.iterrows():
    #     if row['main'] == '-' and row['starters & side dishes'] == '-' and row['desserts'] == '-':
    #         to_drop.append(i)
    #
    #
    # df = df.drop(list(set(to_drop)))
    # df.to_csv(f'{os.getcwd()}/mturk/data/gsheets.tsv', '\t', index=False)
    gsheet_titles = []
    for dataframe in gsheet_df_list:
        dataframe.columns = ['starters & side dishes', 'main', 'desserts', 'cuisine']
        gsheet_titles.append(dataframe['starters & side dishes'].tolist())
        gsheet_titles.append(dataframe['main'].tolist())
        gsheet_titles.append(dataframe['desserts'].tolist())

    flatten_list = [item for sublist in gsheet_titles for item in sublist]
    # Menu count
    menu_collection = collections.Counter(flatten_list)
    menu_count = menu_collection['-']/3
    print(f'Number of menus is: {menu_count}')

    gsheet_titles_clean = [x for x in flatten_list if str(x) != 'nan']
    gsheet_titles_clean = [x for x in gsheet_titles_clean if str(x) != '-']
    gsheet_titles_clean = [x.upper() for x in gsheet_titles_clean]
    # ran = df.sample(n=15, replace=False)
    # ran.to_csv(f'{os.getcwd()}/mturk/data/15_random.csv', index=False)
    return gsheet_titles_clean, df

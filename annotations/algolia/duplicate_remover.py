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

cwd = f'{os.getcwd()}/credentials'

gc = gspread.service_account(filename=f'{cwd}/google_api_key.json')
url = 'https://docs.google.com/spreadsheets/d/1m8S44S4E36TLBfG-3c6YQCsUY4ag92MdhBLD2-ZDdbY/edit?ts=60dc6e6f#gid=348719994'
sh = gc.open_by_url(url)

# Get the spreadsheets
# s.sheets[:]
# Cuisine dataframes
spanish_df = pd.DataFrame(sh.get_worksheet(2).get_all_records())
italian_df = pd.DataFrame(sh.get_worksheet(3).get_all_records())
seafood_df = pd.DataFrame(sh.get_worksheet(4).get_all_records())
seafood_df.rename(columns={'Starter & Side Dishes': 'Starters & Side Dishes'}, inplace=True)
texmex_df = pd.DataFrame(sh.get_worksheet(5).get_all_records())
north_african_df = pd.DataFrame(sh.get_worksheet(6).get_all_records())
east_asian_df = pd.DataFrame(sh.get_worksheet(7).get_all_records())
british_pub_df = pd.DataFrame(sh.get_worksheet(8).get_all_records())
french_df = pd.DataFrame(sh.get_worksheet(9).get_all_records())
indian_df = pd.DataFrame(sh.get_worksheet(10).get_all_records())
vegan_df = pd.DataFrame(sh.get_worksheet(11).get_all_records())
greek_df = pd.DataFrame(sh.get_worksheet(12).get_all_records())


gsheet_df_list = [spanish_df, italian_df, seafood_df, texmex_df, north_african_df,
                  east_asian_df, british_pub_df, french_df,
                  indian_df, vegan_df, greek_df]
gsheet_titles = []

for dataframe in gsheet_df_list:
    dataframe.columns = ['Starters & Side Dishes', 'Main', 'Dessert']
    gsheet_titles.append(dataframe['Starters & Side Dishes'].tolist())
    gsheet_titles.append(dataframe['Main'].tolist())
    gsheet_titles.append(dataframe['Dessert'].tolist())


flatten_list = [item for sublist in gsheet_titles for item in sublist]
# Menu count
menu_collection = collections.Counter(flatten_list)
menu_count = menu_collection['-']/3
print(f'Number of menus is: {menu_count}')

gsheet_titles_clean = [x for x in flatten_list if str(x) != 'nan']
gsheet_titles_clean = [x for x in gsheet_titles_clean if str(x) != '-']
gsheet_titles_clean = [x.upper() for x in gsheet_titles_clean]

duplicates = [k for k, v in Counter(gsheet_titles_clean).items() if v > 1]
# Let's highlight the duplicates and write to a new tab
duplicate_df = pd.DataFrame({'Duplicates': [x.lower() for x in duplicates]})
# Clear and update
range_of_cells = sh.get_worksheet(1).range('A2:C1000')
for cell in range_of_cells:
    cell.value = ''
sh.get_worksheet(1).update_cells(range_of_cells)
# Update with duplicate data in gsheets, tab is 'duplicates'
set_with_dataframe(sh.get_worksheet(1), duplicate_df)


# Algolia
client = SearchClient.create('1X9LAADTF2', 'b68b7f70c9f9bf8a0ca03d5d6c04ffbe')
index_ = client.init_index('dev_zess')
hits = {}
res = index_.browse_objects()

for i, hit in enumerate(res):
    hits[i] = hit


df_list = []
for i in range(0, len(hits)):
    temp_df = pd.json_normalize(hits[i])
    df_list.append(temp_df)

algolia_df = pd.concat(df_list)
algolia_df['title'] = algolia_df['title'].str.upper()

matches = set(gsheet_titles_clean) & set(algolia_df['title'].tolist())
df = algolia_df[algolia_df.title.isin(matches)]
ids = df['objectID'].tolist()
# Remove duplicates from algio
index_.delete_objects(ids)
print('Finished script\n')

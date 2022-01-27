import pandas as pd
import json
import random

def delete_cols(df, col):
    del df[col]

with open("./DataSet/Menus/menus_dict.txt", "r") as inp:
    menus_dict = json.load(inp)

menu_dict_updated = {}
for menu_item in menus_dict.values():
    for menu in menu_item:
        menu_dict_updated[menu[2]] = list(menu[3].keys())

# Get a subset of 100
menu_dict_random = dict(random.sample(menu_dict_updated.items(), 100))

with open('./DataSet/Menus/menu_dict_100_mapping.txt', 'w') as file:
     file.write(json.dumps(menu_dict_random))

# Get ingredients only
ingredient_list = []
for ingredient in menu_dict_random.values():
    for i in ingredient:
        ingredient_list.append(i)
initial_len = len(ingredient_list)
ingredient_list = list(set(ingredient_list))
print(f'removed {initial_len-len(ingredient_list)} ingredients (duplicated)')


headers = ['Field 1', 'Field 0', 'Field 1 2', 'ingredients',
       'Synonyms', 'Fruit/Veg', 'Red/Processed Meat', 'Not food/drink',
       'No Data Available', 'Energy (Kj)', 'Energy (Kcal)', 'Carbohydrate (g)',
       'Of which sugars (g)', 'Fibre (g)', 'Protein (g)', 'Total fat (g)',
       'Of which saturates (g)', 'Monounsaturated fat (g)',
       'Polyunsaturated fat (g)', 'Omega 3 (g)', 'Omega 6 (g)',
       'Trans-fats (g)', 'Salt (g)', 'Alcohol (g)', 'Calcium (mg)',
       'Chloride (mg)', 'Phosphorus (mg)', 'Sodium (mg)', 'Potassium (mg)',
       'Magnesium (mg)', 'Iron (mg)', 'Selenium (ug)', 'Iodine (ug)',
       'Vitamin A (ug)', 'Vitamin D (ug)', 'Vitamin E (mg)', 'Vitamin K1',
       'Thiamin (B1) (mg)', 'Riboflavin (B2) (mg)', 'Niacin (B3) (mg)',
       'Pantothenic acid (B5) (mg)', 'Pyridoxine (B6) (mg)',
       'Biotin (B7) (ug)', 'Folates (B9) (ug)', 'Vitamin B12 (ug)',
       'Vitamin C (mg)', 'Nutritics ID', 'Comments', 'Source URL',
       'Source URL 2', 'Source URL 3', 'Source URL 4', 'Source URL 5']
airtable_df_1 = pd.read_csv("./DataSet/airtable_1.csv",delimiter=',', header=None, skiprows=1, names=headers)
airtable_df_2 = pd.read_csv("./DataSet/airtable_2.csv",delimiter=',', header=None, skiprows=1, names=headers)
airtable_df_3 = pd.read_csv("./DataSet/airtable_3.csv",delimiter=',', header=None, skiprows=1, names=headers)
airtable_df_2.columns
cols = ['Field 1', 'Field 0', 'Field 1 2']
for c in cols:
    delete_cols(airtable_df_1, c)
    delete_cols(airtable_df_2, c)

airtable_df = pd.concat([airtable_df_1, airtable_df_2, airtable_df_3])

# boolean_table = airtable_df['ingredients'].isin(ingredient_list)
airtable_df_matches = airtable_df[airtable_df['ingredients'].isin(ingredient_list)].drop_duplicates(subset='ingredients', keep='first')
missing_ingredients = list(set(ingredient_list).difference(list(airtable_df_matches['ingredients'])))

temp_df = pd.DataFrame(columns=headers)
temp_df['ingredients'] = missing_ingredients
for c in cols:
    delete_cols(temp_df, c)

airtable_df_final = pd.concat([temp_df, airtable_df_matches])
airtable_df_final.to_csv('./DataSet/subset_ingredients.csv', index=None)

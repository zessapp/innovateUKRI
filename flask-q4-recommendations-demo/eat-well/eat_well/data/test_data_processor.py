import pandas as pd
import re
import os
import numpy as np

df = pd.read_csv('./test/test_ingredients.csv')
#df = df[:121]

# Split tables out, starts at 'Recipe number'
df_list, index_list = [], []
count = 0
for index, row in df.iterrows():
    # Fetch recipe names
    if row['Recipe number'] is not np.nan:
        index_list.append(index)
        print(row['Recipe number'], ', index: ', index)
index_list.append(len(df))

for i, idx in enumerate(index_list):
    try:
        start, end = index_list[i], index_list[i+1]
        df_temp = df[start:end]
        # df_temp['Recipe number'] =
        df_list.append(df_temp)
        del df_temp
    except:
        print('Index limit reached, exiting loop')
        break
del df_list[8]


# menu_names_list = []
df_list_updated = []
for _df in df_list:
    if _df['Recipe number'] is not np.nan:
        _df = _df.reset_index()
        menu_name = _df['Recipe number'][0]
        _df['Recipe number'] = menu_name
        df_list_updated.append(_df)
        # menu_names_list.append(menu_name)
        # print(list(_df['Recipe number'])), 2)


df_final = pd.concat(df_list_updated)
df_final.reset_index(inplace=True)
for index, row in df_final.iterrows():
    if type(row['Ingredient']) == type(''):
        print(row['Ingredient'])
        ingredient = re.sub(r'\w*\d\w*', '', row['Ingredient']).strip()
        ingredient = ''.join([i for i in row['Ingredient'] if not i.isdigit()])
        units = ['tbsp', 'tsp', 'oz', 'kg', '¼', '½', '.', '/']
        for unit in units:
            if unit in ingredient:
                ingredient = ingredient.replace(unit, '')
        ingredient = ingredient.replace('-', ' ')
        ingredient = ingredient.lstrip('g').lstrip(
            'ml').lstrip('lb').lstrip(' ')

        df_final.at[index, 'Ingredient'] = ingredient

df_final.to_csv('../../DataSet/recipe_test_data.csv', index=False)
df_mod = pd.concat(df_list_updated)
df_mod.reset_index(inplace=True)

# Now we need to get the values per 100g
for index, row in df_mod.iterrows():
    multiplier = 100/float(row['Quantity (g)'])
    df_mod.at[index, 'Energy (kcals)'] = round(
        (multiplier * float(row['Energy (kcals)'])), 2)
    # print(df_mod.at[index, 'Energy (kcals)'], multiplier, float(row['Energy (kcals)'])), 2)
    df_mod.at[index, 'Protein (g)'] = round(
        round((multiplier * float(row['Protein (g)'])), 2), 2)
    df_mod.at[index, 'Fat (g)'] = round(
        (multiplier * float(row['Fat (g)'])), 2)
    df_mod.at[index, 'Of which saturates (g)'] = round(
        (multiplier * float(row['Of which saturates (g)'])), 2)
    df_mod.at[index, 'Monounsaturates (g)'] = round(
        (multiplier * float(row['Monounsaturates (g)'])), 2)
    df_mod.at[index, 'Polyunsaturates (g)'] = round(
        (multiplier * float(row['Polyunsaturates (g)'])), 2)
    df_mod.at[index, 'Omega 3 (g)'] = round(
        (multiplier * float(row['Omega 3 (g)'])), 2)
    df_mod.at[index, 'Omega 6 (g)'] = round(
        (multiplier * float(row['Omega 6 (g)'])), 2)
    df_mod.at[index, 'Trans fats (g)'] = round(
        (multiplier * float(row['Trans fats (g)'])), 2)
    df_mod.at[index, 'Salt (g)'] = round(
        (multiplier * float(row['Salt (g)'])), 2)
    df_mod.at[index, 'Sodium (mg)'] = round(
        (multiplier * float(row['Sodium (mg)'])), 2)
    df_mod.at[index, 'Potassium (mg)'] = round(
        (multiplier * float(row['Potassium (mg)'])), 2)
    df_mod.at[index, 'Carbohydrates (g)'] = round(
        (multiplier * float(row['Carbohydrates (g)'])), 2)
    df_mod.at[index, 'Of which sugars (g)'] = round(
        (multiplier * float(row['Of which sugars (g)'])), 2)
    df_mod.at[index, 'Fibre (g)'] = round(
        (multiplier * float(row['Fibre (g)'])), 2)
    df_mod.at[index, 'Quantity (g)'] = 100
    if type(row['Ingredient']) == type(''):
        ingredient = re.sub(r'\w*\d\w*', '', row['Ingredient']).strip()
        ingredient = ''.join([i for i in row['Ingredient'] if not i.isdigit()])
        units = ['tbsp', 'tsp', 'oz', 'kg', '¼', '½', '.', '/']
        for unit in units:
            if unit in ingredient:
                ingredient = ingredient.replace(unit, '')
        ingredient = ingredient.replace('-', ' ')
        ingredient = ingredient.lstrip('g').lstrip(
            'ml').lstrip('lb').lstrip(' ')

        df_mod.at[index, 'Ingredient'] = ingredient

del df_mod['level_0']
del df_mod['index']

df_mod
df_mod.to_csv('../../DataSet/ingredient_test_data_100g.csv', index=False)

from airtable import Airtable
import os, sys
import pickle
import pandas as pd

base_airtable_allergens = 'app3z34ca492PWZIj'
api_key_allergens = 'keyiFsLwfsSOR9s0S'

# allergen_table = Airtable(airtable_url_or_base_key=base_airtable_allergens, 'allergens')
# Fetch pickled data
ingredients_df = pd.read_csv(f'{os.getcwd()}/airtable_annotation/data/computer_gen_data/unique-ingredients.csv')

allergen_table = Airtable(base_airtable_allergens, api_key_allergens)


chunks = round(len(list(ingredients_df['unique_ingredients']))/6)

annotators_list = ['Nadia', 'Tom', 'Nana', 'Alya', 'Raquel']
count = 0
for i in range(0, round(len(list(ingredients_df['unique_ingredients'])))):
    if count == 5:
        break
    print(count)
    print(annotators_list[count])
    allergen_table.create(annotators_list[count], {'Ingredient': list(ingredients_df['unique_ingredients'])[868+i]})

    if i % chunks == 0 and i != 0:
        count += 1
        print(i, count)

# Finished off where last
for i in range(843, 868):
    allergen_table.create(annotators_list[0], {'Ingredient': list(ingredients_df['unique_ingredients'])[i]})

# for ingredient in list(ingredients_df['unique_ingredients']):


    # allergen_table.create('Chloe', {'Ingredient': ingredient})

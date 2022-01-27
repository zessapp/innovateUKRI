from airtable import Airtable
import os, sys
import pickle
import pandas as pd
import json
import requests
import numpy as np

base_airtable_allergens = 'app3z34ca492PWZIj'
api_key_allergens = 'keyiFsLwfsSOR9s0S'

# allergen_table = Airtable(airtable_url_or_base_key=base_airtable_allergens, 'allergens')
# Fetch pickled data
# ingredients_df = pd.read_csv(f'{os.getcwd()}/airtable_annotation/data/computer_gen_data/unique-ingredients.csv')

allergen_table = Airtable(base_airtable_allergens, api_key_allergens)

annotators_dict = {'Chloe': 'rec8aNgYw07WifKhV', 'Nadia': 'recyruWqF8Rlk3hLS', 'Tom': 'recBO2TBiWxp2Vr8U',
                    'Nana': 'recggtTNCVINUUOsK', 'Alya': 'reca0NforyceY6XVm', 'Raquel': 'recldGy7mbeVDwYe6'}
url_list = []
result_list = []

index_count = 0
for key, value in annotators_dict.items():
    counter = 0
    offset_list = []
    while True:
        if counter == 0:
            results = allergen_table.get(key)
            for record in results['records']:
                try:
                    ingredient = record['fields']['Ingredient']
                except:
                    continue
                if len(record['fields'].keys()) == 1:
                    break
                else:
                    for k,v in record['fields'].items():
                        if k != 'Ingredient':
                            allergen = k
                            link = v

                # if allergen == 'Not a priority allergen':
                #     continue
                # if allergen == 'Not Ingredient':
                #     continue
                # if allergen == 'Notes':
                #     continue
                # if allergen == 'Flag Issue':
                #     continue
                df = pd.DataFrame({'ingredient': ingredient, 'allergen': allergen, 'url': link}, index = [index_count])
                result_list.append(df)
                index_count += 1
        else:
            results = allergen_table.get(key, offset= offset_list[counter-1])
            for record in results['records']:
                try:
                    ingredient = record['fields']['Ingredient']
                except:
                    continue
                if len(record['fields'].keys()) == 1:
                    break
                else:
                    for k,v in record['fields'].items():
                        if k != 'Ingredient':
                            allergen = k
                            link = v

                # if allergen == 'Not a priority allergen':
                #     continue
                # if allergen == 'Not Ingredient':
                #     continue
                # if allergen == 'Notes':
                #     continue
                # if allergen == 'Flag Issue':
                #     continue
                df = pd.DataFrame({'ingredient': ingredient, 'allergen': allergen, 'url': link}, index = [index_count])
                result_list.append(df)
                index_count += 1
        try:
            offset_list.append(results['offset'])
        except:
            print(f'Finished at iteration {counter}')
            break
        counter += 1
        print(counter)

df_full = pd.concat(result_list)
df_full.to_csv(f'{os.getcwd()}/data/ingredient_allergen_annotations_full.csv')
# df_full.to_csv(f'{os.getcwd()}/data/ingredient_allergen_annotations.tsv', sep='\t')

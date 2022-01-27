#!/usr/bin/env python
# coding: utf-8

# In[318]:


#Import dependencies

import pandas as pd
import json
from tqdm import tqdm
from ast import literal_eval
import numpy as np
import collections
import pickle
import os
from algoliasearch.search_client import SearchClient

path = f'{os.getcwd()}/q3_data'

df_ingredients = pd.read_csv(f"{path}/ingredients.csv")

#Select Top 1000 most frequent ingredients
n = 1000
most_freq_ingredients = df_ingredients[df_ingredients['Not food/drink'] != 'checked'].iloc[:n]["Ingredient (as per 100 g)"].tolist()
len(most_freq_ingredients)

recipes_file = f"{path}/recipes_raw_nosource_fn.json"
with open (recipes_file, "r") as inp:
    recipes = json.load(inp)


print(len(recipes))

recipes_list = []
for idx, (id, recipe) in enumerate(zip(recipes.keys(), recipes.values())):
    recipes_list.append(recipe)


s = [str(i).replace("'", '"') for i in recipes_list]

f = []
for i in s:
    try:
        f.append(json.loads(i))
    except:
        pass


recipe_titles, recipe_ingredients = [], []
for idx in range(len(f)):
    try:
        recipe_titles.append(f[idx]['title'])
        recipe_ingredients.append(f[idx]['ingredients'])
    except:
        pass


from fuzzywuzzy import fuzz
import itertools
# Ratio = fuzz.ratio(Str1.lower(),Str2.lower())
# print(Ratio)

recipe_scoress = []
for batch in tqdm(recipe_ingredients):
    num_of_exact_ingredients_found, num_of_fuzzy_ingredients_found = 0, 0
    for i in batch:
        flag = False
        ingredient_found = False
        tokens = i.split(" ")

        paired_tokens = itertools.combinations(tokens, 2)
        pairs = []
        for i in paired_tokens:
            pairs.append(i[0]+" "+i[1])
        for pair in pairs:
            if pair in most_freq_ingredients:
               # ingredient_found = True
                num_of_exact_ingredients_found += 1

                flag = True
                break
        if not flag:
            for token in tokens:

                for most_freq_ingredient in most_freq_ingredients:
                    ratio = fuzz.ratio(token.lower(), most_freq_ingredient.lower())
                    if ratio > 85 and ratio != 100:

                        ingredient_found = True
                        num_of_fuzzy_ingredients_found += 1
                        break
                    if ratio == 100:

                        num_of_exact_ingredients_found += 1
                        break
                if ingredient_found:
                    break
    if len(batch) > 0:
        score = (num_of_exact_ingredients_found + num_of_fuzzy_ingredients_found*0.5)/len(batch)
        if score > 1:
            score = 1
        #print("Recipe Score: ", score)
        recipe_scoress.append(score)
    else:
        #print("Ingredient recipe is Empty...")
        recipe_scoress.append(np.nan)

    if score>1:
        print(num_of_exact_ingredients_found)
        print(num_of_fuzzy_ingredients_found)
        print(score)
        print(batch)

print(recipe_titles[30])

print(len(recipe_scoress))

d = collections.defaultdict()


for idx, (i, j, k) in enumerate(zip(recipe_titles, recipe_ingredients, recipe_scoress)):
    loop_dict = {}
    loop_dict["recipe_id"] = idx
    loop_dict['title'] = i
    loop_dict['ingredients'] = j
    loop_dict['score'] = k
    d[idx] = loop_dict

count = 0
sorted_d = {}
for pos in range(len(d)):
    if d[pos]['score'] >0.80:
        if count <10000:
            sorted_d[count] = d[pos]
        count+=1
print(count)

sorted_d_list = []
for i, j in zip(sorted_d.keys(), sorted_d.values()):
    sorted_d_list.append(j)


with open(f"{path}/top_{str(count)[0]}k_recipes.json", "w") as out:
    json.dump(sorted_d_list, out)

print((sorted_d_list))

client = SearchClient.create('1X9LAADTF2', 'b68b7f70c9f9bf8a0ca03d5d6c04ffbe')
index_ = client.init_index('dev_zess')
with open(f'{path}/q3_data/top_{str(count)[0]}k_recipes.json') as f:
    recipe_json = json.load(f)


res = index_.save_objects(recipe_json,  {'autoGenerateObjectIDIfNotExist': True})

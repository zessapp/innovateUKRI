from Config.config import DATABASE, DATA_FOLDER, URI
from typedb.client import *
from Migrators.Utilities.utilities import (
    convert_df_columns_to_lowercase,
    get_df_row_value,
    load_data_into_df,
    get_files,
    migrate_data_into_grakn,
)
from typing import List
from ast import literal_eval
import pandas as pd
import numpy as np
import math
import json
import time
import re
import csv
import pickle
import random
from Migrators.Food.restuarant_names import restaurant_names
# import os
# os.chdir('/Users/josephhearnshaw/eat-well')


def restaurant_menu_ingredient_migrator(
    grakn_client: TypeDB.core_client,
    menus_dir: str = "./DataSet/Menus/",
    cuisines_dir: str = "./DataSet/Cuisines/",
    skipgram_data_dir: str = "./SkipGram/data/",
    write_to_db: bool = True,
) -> List[str]:
    """Extract ingredients from CocktailDB, create ingredient pairs according to
    normalized PMI, and build relations for top ranking pairs accordingly.
    Args:
        grakn_client
        flavordb_dir
        cocktaildb_dir
    Return:
        list: List of the ingredients migrated.
    """

    # menu_files = get_files(menus_dir)
    # cuisine_files = get_files(cuisines_dir)
    approved_ingredients = []
    annotated_ingredients = pd.read_csv('./DataSet/ingredients.csv')
    annotated_ingredients.drop_duplicates(
        subset='Ingredient (as per 100 g)', keep="last", inplace=True)
    annotated_ingredients.set_index('Ingredient (as per 100 g)', inplace=True)
    del_names = ['Field 0', 'Field 1', 'Source URL', 'Source URL 2',
                 'Source URL 3', 'Source URL 4', 'Source URL 5', 'Comments', 'Nutritics ID']
    for x in del_names:
        del annotated_ingredients[x]

    annotated_ingredients_dict = annotated_ingredients.to_dict(orient='index')

    with open("./DataSet/Menus/menus_dict.txt", "r") as inp:
        menus_dict = json.load(inp)

    df_ingredients = pd.read_csv("./DataSet/Menus/unique-ingredients.csv")
    ingredients_list = df_ingredients.iloc[:, 1].tolist()
    ingredient_alllergen_mapping_df = pd.read_csv(
        './DataSet/Menus/ingredient_allergen_annotations_full.csv')
    ingredient_alllergen_mapping_df = ingredient_alllergen_mapping_df[[
        'ingredient', 'allergen']]
    allergen_ingredient_dict = {}
    for index, row in ingredient_alllergen_mapping_df.iterrows():
        allergen_ingredient_dict[row['ingredient']] = row['allergen']

    restaurant_dict_mapping = {}
    for j in range(0, 179):
        restaurant_ids = f'Restaurant_{j}'
        name = restaurant_names[j]
        restaurant_dict_mapping[restaurant_ids] = str(name)

    restaurant_cuisines_dict = {}
    for i, (restaurant, info) in enumerate(zip(menus_dict.keys(), menus_dict.values())):
        cuisine = info[0][1]
        restaurant_updated = restaurant_dict_mapping[restaurant]
        restaurant_cuisines_dict[restaurant_updated] = cuisine

    # restaurant_cuisines_dict_2 = {}
    # for restaurant, info in zip(menus_dict.keys(), menus_dict.values()):
    #     cuisine = info[0][1]
    #     restaurant_cuisines_dict_2[restaurant] = cuisine
    for i, (k, v) in enumerate(restaurant_dict_mapping.items()):
        if i < len(menus_dict.keys()):
            menus_dict[v] = menus_dict.pop(k)

    if write_to_db:
        # insert ingredients

        query_list = []
        for selected_restaurant, cuisine_type in zip(
            restaurant_cuisines_dict.keys(), restaurant_cuisines_dict.values()
        ):
            # print(">>>>>>>>", selected_restaurant, cuisine_type)

            for restaurant, menu in zip(menus_dict.keys(), menus_dict.values()):
                if selected_restaurant == restaurant:
                    for menu_item in menu:

                        query = (
                            'insert $m-i isa menu-item, has name "'
                            + menu_item[2]
                            + '", has restaurant "'
                            + restaurant
                            + '", has dishtype "'
                            + menu_item[0]
                            + '";'
                        )
                        query_list.append(query)

        for ingredient in list(set(ingredients_list)):
            ingredient = ingredient.lower()

            try:
                if not np.isnan(annotated_ingredients_dict[ingredient]['Energy (Kcal)']):
                    approved_ingredients.append(ingredient)
                    nutrient_dict = annotated_ingredients_dict[ingredient]
                    # query = query.replace(';', ', ')
                    query = ('insert $i isa ingredient, has name "' + ingredient + '", has is-red-or-processed-meat "' + str(~np.isnan(nutrient_dict['Red/Processed Meat'])) + '", has is-veg-or-fruit "'
                             + str(~np.isnan(nutrient_dict['Fruit/Veg'])) + '", has kcals-per-100-g "' + str(
                                 nutrient_dict['Energy (Kcal)'])
                             + '", has carbs-per-100-g "' +
                             str(nutrient_dict['Carbohydrate (g)']) + '", has sugar-per-100-g "' + str(
                                 nutrient_dict['Of which sugars (g)'])
                             + '", has fibre-per-100-g "' +
                             str(nutrient_dict['Fibre (g)']) + '", has protein-per-100-g "' + str(
                                 nutrient_dict['Protein (g)'])
                             + '", has fat-per-100-g "' +
                             str(nutrient_dict['Total fat (g)']) + '", has saturates-per-100-g "' + str(
                                 nutrient_dict['Of which saturates (g)'])
                             + '", has mufa-per-100-g "' +
                             str(nutrient_dict['Monounsaturated fat (g)']) + '", has pufa-per-100-g "' + str(
                                 nutrient_dict['Polyunsaturated fat (g)'])
                             + '", has omega-3-per-100-g "' +
                             str(nutrient_dict['Omega 3 (g)']) + '", has omega-6-per-100-g "' + str(
                                 nutrient_dict['Omega 6 (g)'])
                             + '", has trans-per-100-g "' +
                             str(nutrient_dict['Trans-fats (g)']) +
                             '", has salt-per-100-g "' +
                             str(nutrient_dict['Salt (g)'])
                             + '", has alcohol-per-100-g "' +
                             str(nutrient_dict['Alcohol (g)']) + '", has sodium-per-100-g "' + str(
                                 nutrient_dict['Sodium (mg)'])
                             + '", has potassium-per-100-g "' + str(nutrient_dict['Potassium (mg)']) + '"')
                    try:
                        allergen = allergen_ingredient_dict[ingredient]

                        if allergen == 'Not a priority allergen':
                            pass
                        elif allergen == 'Notes':
                            pass
                        elif allergen == 'Flag Issue':
                            pass
                        else:
                            query += ', has allergen "' + allergen.lower() + '"'

                    except:
                        pass
                    query += ';'
                    # print(query)
                else:
                    pass

            except:
                pass

                # Add this back in if you want everything
                # query = 'insert $i isa ingredient, has name "' + ingredient + '";'

            query_list.append(query)

        unique_cuisine_types = []
        for selected_restaurant, cuisine_type in zip(
            restaurant_cuisines_dict.keys(), restaurant_cuisines_dict.values()
        ):
            unique_cuisine_types.append(cuisine_type)

        for c in list(set(unique_cuisine_types)):
            query = 'insert $c isa cuisine, has name "' + c + '";'
            query_list.append(query)

        # Why the heck is some of the end of queries missing? It shouldn't happen.
        query_list = list(set(query_list))
        updated_query_list = []
        for query in query_list:
            if ';' not in query:
                query_temp = query.rstrip(', ') + ';'
                updated_query_list.append(query_temp)
            else:
                updated_query_list.append(query)

        migrate_data_into_grakn(
            start_log_message="Writing Menu data to Grakn",
            end_log_message="Finished inserting Menus",
            query_list=updated_query_list,
        )

    # pickle and store npmi scores for all ingredient-ingredient pairs

    if write_to_db:
        # insert used-with relations;
        # the entity of a ingredient can be compound-ingredient or  non-compound-ingredient
        # depending if there is compound infomration assoicated with the ingredient
        query_list = []
        relationships_count = 0
        for restaurant, menu in zip(menus_dict.items(), menus_dict.values()):
            for selected_restaurant, cuisine_type in zip(
                restaurant_cuisines_dict.keys(), restaurant_cuisines_dict.values()
            ):

                if restaurant[0] == selected_restaurant:
                    for item in menu:
                        ingredients_dict = item[3]
                        menu_item = item[2]
                        cuisine_type = item[1]
                        query = (
                            'match $m-i isa menu-item, has name "'
                            + menu_item
                            + '";'
                            + '$c isa cuisine, has name "'
                            + cuisine_type
                            + '";'
                            + "insert $type-of-cuisine (cuisine-contains: $m-i, belongs-to-cuisine: $c) isa typeof;"
                        )
                        query_list.append(query)
                        relationships_count += 1

                        for ingredient, score in zip(
                            ingredients_dict.keys(), ingredients_dict.values()
                        ):
                            if ingredient in approved_ingredients:
                                relationships_count += 1
                                query = (
                                    'match $m-i isa menu-item, has name "'
                                    + menu_item
                                    + '";'
                                    + '$i isa ingredient, has name "'
                                    + ingredient
                                    + '";'
                                    + "insert $pairs (ingredient-belongs-to-menu-item: $m-i, menu-item-has-ingredient: $i) isa contains;"
                                    + "$pairs has tf-idf-score "
                                    + str(score)
                                    + ";"
                                )
                                query_list.append(query)

        migrate_data_into_grakn(
            start_log_message="Writing ingredient - menu item relationships to Grakn",
            end_log_message="Finished inserting {} reltionships".format(
                relationships_count
            ),
            query_list=query_list
        )


#  return cocktail_total_ingredients

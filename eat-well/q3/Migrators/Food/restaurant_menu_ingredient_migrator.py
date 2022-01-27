import random
import pickle
import csv
import re
import time
import json
import math
import numpy as np
import pandas as pd
from ast import literal_eval
from typing import List
from Config.config import DATABASE, DATA_FOLDER, URI
from typedb.client import *
from Migrators.Utilities.utilities import (
    convert_df_columns_to_lowercase,
    get_df_row_value,
    load_data_into_df,
    get_files,
    migrate_data_into_grakn,
)


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

    with open("./DataSet/Menus/restaurant_names.txt", "r") as f:
        restaurant_names = literal_eval(f.read())

    restaurant_dict_mapping = {}
    for j in range(0, 179):
        restaurant_ids = f'Restaurant_{j}'
        name = restaurant_names[j]
        restaurant_dict_mapping[restaurant_ids] = str(name)

    restaurant_cuisines_dict = {}
    for restaurant, info in zip(menus_dict.keys(), menus_dict.values()):
        cuisine = info[0][1]
        restaurant_cuisines_dict[restaurant] = cuisine

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

        for ingredient in ingredients_list:
            ingredient = ingredient.lower()
            try:
                allergen = allergen_ingredient_dict[ingredient]
                if allergen == 'Not a priority allergen':
                    pass
                elif allergen == 'Notes':
                    pass
                elif allergen == 'Flag Issue':
                    pass
                else:

                    query = 'insert $i isa ingredient, has name "' + \
                        ingredient + '", has allergen "' + allergen.lower() + '";'
                    print(query)
            except:
                # Add this back in if you want everything
                query = 'insert $i isa ingredient, has name "' + ingredient + '";'

            query_list.append(query)

        unique_cuisine_types = []
        for selected_restaurant, cuisine_type in zip(
            restaurant_cuisines_dict.keys(), restaurant_cuisines_dict.values()
        ):
            unique_cuisine_types.append(cuisine_type)

        for c in list(set(unique_cuisine_types)):
            query = 'insert $c isa cuisine, has name "' + c + '";'
            query_list.append(query)

        migrate_data_into_grakn(
            start_log_message="Writing Menu data to Grakn",
            end_log_message="Finished inserting Menus",
            query_list=query_list,
            client=grakn_client,
            keyspace=DATABASE,
        )

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
            query_list=query_list,
            client=grakn_client,
            keyspace=DATABASE,
        )


#  return cocktail_total_ingredients

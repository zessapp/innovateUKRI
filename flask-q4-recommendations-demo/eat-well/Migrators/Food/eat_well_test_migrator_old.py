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

# import os
# os.chdir('/Users/josephhearnshaw/eat-well')


def isNaN(num):
    if float('-inf') < float(num) < float('inf'):
        return False
    else:
        return True


def eat_well_migrator(
    grakn_client: TypeDB.core_client,
    menus_dir: str = "./DataSet/Menus/",
    cuisines_dir: str = "./DataSet/Cuisines/",
    skipgram_data_dir: str = "./SkipGram/data/",
    write_to_db: bool = True,
) -> List[str]:
    """
    Specifically for the eat well algorithm
    """

    # menu_files = get_files(menus_dir)
    # cuisine_files = get_files(cuisines_dir)

    annotated_ingredients = pd.read_csv(
        './DataSet/20_recipes_annotation.csv')
    annotated_ingredients.drop_duplicates(
        subset='Ingredient', keep="last", inplace=True)

    annotated_ingredients = annotated_ingredients[~annotated_ingredients['Ingredient'].isna(
    )]
    del annotated_ingredients['Recipe number']
    annotated_ingredients.fillna(0, inplace=True)
    annotated_ingredients.set_index('Ingredient', inplace=True)

    annotated_ingredients_dict = annotated_ingredients.to_dict(orient='index')
    annotated_ingredients_dict = {
        k.lower(): v for k, v in annotated_ingredients_dict.items()}
    ingredient_list = list(set(annotated_ingredients_dict.keys()))

    # Check for allergens
    allergen_ingredient_dict = {}
    for ingredient in annotated_ingredients_dict.keys():
        allergen_temp_list = []
        if annotated_ingredients_dict[ingredient]['Celery'] == 'Yes':
            allergen_temp_list.append('Celery')
        if annotated_ingredients_dict[ingredient]['Cereals containg gluten'] == 'Yes':
            allergen_temp_list.append('Cereals containg gluten')
        if annotated_ingredients_dict[ingredient]['Crustaceans'] == 'Yes':
            allergen_temp_list.append('Crustaceans')
        if annotated_ingredients_dict[ingredient]['Eggs'] == 'Yes':
            allergen_temp_list.append('Eggs')
        if annotated_ingredients_dict[ingredient]['Fish'] == 'Yes':
            allergen_temp_list.append('Fish')
        if annotated_ingredients_dict[ingredient]['Lupin'] == 'Yes':
            allergen_temp_list.append('Lupin')
        if annotated_ingredients_dict[ingredient]['Milk'] == 'Yes':
            allergen_temp_list.append('Milk')
        if annotated_ingredients_dict[ingredient]['Mollusc'] == 'Yes':
            allergen_temp_list.append('Mollusc')
        if annotated_ingredients_dict[ingredient]['Mustard'] == 'Yes':
            allergen_temp_list.append('Mustard')
        if annotated_ingredients_dict[ingredient]['Peanuts'] == 'Yes':
            allergen_temp_list.append('Peanuts')
        if annotated_ingredients_dict[ingredient]['Sesame'] == 'Yes':
            allergen_temp_list.append('Sesame')
        if annotated_ingredients_dict[ingredient]['Soybeans'] == 'Yes':
            allergen_temp_list.append('Soybeans')
        if annotated_ingredients_dict[ingredient]['Sulphur dioxide'] == 'Yes':
            allergen_temp_list.append('Sulphur dioxide')
        if annotated_ingredients_dict[ingredient]['Tree nuts'] == 'Yes':
            allergen_temp_list.append('Tree nuts')
        if len(allergen_temp_list) > 0:
            allergen_ingredient_dict[ingredient.lower()] = allergen_temp_list
        else:
            allergen_ingredient_dict[ingredient.lower()] = 'none'

    # Import recipes
    recipe_data = pd.read_csv('./DataSet/recipe_test_data.csv')
    recipe_data = recipe_data[['Recipe number', 'Ingredient', 'Quantity (g)']]
    recipe_data = recipe_data[~recipe_data['Ingredient'].isna()]
    recipe_data.reset_index(inplace=True)
    recipe_data.fillna(0, inplace=True)
    recipe_data_dict = {}
    temp_list = []
    for index, row in recipe_data.iterrows():
        if index > 0:
            if row['Recipe number'] == recipe_data['Recipe number'][index-1]:
                # print({row['Ingredient']: row['Quantity (g)']})
                temp_list.append({row['Ingredient']: row['Quantity (g)']})
            else:
                temp_dict = {}
                for d in temp_list:
                    temp_dict.update(d)

                recipe_data_dict[recipe_data['Recipe number']
                                 [index-1]] = temp_dict
                temp_list = []
                temp_list.append({row['Ingredient']: row['Quantity (g)']})
        else:
            temp_list.append({row['Ingredient']: row['Quantity (g)']})

    if write_to_db:
        # insert ingredients

        query_list = []

        for menu in recipe_data_dict.keys():
            query = (
                'insert $m-i isa menu-item, has name "'
                + str(menu.lower())
                + '";'
            )
            query_list.append(query)

        for ingredient in list(set(ingredient_list)):
            ingredient = ingredient.lower()

            if not np.isnan(annotated_ingredients_dict[ingredient]['Energy (kcals)']):

                nutrient_dict = annotated_ingredients_dict[ingredient]
                # list(annotated_ingredients_dict[ingredient].keys())
                # query = query.replace(';', ', ')
                query = ('insert $i isa ingredient, has name "' + ingredient + '", has is-red-or-processed-meat "' + str(~np.isnan(nutrient_dict['Is red/ processed meat?'])) + '", has is-veg-or-fruit "'
                         + str(nutrient_dict['Is vegetable/ fruit?']) + '", has kcals-per-100-g "' + str(
                             nutrient_dict['Energy (kcals)'])
                         + '", has carbs-per-100-g "' +
                         str(nutrient_dict['Carbohydrates (g)']) + '", has sugar-per-100-g "' + str(
                             nutrient_dict['Of which sugars (g)'])
                         + '", has fibre-per-100-g "' +
                         str(nutrient_dict['Fibre (g)']) + '", has protein-per-100-g "' + str(
                             nutrient_dict['Protein (g)'])
                         + '", has fat-per-100-g "' +
                         str(nutrient_dict['Fat (g)']) + '", has saturates-per-100-g "' + str(
                             nutrient_dict['Of which saturates (g)'])
                         + '", has mufa-per-100-g "' +
                         str(nutrient_dict['Monounsaturates (g)']) + '", has pufa-per-100-g "' + str(
                             nutrient_dict['Polyunsaturates (g)'])
                         + '", has omega-3-per-100-g "' +
                         str(nutrient_dict['Omega 3 (g)']) + '", has omega-6-per-100-g "' + str(
                             nutrient_dict['Omega 6 (g)'])
                         + '", has trans-per-100-g "' +
                         str(nutrient_dict['Trans fats (g)']) +
                         '", has salt-per-100-g "' +
                         str(nutrient_dict['Salt (g)'])
                         + '", has sodium-per-100-g "' + str(
                             nutrient_dict['Sodium (mg)'])
                         + '", has potassium-per-100-g "' + str(nutrient_dict['Potassium (mg)']) + '"')
                try:
                    allergen = allergen_ingredient_dict[ingredient]

                    if allergen == 'Not a priority allergen':
                        pass
                    elif allergen == 'Notes':
                        pass
                    elif allergen == 'none':
                        pass
                    elif allergen == 'Flag Issue':
                        pass
                    else:
                        for al in allergen:
                            query += ', has allergen "' + str(al.lower()) + '"'

                except:
                    pass
                query += ';'
                # print(query)
            else:
                pass

                # Add this back in if you want everything
                # query = 'insert $i isa ingredient, has name "' + ingredient + '";'

            query_list.append(query)

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

        for recipe in recipe_data_dict.keys():
            # print(recipe_data_dict[recipe])
            for ingredient in recipe_data_dict[recipe].keys():
                if recipe_data_dict[recipe][ingredient] == isNaN(recipe_data_dict[recipe][ingredient]):
                    print('True')
                    pass
                else:
                    if ingredient.lower() == 'salt and pepper':
                        weight = '0'
                    else:
                        weight = str(recipe_data_dict[recipe][ingredient])
                    relationships_count += 1
                    query = (
                        'match $m-i isa menu-item, has name "'
                        + str(recipe.lower())
                        + '";'
                        + '$i isa ingredient, has name "'
                        + str(ingredient.lower())
                        + '";'
                        + "insert $pairs (ingredient-belongs-to-menu-item: $m-i, menu-item-has-ingredient: $i) isa contains; "
                        + "$pairs has weight-g "
                        + str(weight)
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

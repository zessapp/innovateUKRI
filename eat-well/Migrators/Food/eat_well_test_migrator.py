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
import time

# import os
# os.chdir('/Users/josephhearnshaw/eat-well')

def dictGenerator(df, col_1, col_2):
    updated_df = df[[col_1, col_2]]
    dict_df = updated_df.groupby(col_1)[col_2].apply(list).to_dict()
    for key, value in dict_df.items():
        value = list(set([s.rstrip() for s in value]))
        updated_values = []
        for v in value:
            if '/' in v:
                for j in v.split('/'):
                    updated_values.append(j)
            else:
                updated_values.append(v)
        dict_df[key] = updated_values
    return dict_df

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
    recipes_df = annotated_ingredients[['Recipe', 'Ingredient', 'Weight (g)']]
    recipes_df.Ingredient=recipes_df.Ingredient.str.rstrip('\n')
    recipes_df.Recipe=recipes_df.Recipe.str.rstrip('\n')

    # Get recipes
    recipe_list = []
    temp_dict = {}
    recipe_data_dict = {}
    for index, row in recipes_df.iterrows():
        recipe = row['Recipe']
        recipe_list.append(recipe)
        weight = row['Weight (g)']
        if np.isnan(weight):
            weight = 'NR'
        if index == 0:
            temp_dict[row['Ingredient']] = row['Weight (g)']
        if index > 0:
            if recipe_list[index-1] == recipe:
                temp_dict[row['Ingredient']] = row['Weight (g)']
                # print(recipe)
            elif recipe_list[index-1] != recipe:
                # print(recipe_list[index-1], temp_dict)
                recipe_data_dict[recipe_list[index - 1]] = temp_dict
                # print(recipe, temp_dict)
                temp_dict = {}
            else:
                pass
                # print('fin ', recipe, temp_dict)
        if index == len(recipes_df)-1:
            recipe_data_dict[recipe] = temp_dict


    annotated_ingredients.drop_duplicates(
        subset='Ingredient', keep="last", inplace=True)

    annotated_ingredients = annotated_ingredients[~annotated_ingredients['Ingredient'].isna(
    )]
    del annotated_ingredients['Field 1']
    annotated_ingredients.fillna(0, inplace=True)

    recipe_category = dictGenerator(annotated_ingredients, 'Recipe', 'Category')
    recipe_type = dictGenerator(annotated_ingredients, 'Recipe', 'menu-type')


    annotated_ingredients.set_index('Ingredient', inplace=True)


    annotated_ingredients_dict = annotated_ingredients.to_dict(orient='index')
    annotated_ingredients_dict = {
        k.lower(): v for k, v in annotated_ingredients_dict.items()}
    ingredient_list = list(set(annotated_ingredients_dict.keys()))

    # Check for allergens
    allergen_ingredient_dict = {}
    for ingredient in annotated_ingredients_dict.keys():
        allergen_temp_list = []
        if 'Milk' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Milk')
        if 'Cereals containing gluten' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Cereals containing gluten')
        if 'Eggs' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Eggs')
        if 'Molluscs' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Molluscs')
        if 'Sulphur' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Sulphur')
        if 'Celery (Allergen)' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Celery (Allergen)')
        if 'Treenuts' in str(annotated_ingredients_dict[ingredient]['Allergen'] or 'Tree nuts' in str(annotated_ingredients_dict[ingredient]['Allergen'])):
            allergen_temp_list.append('Treenuts')
        if 'Peanuts' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Peanuts')
        if 'Sesame' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Sesame')
        if 'Mustard' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Mustard')
        if 'Fish' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Fish')
        if 'Soya' in str(annotated_ingredients_dict[ingredient]['Allergen']):
            allergen_temp_list.append('Soya')

        if len(allergen_temp_list) > 0:
            allergen_ingredient_dict[ingredient.lower()] = allergen_temp_list
        else:
            allergen_ingredient_dict[ingredient.lower()] = 'none'

    # Import recipes
    # recipe_data = pd.read_csv(
    #     './DataSet/20_recipes_annotation.csv')
    # recipe_data = recipe_data[['Recipe', 'Ingredient', 'Weight (g)']]
    #
    # recipe_data = recipe_data[~recipe_data['Ingredient'].isna()]
    # recipe_data.reset_index(inplace=True)
    # recipe_data.fillna(0, inplace=True)
    # recipe_data_dict = {}
    # temp_list = []
    # for index, row in recipe_data.iterrows():
    #     if index > 0:
    #         if row['Recipe'] == recipe_data['Recipe'][index-1]:
    #             temp_list.append({row['Ingredient']: row['Weight (g)']})
    #         else:
    #             temp_dict = {}
    #             for d in temp_list:
    #                 temp_dict.update(d)
    #
    #             recipe_data_dict[recipe_data['Recipe']
    #                              [index-1]] = temp_dict
    #             temp_list = []
    #             temp_list.append({row['Ingredient']: row['Weight (g)']})
    #     else:
    #         temp_list.append({row['Ingredient']: row['Weight (g)']})
    # for d in temp_list:
    #     temp_dict.update(d)
    #
    # recipe_data_dict[recipe_data['Recipe'][index-1]] = temp_dict

    recipe_data = pd.read_csv(
        './DataSet/20_recipes_annotation.csv')

    recipe_data = recipe_data[['Recipe', 'Num of servings']]

    recipe_servings_dict = {}
    for recipe, servings in zip(recipe_data['Recipe'], recipe_data['Num of servings']):

        if recipe not in recipe_servings_dict.keys():
            recipe_servings_dict[recipe] = servings

    if write_to_db:
        # insert ingredients

        query_list = []

        for menu in recipe_data_dict.keys():
            print(menu)
            query = (
                'insert $m-i isa menu-item, has name "'
                + str(menu.lower())
                + '", has servings "'
                + str(recipe_servings_dict[menu])
                + '", has menu-type "'
                + str(', '.join(str(e.lower()) for e in recipe_type[menu]))
                + '", has category "'
                + str(', '.join(str(e.lower()) for e in recipe_category[menu]))
                + '";'
            )
            query_list.append(query)

        for ingredient in list(set(ingredient_list)):
            ingredient = ingredient.lower()

            if not np.isnan(annotated_ingredients_dict[ingredient]['Energy (Kcal)']):

                nutrient_dict = annotated_ingredients_dict[ingredient]
                print(nutrient_dict['Red/Processed Meat'])
                # list(annotated_ingredients_dict[ingredient].keys())
                # query = query.replace(';', ', ')
                query = ('insert $i isa ingredient, has name "' + ingredient + '", has is-red-or-processed-meat "' + ("no" if isinstance(nutrient_dict['Red/Processed Meat'], int) else "yes") + '", has is-veg-or-fruit "'
                         + ("no" if isinstance(nutrient_dict['Fruit/Veg'], int) else "yes") + '", has kcals-per-100-g "' + str(
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
                         + '", has sodium-per-100-g "' + str(
                             nutrient_dict['Sodium (mg)'])
                         + '", has potassium-per-100-g "' + str(nutrient_dict['Potassium (mg)']) + '"')
                try:
                    allergen = allergen_ingredient_dict[ingredient]

                    if allergen == 'Not a priority allergen':
                        query += ', has allergen "' + 'Not a priority allergen' + '"'
                    elif allergen == 'Notes':
                        query += ', has allergen "' + 'Notes' + '"'
                    elif allergen == 'none':
                        query += ', has allergen "' + 'none' + '"'
                    elif allergen == 'Flag Issue':
                        query += ', has allergen "' + 'Flag Issue' + '"'
                    else:
                        str_allergen = ""
                        if len(allergen) > 0:
                            for idx, al in enumerate(allergen):
                                if idx < (len(allergen)-1):
                                    str_allergen += str(al) + ", "
                                else:
                                    str_allergen += str(al)
                        print(str_allergen)
                        query += ', has allergen "' + \
                            str_allergen + '"'
                        # for al in allergen:
                        #     query += ', has allergen "' + str(al.lower()) + '"'

                except:
                    pass
                query += ';'

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
                        if np.isnan(recipe_data_dict[recipe][ingredient]):
                            weight = '0'
                        else:
                            weight = str(recipe_data_dict[recipe][ingredient])
                    relationships_count += 1
                    print(recipe, ' ', ingredient)
                    query = (
                        'match $m-i isa menu-item, has name "'
                        + str(recipe.lower())
                        + '", has servings "'
                        + str(recipe_servings_dict[recipe])
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

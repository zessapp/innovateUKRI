import networkx as nx
import pickle
import pandas as pd
import copy
import numpy as np
from os import listdir
from os.path import isfile, join
from eat_well.eat_well_features import EatWellFeatures
from Config.eat_well_config import query_dict

# Load and preprocess the queried Grakn subgraph


def populate_list_of_dicts(s, s1):
    ss = []
    for i, j in zip(s, s1):
        sss = {}
        for k, l in zip(i, j):
            sss[l] = k
        ss.append(sss)

    return ss


def common_member(a, b):
    a_set = set(a)
    b_set = set(b)
    if len(a_set.intersection(b_set)) > 0:
        return(True)

    return(False)


def load_process_subgraph(subgraph_path):

    # Replace to subgraph_path
    # subgraph_path='kg/'
    files = []
    for file in listdir(subgraph_path):
        if isfile(join(subgraph_path, file)):
            if file.startswith('nutrition_graph'):
                files.append(file)

    graph, nutrition_data_list = [], {}
    for file in files:
        graph.extend(pickle.load(open(subgraph_path + file, "rb")))

    nx.to_pandas_edgelist(copy.deepcopy(graph[0]))
    import os

    # ingredients = pickle.load(open('/Users/kostaspsychogyio/Desktop/eat-well/kg/ingredient_list.pkl', 'rb'))

    for idx in range(0, len(graph)):
        nutrition_list, nutrition_list_tags, nodes, source_data_col = [], [], [], []
        g = copy.deepcopy(graph[idx])
        # Load it in pandas dataframe
        df = nx.to_pandas_edgelist(g)

        # Group by labels
        # Go over, collect labels against ingredient name & collect to build dict/df
        for index, row in df.iterrows():
            node_id = row['target']
            try:
                if 'category' in str(node_id):
                    node_id = str(node_id).split(": ")[1].replace('>', '').replace('<', '')
                    # print(node_id)
                elif 'menu-type' in str(node_id):
                    node_id = str(node_id).split(": ")[1].replace('>', '').replace('<', '')
                    # print(node_id)
                elif 'allergen' in str(node_id):
                    node_id = str(node_id).split(': ')[1].replace('>', '')
                    # print(node_id)
                else:
                    node_id = str(node_id).split(",")[1].replace(
                        ">", "").strip().split(":", 1)[1]
                # print(node_id)
            except:
                try:
                    node_id = str(node_id).split(",")[1].replace(
                        ">", "").strip().split(":", 1)[1]
                except:
                    # node_id = str(node_id).split(",")
                    continue
                # node_id = str(node_id).split(",")
                    print('except', node_id)
            df.loc[index, 'target'] = node_id
            df.loc[index, 'source'] = str(row['source']).split(", ")[1][:-1]

        df = df[~df['target'].astype(str).str.startswith("<contains")]
        nutrition_list = df.groupby('source')['target'].apply(list).tolist()
        nutrition_list_tags = df.groupby('source')['type'].apply(list).tolist()
        nutrition_data_list[idx] = populate_list_of_dicts(
            nutrition_list, nutrition_list_tags)

    new_list = {}
    value_list_temp = []

    for key, value in nutrition_data_list.items():

        for v in value:
            for macro in query_dict.values():
                if macro in v.keys():
                    updated = {macro: str(
                        float(float(v['wg']) * float(float(v[macro])/100)))}
                    v.update(updated)

            value_list_temp.append(v)
        new_list[key] = value_list_temp
        value_list_temp = []

    for k, v_ in new_list.items():
        for v in v_:
            del v['wg']

    return nutrition_data_list


def returnNotMatches(a, b):
    a = set(a)
    b = set(b)
    return [list(b - a), list(a - b)]

def menu_type_check(user_menu_type, menu_type, usercase, score):
    menu_count = 0
    for menu in menu_type:
        if user_menu_type.lower() in menu:
            menu_count += 1
    if menu_count > 0:
        skip_loop = False
        return skip_loop
    if menu_count == 0:
        skip_loop = True
    if len(user_menu_type) == 0 and len(usercase) == 0:
        skip_loop = False
    return skip_loop


def check_cat_basic(usercase, category, skip_loop_count, score, user_menu_type, menu_type, usecase_list):
    '''
    Does a basic check to see if the recipe matches the category given
    '''
    for cat in category:
        cat_split = cat.lower().split(', ')
        for c in cat_split:
            for u in usecase_list:
                if c == u:
                    skip_loop_count += 1
    if len(user_menu_type) > 0:
        skip_loop = menu_type_check(user_menu_type, menu_type, usercase, score)
    else:
        skip_loop = False
    if skip_loop_count > 0: skip_loop = True
    return score, skip_loop


def check_cat_adv(main_cat, cat_list, category, user_menu_type, skip_loop_count, score, menu_type, usercase):
    '''
    Does a basic check to see if the recipe matches the category given
    '''
    if any(main_cat in cat for cat in category):
        for c in cat_list:
            if any(c in cat for cat in category):
                skip_loop_count += 1
        else:
            pass
        pass
    else:
        skip_loop_count += 1

    if len(user_menu_type) > 0:
        skip_loop = menu_type_check(user_menu_type, menu_type, usercase, score)
    else:
        skip_loop = False
    if skip_loop == False:
        if skip_loop_count > 0: skip_loop = True

    return score, skip_loop

# This needs major refactoring
def alt_check(ewf, user_menu_type, category, menu_type, ingredients, num_of_servings,
                menu_item_nutrition_table, usercase, verbose, calorie_intake,
                energy_percent, meals_per_day, menu_item):
    score = ewf.final_score_calculator(ingredients, num_of_servings,
                            menu_item_nutrition_table, usercase, verbose,
                            calorie_intake, energy_percent, meals_per_day)
    skip_loop_count = 0
    skip_loop = False

    if len(usercase) > 0:

        if usercase.lower().lstrip(' ') == 'vegan':
            score, skip_loop = check_cat_basic(usercase, category, skip_loop_count, score, user_menu_type, menu_type, ['meat', 'seafood', 'vegetarian', 'ovo-vegetarian', 'dairy-vegetarian'])
            return score, skip_loop

        elif usercase.lower().lstrip(' ') == 'vegetarian only':
            score, skip_loop = check_cat_adv('vegetarian', ['meat', 'seafood'], category, user_menu_type, skip_loop_count, score, menu_type, usercase)
            return score, skip_loop

        elif usercase.lower().lstrip(' ') == 'vegetarian':
            score, skip_loop = check_cat_basic(usercase, category, skip_loop_count, score, user_menu_type, menu_type,  ['meat', 'seafood'])
            return score, skip_loop

        elif usercase.lower().lstrip(' ') == 'ovo-vegetarian only':
            score, skip_loop = check_cat_adv('vegetarian', ['dairy-vegetarian', 'meat', 'seafood'], category, user_menu_type, skip_loop_count, score, menu_type, usercase)
            return score, skip_loop

        elif usercase.lower().lstrip(' ') == 'dairy-vegetarian only':
            score, skip_loop = check_cat_adv('vegetarian', ['ovo-vegetarian', 'meat', 'seafood'], category, user_menu_type, skip_loop_count, score, menu_type, usercase)
            return score, skip_loop

        elif usercase.lower().lstrip(' ') == 'seafood only':
            score, skip_loop = check_cat_adv('seafood', ['meat'], category, user_menu_type, skip_loop_count, score,  menu_type, usercase)
            return score, skip_loop

        elif usercase.lower().lstrip(' ') == 'seafood':
            score, skip_loop = check_cat_basic(usercase, category, skip_loop_count, score, user_menu_type, menu_type,  ['meat'])
            return score, skip_loop

        elif usercase.lower().lstrip(' ') == 'meat only':
            if any('meat' in cat for cat in category):
                skip_loop = False
                pass
            else:
                skip_loop_count += 1
            if len(user_menu_type) > 0: skip_loop = menu_type_check(user_menu_type, menu_type, usercase, score)
            if skip_loop == False:
                if skip_loop_count > 0: skip_loop = True
            return score, skip_loop
        else:
            skip_loop = False
            return score, skip_loop

    if len(user_menu_type) > 0:
        skip_loop = menu_type_check(user_menu_type, menu_type, usercase, score)


    return score, skip_loop

def eat_well_score_calculator(ewf, menu_item: str, nutrition_data_list: dict,
                                user_allergens: list, usercase: str,
                                user_menu_type: list, verbose: bool,
                                calorie_intake: float, energy_percent: float,
                                meals_per_day: float):

    # usercase, user_menu_type = 'dairy-vegetarian', 'breakfast'
    # user_allergens = 'egg'
    # menu_item = 'overnight oats'
    # verbose = True

    temp_li, labels, menu_item_ingredient_nutrient_data, nd = [], [], [], []

    menu_item_ingredients = []
    for sub_list in nutrition_data_list.values():
        for dict_object in sub_list:
            if dict_object["menu-item-has-ingredient"].lower().lstrip(' ') == menu_item.lower():
                menu_item_ingredients.append(dict_object["ingredient-belongs-to-menu-item"])
                menu_item_ingredient_nutrient_data.append(dict_object)

    menu_item_ingredients = list(set(menu_item_ingredients))

    all_ingredients_aggregate_nutrients_dict = []
    for ing in menu_item_ingredients:
        ingredient_aggregate_nutrients_dict = {}
        for menu_item_ingredient_nutrient_instance in menu_item_ingredient_nutrient_data:
            for val in menu_item_ingredient_nutrient_instance.values():
                if ing == val:
                    ingredient_aggregate_nutrients_dict.update(menu_item_ingredient_nutrient_instance)
        all_ingredients_aggregate_nutrients_dict.append(ingredient_aggregate_nutrients_dict)

    ingredients, allergens, category, menu_type = [], [], [], []
    num_of_servings = None
    tot_trans, tot_omega_6, tot_omega_3, tot_potassium, tot_sodium, tot_salt, tot_pufa, tot_saturates, \
    tot_mufa, tot_protein, tot_sugar, tot_energy, tot_fibre, tot_fat, tot_carbohydrate = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    recipe_names = []
    for r in all_ingredients_aggregate_nutrients_dict:
        recipe_names.append(r['menu-item-has-ingredient'])
    recipe_names = list(set(recipe_names))

    for i in all_ingredients_aggregate_nutrients_dict:
        for key, val in zip(i.keys(), i.values()):
            if key == 'ingredient-belongs-to-menu-item': ingredients.append(val)
            if key == 'alrgn': allergens.append(val)
            if key == 'cat': category.append(val)
            if key == 'mt': menu_type.append(val)
            if key not in ["menu-item-has-ingredient", "ingredient-belongs-to-menu-item", "alrgn", "cat", "mt"]: val = float(val)
            if key == "serv": num_of_servings = val
            if key == "trans": tot_trans += val
            elif key == "omega_6": tot_omega_6 += val
            elif key == "omega_3": tot_omega_3 += val
            elif key == "potassium": tot_potassium += val
            elif key == "sodium": tot_sodium += val
            elif key == "salt": tot_salt += val
            elif key == "pufa": tot_pufa += val
            elif key == "saturates": tot_saturates += val
            elif key == "mufa": tot_mufa += val
            elif key == "protein": tot_protein += val
            elif key == "sugar": tot_sugar += val
            elif key == "energy": tot_energy += val
            elif key == "fibre": tot_fibre += val
            elif key == "fat": tot_fat += val
            elif key == "carbohydrate": tot_carbohydrate += val

    labels = ["trans", "omega_6", "omega_3", "potassium", "sodium", "salt",
              "pufa", "saturates", "mufa", "protein", "sugar", "energy",
              "fibre", "fat", "carbohydrate"]

    values = [tot_trans, tot_omega_6, tot_omega_3, tot_potassium, tot_sodium,
              tot_salt, tot_pufa, tot_saturates, tot_mufa, tot_protein,
              tot_sugar, tot_energy, tot_fibre, tot_fat, tot_carbohydrate]

    menu_item_nutrition_table = pd.DataFrame([labels, values]).T

    # Return only matches with category
    # Discard anything with allergens and return only category and menu type matches
    if len(user_allergens) > 0:
        # Find matches
        allergen_matches = set([x.lower() for x in user_allergens]) & set([x.lower() for x in allergens])
        common_allergens_count = len(list(allergen_matches))
        if common_allergens_count > 0:
            skip_loop = True
            score = ewf.final_score_calculator(ingredients,num_of_servings, menu_item_nutrition_table, usercase, verbose, calorie_intake, energy_percent, meals_per_day)
            if skip_loop == True:
                print(f'Skipping for meal {menu_item}')
            return score, skip_loop, category, menu_type
        else:
            score , skip_loop = alt_check(ewf, user_menu_type, category, menu_type, ingredients, num_of_servings, menu_item_nutrition_table, usercase, verbose, calorie_intake, energy_percent, meals_per_day, menu_item)
            if skip_loop == True:
                print(f'Skipping for meal {menu_item}')
            return score , skip_loop, category, menu_type
    else:
        score , skip_loop = alt_check(ewf, user_menu_type, category, menu_type, ingredients, num_of_servings, menu_item_nutrition_table, usercase, verbose, calorie_intake, energy_percent, meals_per_day, menu_item)
        if skip_loop == True:
            print(f'Skipping for meal {menu_item}')
        return score , skip_loop, category, menu_type



def eat_well_scores_calculator(menu_items: str, nutrition_data_list: dict,
                                user_allergens: list, usercase: str,
                                user_menu_type: list, verbose: bool,
                                calorie_intake: float, energy_percent: float,
                                meals_per_day: float):
    user_menu_type = user_menu_type.lower()
    usercase = usercase.lower()
    scores, tot_ingredients, tot_energy, tot_carbohydrate, tot_protein, tot_fat, tot_salt, tot_sodium, tot_pufa, tot_mufa, tot_omega_3, \
        tot_omega_6, tot_fibre, tot_saturates, tot_trans_fats, tot_potassium = [
        ], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
    cat, mt = [], []
    tot_sugar = []
    allergens_free_menu_items = []
    ewf = EatWellFeatures()

    for menu_item in menu_items:
        if verbose:
            print("Menu Item: ", menu_item)
            print()
            print('Catgeory is: ', usercase, ' allergens given are: ', user_allergens)

        (score, contains_red_meat, ingredients, energy, carbohydrate, protein, fat, salt, sodium, pufa, mufa, omega_3, omega_6, fibre, saturates,
         trans_fats, potassium, sugar), skip_loop, category, menu_type = eat_well_score_calculator(ewf, menu_item, nutrition_data_list,
                                user_allergens, usercase,  user_menu_type, verbose, calorie_intake, energy_percent, meals_per_day)


        if usercase == None or usercase.lower() == "no requirements" \
                            or usercase.lower() == "meat" or len(usercase) == 0 \
                            or usercase.lower() == 'meat only' or usercase.lower() ==  '':

            if not skip_loop:
                scores.append(score)
                tot_ingredients.append(ingredients)
                tot_energy.append(energy)
                tot_carbohydrate.append(carbohydrate)
                tot_protein.append(protein)
                tot_fat.append(fat)
                tot_salt.append(salt)
                tot_sodium.append(sodium)
                tot_pufa.append(pufa)
                tot_mufa.append(mufa)
                tot_omega_3.append(omega_3)
                tot_omega_6.append(omega_6)
                tot_fibre.append(fibre)
                tot_saturates.append(saturates)
                tot_trans_fats.append(trans_fats)
                tot_potassium.append(potassium)
                tot_sugar.append(sugar)
                cat.append(category)
                mt.append(menu_type)
                if verbose:
                    print('---'*10)

                if not skip_loop:

                    allergens_free_menu_items.append(menu_item)

        if usercase.lower() == "vegan" \
        or usercase.lower() == "seafood" \
        or usercase.lower() == 'seafood only' \
        or usercase.lower() == 'vegetarian' \
        or usercase.lower() == 'vegetarian only' \
        or usercase.lower() == 'ovo-vegetarian' \
        or usercase.lower() == 'dairy-vegetarian':
            if not skip_loop and not contains_red_meat:
                scores.append(score)
                tot_ingredients.append(ingredients)
                tot_energy.append(energy)
                tot_carbohydrate.append(carbohydrate)
                tot_protein.append(protein)
                tot_fat.append(fat)
                tot_salt.append(salt)
                tot_sodium.append(sodium)
                tot_pufa.append(pufa)
                tot_mufa.append(mufa)
                tot_omega_3.append(omega_3)
                tot_omega_6.append(omega_6)
                tot_fibre.append(fibre)
                tot_saturates.append(saturates)
                tot_trans_fats.append(trans_fats)
                tot_potassium.append(potassium)
                tot_sugar.append(sugar)
                cat.append(category)
                mt.append(menu_type)
                if verbose:
                    print('---'*10)

                if not skip_loop:
                    allergens_free_menu_items.append(menu_item)

    total_nutrition_values = [tot_ingredients, tot_energy, tot_carbohydrate, tot_protein, tot_fat, tot_salt,
                              tot_sodium, tot_pufa, tot_mufa, tot_omega_3, tot_omega_6, tot_fibre, tot_saturates, tot_trans_fats, tot_potassium, tot_sugar, cat, mt]
    return allergens_free_menu_items, scores, total_nutrition_values

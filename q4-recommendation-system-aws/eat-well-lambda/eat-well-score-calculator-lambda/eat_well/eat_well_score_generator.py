import networkx as nx
import pickle
import pandas as pd
import copy
import numpy as np
from os import listdir
from os.path import isfile, join
from eat_well.eat_well_features import EatWellFeatures
from Config.eat_well_config import query_dict
import time

# Load and preprocess the queried Grakn subgraph


def populate_list_of_dicts(s, s1):
    ss = []
    for i, j in zip(s, s1):
        sss = {}
        for k, l in zip(i, j):
            sss[l] = k
        ss.append(sss)

    return ss


def load_process_subgraph(subgraph_path):
    start_time = time.time()

    # Replace to subgraph_path
    files = []
    for file in listdir(subgraph_path):
        if isfile(join(subgraph_path, file)):
            if file.startswith('nutrition_graph'):
                files.append(file)

    graph, nutrition_data_list = [], {}
    for file in files:
        graph.extend(pickle.load(open(subgraph_path + file, "rb")))

    nx.to_pandas_edgelist(copy.deepcopy(graph[0]))
    ingredients = pickle.load(
        open(subgraph_path + 'ingredient_list.pkl', 'rb'))

    for idx in range(0, len(graph)):
        nutrition_list, nutrition_list_tags, nodes, source_data_col = [], [], [], []
        g = copy.deepcopy(graph[idx])
        # Load it in pandas dataframe
        df = nx.to_pandas_edgelist(g)

        # Group by labels

        # Go over, collect labels against ingredient name & collect to build dict/df

        for node_id in list(df["target"].tolist()):
            # print(str(node_id).split(","))
            try:
                node_id = str(node_id).split(",")[1].replace(
                    ">", "").strip().split(":", 1)[1]
            except:
                try:
                    node_id = str(node_id).split(",")[1].replace(
                        ">", "").strip().split(":", 1)[1]
                except:
                    # node_id = str(node_id).split(",")
                    continue
                # node_id = str(node_id).split(",")
                    print('except', node_id)
            # node_id = node_id.rstrip(":")
            nodes.append(node_id[1:])
        df = nx.to_pandas_edgelist(g)
        df = df[~df['target'].astype(str).str.startswith("<contains")]

        df["target"] = nodes
        for i in df["source"].tolist():
            source_data_col.append(str(i).split(", ")[1][:-1])
        df["source"] = source_data_col
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

    elapsed_time = time.time() - start_time

    return nutrition_data_list, elapsed_time


def eat_well_score_calculator(menu_item, nutrition_data_list, user_allergens, verbose):

    temp_li, labels, menu_item_ingredient_nutrient_data, nd = [], [], [], []
    for sublst in nutrition_data_list.values():
        menu_item_ingredients = []
        for dict_object in sublst:
            if dict_object["menu-item-has-ingredient"].lower() == menu_item.lower():
                menu_item_ingredients.append(
                    dict_object["ingredient-belongs-to-menu-item"])

    menu_item_ingredients = list(set(menu_item_ingredients))
    # print(menu_item_ingredients)
    for ing in menu_item_ingredients:
        for sublst in nutrition_data_list.values():
            for dict_object in sublst:
                if dict_object["ingredient-belongs-to-menu-item"] == ing:
                    menu_item_ingredient_nutrient_data.append(dict_object)
                    break

    all_ingredients_aggregate_nutrients_dict = []
    for ing in menu_item_ingredients:
        ingredient_aggregate_nutrients_dict = {}
        for menu_item_ingredient_nutrient_instance in menu_item_ingredient_nutrient_data:
            for val in menu_item_ingredient_nutrient_instance.values():
                if ing == val:
                    ingredient_aggregate_nutrients_dict.update(
                        menu_item_ingredient_nutrient_instance)
        # print(ingredient_aggregate_nutrients_dict)
        all_ingredients_aggregate_nutrients_dict.append(
            ingredient_aggregate_nutrients_dict)

    ingredients, allergens = [], []
    num_of_servings = None
    tot_trans, tot_omega_6, tot_omega_3, tot_potassium, tot_sodium, tot_salt, tot_pufa, tot_saturates, tot_mufa, tot_protein, tot_sugar, tot_energy, tot_fibre, tot_fat, tot_carbohydrate = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    start_time = time.time()
    for i in all_ingredients_aggregate_nutrients_dict:
        for key, val in zip(i.keys(), i.values()):
            if key == "ingredient-belongs-to-menu-item":
                ingredients.append(val)
            if key not in ["menu-item-has-ingredient", "ingredient-belongs-to-menu-item", "alrgn"]:
                val = float(val)
            if key == "alrgn":
                allergens.append(val)
            if key == "serv":
                num_of_servings = val
            if key == "trans":
                tot_trans += val
            elif key == "omega_6":
                tot_omega_6 += val
            elif key == "omega_3":
                tot_omega_3 += val
            elif key == "potassium":
                tot_potassium += val
            elif key == "sodium":
                tot_sodium += val
            elif key == "salt":
                tot_salt += val
            elif key == "pufa":
                tot_pufa += val
            elif key == "saturates":
                tot_saturates += val
            elif key == "mufa":
                tot_mufa += val
            elif key == "protein":
                tot_protein += val
            elif key == "sugar":
                tot_sugar += val
            elif key == "energy":
                tot_energy += val
            elif key == "fibre":
                tot_fibre += val
            elif key == "fat":
                tot_fat += val
            elif key == "carbohydrate":
                tot_carbohydrate += val

    labels = ["trans", "omega_6", "omega_3", "potassium", "sodium", "salt", "pufa",
              "saturates", "mufa", "protein", "sugar", "energy", "fibre", "fat", "carbohydrate"]
    values = [tot_trans, tot_omega_6, tot_omega_3, tot_potassium, tot_sodium, tot_salt, tot_pufa,
              tot_saturates, tot_mufa, tot_protein, tot_sugar, tot_energy, tot_fibre, tot_fat, tot_carbohydrate]
    menu_item_nutrition_table = pd.DataFrame([labels, values]).T
    elapsed_time = time.time() - start_time
    ew = EatWellFeatures()

    if len(user_allergens) > 0:

        common_allergens_count = 0
        for user_allergen in user_allergens:
            for allergen in allergens:
                if user_allergen.lower() in allergen.lower():
                    common_allergens_count += 1

        if common_allergens_count > 0:
            has_allergens = True
            score = ew.final_score_calculator(
                ingredients, num_of_servings, menu_item_nutrition_table, verbose)

            return score, has_allergens, elapsed_time
        else:
            has_allergens = False
            score = ew.final_score_calculator(
                ingredients, num_of_servings, menu_item_nutrition_table, verbose)
            has_allergens = False
            if verbose:
                print(
                    '{} was discarded due to 1 on more allergens contained.'.format(menu_item))
            else:
                pass

            return score, has_allergens, elapsed_time
    else:
        score = ew.final_score_calculator(
            ingredients, num_of_servings, menu_item_nutrition_table, verbose)
        has_allergens = False
        print(score)

        return score, has_allergens, elapsed_time


def eat_well_scores_calculator(menu_items: list, nutrition_data_list: dict, user_allergens: list, verbose: bool):

    scores, tot_ingredients, tot_energy, tot_carbohydrate, tot_protein, tot_fat, tot_salt, tot_sodium, tot_pufa, tot_mufa, tot_omega_3, \
        tot_omega_6, tot_fibre, tot_saturates, tot_trans_fats, tot_potassium = [
        ], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
    allergens_free_menu_items = []
    for menu_item in menu_items:
        if verbose:
            print("Menu Item: ", menu_item)
            print()

        (score, ingredients, energy, carbohydrate, protein, fat, salt, sodium, pufa, mufa, omega_3, omega_6, fibre, saturates,
         trans_fats, potassium), has_allergens, elapsed_time = eat_well_score_calculator(menu_item, nutrition_data_list, user_allergens, verbose)

        if not has_allergens:
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
            if verbose:
                print('---'*10)

            if not has_allergens:
                allergens_free_menu_items.append(menu_item)
    total_nutrition_values = [tot_ingredients, tot_energy, tot_carbohydrate, tot_protein, tot_fat, tot_salt,
                              tot_sodium, tot_pufa, tot_mufa, tot_omega_3, tot_omega_6, tot_fibre, tot_saturates, tot_trans_fats, tot_potassium]

    return allergens_free_menu_items, scores, total_nutrition_values, elapsed_time

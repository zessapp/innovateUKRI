# from eat_well.eat_well_score_generator import load_process_subgraph, eat_well_score_calculator


menu_item = "Pizza Margherita"

nutrition_data_list = load_process_subgraph("kg/")
import networkx as nx
import matplotlib.pyplot as plt
import pickle
import pandas as pd
import copy
import numpy as np
from os import listdir
from os.path import isfile, join
import sys
from eat_well.eat_well_features import EatWellFeatures

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

    from Config.eat_well_config import query_dict
    # Replace to subgraph_path
    files = []
    for file in listdir('kg/'):
        if isfile(join('kg/', file)):
            if file.startswith('nutrition_graph'):
                files.append(file)

    graph, nutrition_data_list = [], {}
    for file in files:
        graph.extend(pickle.load(open('kg/' + file, "rb")))

    nx.to_pandas_edgelist(copy.deepcopy(graph[0]))
    ingredients = pickle.load(open('kg/ingredient_list.pkl', 'rb'))

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
                node_id = str(node_id).split(",")[1].replace(">", "").strip().split(":", 1)[1]
            except:
                try:
                    node_id = str(node_id).split(",")[1].replace(">", "").strip().split(":", 1)[1]
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

    print(len(nutrition_data_list), nutrition_data_list)
    new_list = {}
    value_list_temp = []
    for key,value in nutrition_data_list.items():

        for v in value:
            for macro in query_dict.values():
                if macro in v.keys():

                    updated = {macro: str(float(v['wg'] * float(v[macro]/100)))}
                    v.update(updated)
                    # del v['wg']
            value_list_temp.append(v)
            # print(value_list_temp)
        new_list[key] = value_list_temp
        value_list_temp = []

    for k,v_ in new_list.items():
        for v in v_:
            del v['wg']

    return nutrition_data_list

############################
    temp_li, labels, menu_item_ingredient_nutrient_data, nd = [], [], [], []
    for sublst in new_list.values():
        menu_item_ingredients = []
        for dict_object in sublst:
            if dict_object["menu-item-has-ingredient"].lower() == menu_item.lower():
                menu_item_ingredients.append(
                    dict_object["ingredient-belongs-to-menu-item"])

    menu_item_ingredients = list(set(menu_item_ingredients))

    for ing in menu_item_ingredients:
        for sublst in new_list.values():
            for dict_object in sublst:
                if dict_object["ingredient-belongs-to-menu-item"] == ing:
                    menu_item_ingredient_nutrient_data.append(dict_object)
                    break

    total_nutrition_values, total_nutrition_labels = [], []
    for i in menu_item_ingredient_nutrient_data:
        ingredient_nutrition_values = []
        nutrition = list(i.keys())[2:]
        values = list(i.values())[2:]
        total_nutrition_values.append([values])
        total_nutrition_labels.append([nutrition])

    append_labels = True
    for idx, (i, k) in enumerate(zip(total_nutrition_values, total_nutrition_labels)):
        if len(i[0]) > 1:
            for j, l in zip(i[0], k[0]):
                # print(j, l)
                if append_labels:
                    labels.append(l)
                temp_li.append(float(j))
                nd.append(temp_li)
        else:
            if append_labels:
                labels.append(k[0][0])
            append_labels = False
            temp_li.append(float(i[0][0]))
            b = np.array(temp_li)
            nd.append(b)
            temp_li = []

    meal_nutrition_matrix = np.stack(nd, axis=0)
    meal_nutrition_matrix = np.nan_to_num(meal_nutrition_matrix)
    row_sums = [sum(row) for row in meal_nutrition_matrix.T]
    menu_item_nutrition_table = pd.DataFrame([labels, row_sums]).T


    energy_df = menu_item_nutrition_table[menu_item_nutrition_table.iloc[:, 0] == 'energy']
    menu_item_nutrition_table[0]

    if len(energy_df[energy_df[0] == 0.0]) > 1:
        score = 0
        print(f"\033[93m WARNING: Bad annotations or calculation at index {(energy_df[energy_df['val'] == 0.0]).index}- total energy is 0\n\n\033[0m")
    else:
        # print(menu_item_nutrition_table)
        ew = EatWellFeatures()
        score = ew.final_score_calculator(menu_item_nutrition_table)


score = eat_well_score_calculator(menu_item, nutrition_data_list)

print("Menu Item {} has eat-well score: {}".format(menu_item, score))

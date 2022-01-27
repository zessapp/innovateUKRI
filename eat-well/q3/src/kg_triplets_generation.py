import networkx as nx
import matplotlib.pyplot as plt
from itertools import combinations
from collections import defaultdict
import pickle
import copy
from tqdm import tqdm
from typedb.client import *
import azlib.utils as azutils

"""
This file generates KG triplets of the type: (head -> relation -> tail). 


This script generates the following files:

kg.txt:           kg triplets from the extracted Grakn subgraph. This file is used as input for RippleNet
encoded_mapping:  mapping of KG entities to an encoded value. KG entities can be: ingredient, recipe title, cuisine   

To run the script: python kg_triplets_generation.py
data prerequisites: graphs_subset_graphs.pkl
"""


# Load the queried Grakn subgraph
graph = pickle.load(
    open(
        "../DataSet/graphs_subset_graphs.pkl",
        "rb",
    )
)
g = copy.deepcopy(graph[0])
# Load it in pandas dataframe
df = nx.to_pandas_edgelist(g)
nodes = []
# Replace Grakn encoded entity ids with the actual entity
for node_id in list(df["target"].tolist()):
    node_id = str(node_id).split(",")[1].replace(">", "").strip().split(":", 1)[1]
    node_id = node_id.rstrip(":")
    nodes.append(node_id[1:])

df = nx.to_pandas_edgelist(g)
df["target"] = nodes

# starting nodes (head entity) for the kg triplets
nodes = list(set(df["target"]))

# Generate all kg triplets
hrt_triplets = []

for node in tqdm(nodes):
    for i in df[df["source"] == node]["target"].tolist():
        for j in df[df["source"] == i]["target"].tolist():
            if node != i and i != j and node != j:
                hrt_triplets.append([node, i, j])
        for j in df[df["target"] == i]["source"].tolist():
            if node != i and i != j and node != j:
                hrt_triplets.append([node, i, j])
    for idx, i in zip(
        df.index[df["target"] == node].tolist(),
        df[df["target"] == node]["source"].tolist(),
    ):
        k = df["type"][idx]
        for j in df[df["target"] == i]["source"].tolist():
            if node != i and i != j and node != j:
                hrt_triplets.append([node, i, j])
        for j in df[df["source"] == i]["target"].tolist():
            if node != i and i != j and node != j:
                hrt_triplets.append([node, k, j])

for idx, hrt in enumerate(hrt_triplets):
    if hrt[1] == "ingredient-belongs-to-menu-item":
        hrt_triplets[idx][1] = 0
    elif hrt[1] == "menu-item-has-ingredient":
        hrt_triplets[idx][1] = 1
    elif hrt[1] == "cuisine-contains":
        hrt_triplets[idx][1] = 2
    elif hrt[1] == "belongs-to-cuisine":
        hrt_triplets[idx][1] = 3

anonymised_entity_dict = {}
seed = 3

for hrt in hrt_triplets:
    if hrt[0] not in anonymised_entity_dict:
        seed += 1
        anonymised_entity_dict[hrt[0]] = seed
    if hrt[2] not in anonymised_entity_dict:
        seed += 1
        anonymised_entity_dict[hrt[2]] = seed

encoded_hrt_triplets = []

for hrt in hrt_triplets:
    head = anonymised_entity_dict[hrt[0]]
    relation = hrt[1]
    tail = anonymised_entity_dict[hrt[2]]
    encoded_hrt_triplets.append([head, relation, tail])

# transform ratings from lists to text by line similar to ripplenet movie ratings
with open("../Ripplenet/data/restaurant/kg.txt", "w") as f:
    for encoded_hrt_triplet in encoded_hrt_triplets:
        f.write(str(encoded_hrt_triplet)[1:-1].replace(", ", "\t") + "\n")

# Store the mapping dict to encode the ratings file
import json

with open("../Ripplenet/data/restaurant/encoded_mapping.txt", "w") as f:
    json.dump(anonymised_entity_dict, f)

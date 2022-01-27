import typedb
import operator
import networkx as nx
import pandas as pd
import numpy as np
import pickle
import math
import os
import sys
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from collections import defaultdict

from typing import List
from ast import literal_eval
from typedb.client import TransactionType
from gensim.models import Word2Vec
from sklearn.manifold import TSNE
from sklearn.decomposition import PCA

sys.path.append("./../")


# ------------------------------------------------------------------------------
# UTIL FUNCTIONS FOR PATH EXTRACTION


def get_id_name_map(
    session: typedb.connection.session,
    mode: str = "id_to_name",
    test_duplicate: bool = True,
    print_sample_n: int = 0,
) -> tuple:
    """Build the ID-Entity lookup tables for the three entities in the cocktail graph:
        - compound-ingredient
        - non-compound-ingredient
        - flavor-compound
    Args:
        session: Session connected to the TypeDB instance.
        mode (str): "id_to_name" or "name_to_id"
        print_sample_n (int): Print random n mapping pairs.
    Return:
        (tuple): map_c, map_n, map_f
    """
    with session.transaction(TransactionType.READ) as tx:
        # f: flavor-compound
        # c: compound-ingredient
        # n: non-compound-ingredient
        c_iterator = tx.query().match("match $c isa menu-item, has name $cn;")
        n_iterator = tx.query().match("match $n isa ingredient, has name $nn;")
        f_iterator = tx.query().match("match $f isa cuisine, has name $fn;")

        map_c = {}
        map_n = {}
        map_f = {}
        c_duplicate_count = 0
        n_duplicate_count = 0
        f_duplicate_count = 0

        if mode == "id_to_name":
            for c in c_iterator:
                map_c[c.get("c").get_iid()] = c.get("cn").get_value()
            for n in n_iterator:
                map_n[n.get("n").get_iid()] = n.get("nn").get_value()
            for f in f_iterator:
                map_f[f.get("f").get_iid()] = f.get("fn").get_value()

            # compute duplicate counts
            if test_duplicate:
                c_duplicate_count = len(map_c.values()) - len(set(map_c.values()))
                c_duplicate_count = len(map_n.values()) - len(set(map_c.values()))
                c_duplicate_count = len(map_f.values()) - len(set(map_c.values()))
        else:
            for c in c_iterator:
                if test_duplicate and c.get("cn").get_value() in map_c:
                    c_duplicate_count += 1
                map_c[c.get("cn").get_value()] = c.get("c").get_iid()
            for n in n_iterator:
                if test_duplicate and n.get("nn").get_value() in map_n:
                    n_duplicate_count += 1
                map_n[n.get("nn").get_value()] = n.get("n").get_iid()
            for f in f_iterator:
                if test_duplicate and f.get("fn").get_value() in map_f:
                    f_duplicate_count += 1
                map_f[f.get("fn").get_value()] = f.get("f").get_iid()

    # print sample
    if print_sample_n > 0:
        print(f"\nMenu Items Total Count: {len(map_c)}")
        for k, v in list(map_c.items())[:print_sample_n]:
            print(f"{k}: {v}")

        print(f"\nIngredients Total Count: {len(map_n)}")
        for k, v in list(map_n.items())[:print_sample_n]:
            print(f"{k}: {v}")

        print(f"\nCuisines Total Count: {len(map_f)}")
        for k, v in list(map_f.items())[:print_sample_n]:
            print(f"{k}: {v}")
    else:
        print(f"Menu Items Total Count: {len(map_c)}")
        print(f"Ingredients Total Count: {len(map_n)}")
        print(f"Cuisine Total Count: {len(map_f)}")

    # print duplicate test results
    if test_duplicate:
        pass
        # print(f"\nDuplicate Compound-Ingredient Count: {c_duplicate_count}")
        # print(f"Duplicate Non-Ingredient Count: {n_duplicate_count}")
        # print(f"Duplicate Flavor-Compound Count: {f_duplicate_count}")

    return map_c, map_n, map_f


def sort_graph_nodes(g, seed, map_id_to_name):
    """Sorts the NetworkX extracted paths and returns a list of nodes in the right order."""
    df = nx.to_pandas_edgelist(g)
    update_pointer = seed
    stack = []
    while len(stack) < 2 * len(g.nodes) - 2:
        for element_source, element_target in zip(
            df["source"].tolist(), df["target"].tolist()
        ):
            element_source = str(element_source)
            element_target = str(element_target)

            if update_pointer in element_source:
                update_pointer = element_target
                stack.append(element_source)
                stack.append(element_target)
            elif update_pointer in element_target:
                update_pointer = element_source
                stack.append(element_target)
                stack.append(element_source)

    path = []
    for i in stack:
        if i not in path:
            path.append(i)

    nodes_path = []
    for i in path:
        if "used-with" in i or "bound-to" in i:
            pass
        else:
            nodes_path.append(i)

    nodes_path_f = []
    for node in nodes_path:
        node_id = node.split(",")[1].replace(">", "").strip()
        nodes_path_f.append(map_id_to_name[node_id])

    return nodes_path_f


# ------------------------------------------------------------------------------
# UTIL FUNCTIONS FOR DIM REDUCTION


def get_model_ingredient_vectors_names(
    model: Word2Vec,
    map_c_id_to_name: dict,
    map_n_id_to_name: dict,
    verbose: bool = True,
) -> tuple:
    """
    Return:
        (tuple): ingredient_names (list) - Ingredient names in the order of the first dimension of ingredient_vectors.
                 ingredient_vectors (np.ndarray) - 2d vectors of the ingredients with dimension (vcab_size x embedding_dim).
                 index_end_compound_ingred (int) - Ending index of the compound ingredients in ingredient_names & ingredient_vectors.
    """
    # build vectors for compound ingredients
    if verbose:
        print("Building vectors for compound ingredients...")
    ingredient_vectors, ingredient_names = [], []
    for node_name in map_c_id_to_name.values():
        ingredient_vectors.append(model.wv[node_name])
        ingredient_names.append(node_name)
    node_count_compound_ingred = len(ingredient_vectors)
    if verbose:
        print(f"# of Compound Ingredients: {node_count_compound_ingred}")

    # build vectors for non-compound ingredients
    # NOTE: Some non-compound ingredients are not found because only ingredients with
    #       NPMI >= 0.25 have the relations established in the db.
    if verbose:
        print("Building vectors for non-compound ingredients...")
    for node_name in map_n_id_to_name.values():
        try:
            ingredient_vectors.append(model.wv[node_name])
            ingredient_names.append(node_name)
        except:
            if verbose:
                print(f"\tNon-compound Ingrendient Not Found: {node_name}")
    if verbose:
        print(
            f"# of Non-compound Ingredients: {len(ingredient_vectors) - node_count_compound_ingred}"
        )
        print("Completed!")

    index_end_compound_ingred = node_count_compound_ingred
    return ingredient_names, ingredient_vectors, index_end_compound_ingred


# TODO: Clean up the codes...
def plot_ingredients(
    transform_name: str,
    node_embeddings_2d: np.ndarray,
    node_names: np.ndarray,
    indice_non_compound_ingred: tuple,
    indice_compound_ingred: tuple,
    filter_names: list = [],
    compound_alpha: float = 1,
    non_compound_alpha: float = 0.5,
    fig_size: tuple = (25, 25),
    axis_lim: tuple = None,
) -> None:
    """Plot the node vectors on to a 2d plane.
    Args:
        transform_name (str): Name of the dim reduction model.
        node_embeddings_2d (np.ndarray): 2D array of the node embedding.
        node_names (list): List of the node names with index corresponding to node_embeddings_2d's first dim.
        indice_non_compound_ingred (tuple): (start_index, end_index) for non-compound ingredients in node_embeddings_2d and node_names.
        indice_compound_ingred (tuple): (start_index, end_index) for compound ingredients in node_embeddings_2d and node_names.
        filter_names (list): List of the ingredient names to show in the plot. Enter an empty list to show all ingredients.
        compound_alpha (float): Alpha transparency for compound points & text in the plot.
        non_compound_alpha (float): Alpha transparency for non-compound points & text in the plot.
        fig_size (tuple): Plot figure size.
        axis_lim (tuple): xlim and ylim tuples. Enter None to let plt determine automatically.
    """

    i_start, i_end = indice_non_compound_ingred[0], indice_non_compound_ingred[1]
    embeddings_non_compound = node_embeddings_2d[i_start:i_end, :]
    names_non_compound = node_names[i_start:i_end]

    i_start, i_end = indice_compound_ingred[0], indice_compound_ingred[1]
    embeddings_compound = node_embeddings_2d[i_start:i_end, :]
    names_compound = node_names[i_start:i_end]

    if len(filter_names) > 0:
        mask_non_compound = np.isin(names_non_compound, filter_names)
        mask_compound = np.isin(names_compound, filter_names)

        embeddings_non_compound = embeddings_non_compound[mask_non_compound, :]
        names_non_compound = names_non_compound[mask_non_compound]
        embeddings_compound = embeddings_compound[mask_compound, :]
        names_compound = names_compound[mask_compound]

    # initiate plot
    plt.figure(figsize=fig_size)
    plt.legend(
        handles=[
            mpatches.Patch(color="green", label="Non-compound Ingredient"),
            mpatches.Patch(color="red", label="Compound Ingredient"),
        ]
    )
    plt.title(f"{transform_name} Visualization for Node Embeddings")
    if axis_lim is not None:
        plt.xlim(axis_lim)
        plt.ylim(axis_lim)

    # add dots
    plt.scatter(
        embeddings_non_compound[:, 0],
        embeddings_non_compound[:, 1],
        color="green",
        alpha=non_compound_alpha,
    )
    plt.scatter(
        embeddings_compound[:, 0],
        embeddings_compound[:, 1],
        color="red",
        alpha=compound_alpha,
    )

    # add text
    for i, txt in enumerate(names_non_compound):
        text = plt.annotate(
            txt, (embeddings_non_compound[:, 0][i], embeddings_non_compound[:, 1][i])
        )
        text.set_alpha(non_compound_alpha)
    for i, txt in enumerate(names_compound):
        text = plt.annotate(
            txt, (embeddings_compound[:, 0][i], embeddings_compound[:, 1][i])
        )
        text.set_alpha(compound_alpha)

    plt.show()
    pass


# ------------------------------------------------------------------------------
# UTIL FUNCTIONS FOR VECTOR DISTANCE ANALYSIS


def compare(a_vector: np.ndarray, b_vector: np.ndarray) -> tuple:
    """Compute cosine distance function between 2 vectors, a and b."""

    ma = np.linalg.norm(a_vector)
    mb = np.linalg.norm(b_vector)
    score = (np.dot(a_vector, b_vector)) / (ma * mb)

    return score


def find_pairings_by_cos(
    ingredient_names: list,
    model: Word2Vec,
    model_ingredient_names: list,
    top_n_pairings: int = 5,
):
    """Recommend ingredient pairs by consine distances.
    Args:
        ingredient_names (list): Names of the ingredients to be paired.
        model (Word2Vec): Trained model. Embedding matrix will be extracted.
        model_ingredient_names (list): Ingredient names that corrspond to the embedding matrix inputs.
        top_n_pairings (int): # of pairing ingredients to be extracted.
    """
    paired_ingredients, scores = [], []
    summed_vector = np.zeros(100)
    for name in ingredient_names:
        vector = model.wv[name]
        summed_vector += vector

    ingredient_vector_dict = {}
    for name in model_ingredient_names:
        ingredient_vector_dict[name] = model.wv[name]

    scoring_dict = {}
    for key, val in zip(ingredient_vector_dict.keys(), ingredient_vector_dict.values()):
        score = compare(summed_vector, val)
        scoring_dict[key] = score
    sorted_scoring_dict = dict(
        sorted(scoring_dict.items(), key=operator.itemgetter(1), reverse=True)
    )

    for idx, (key, val) in enumerate(
        zip(sorted_scoring_dict.keys(), sorted_scoring_dict.values())
    ):
        if idx <= top_n_pairings + 1 and key not in ingredient_names:
            paired_ingredients.append(key)
            scores.append(val)

    return paired_ingredients, scores


def get_npmi_pairs() -> tuple:
    """Get ingredient-NPMI pairs.
    Return:
        npmi_pair_scores (list): List of score pair tuples. E.g. (('coca-cola', 'beer'), 0.37072622585250825)
        npmi_pair_scores_dict (dict): Dict of score pairs. Key is the ingredient-pair sorted
                                      in alphabetical order, converted to string by joining with '-'.
                                      e.g. {'beer-coca-cola': 0.37072622585250825,
                                            'coca-cola-tennessee whiskey': 0.6234571625127486}
    """
    pwd = os.path.dirname(os.path.realpath("__file__"))
    with open(f"{pwd}/data/npmi_pair_scores.pkl", "rb") as f:
        npmi_pair_scores = pickle.load(f)

    npmi_pair_scores_dict = defaultdict(lambda: None)
    for pair in npmi_pair_scores:
        # key is ingredient pair sorted alphabetically
        key = list(pair[0])
        key.sort()
        key_str = "-".join(key)

        npmi_pair_scores_dict[key_str] = pair[1]

    return npmi_pair_scores, npmi_pair_scores_dict


def recipe_based_pairings(name, top_n_pairings, npmi_pair_scores) -> tuple:
    """Function to recommend pairing simply using NMPI scores."""
    paired_ingredients = []
    for pairing, score in npmi_pair_scores:
        if pairing[0] == name:
            paired_ingredients.append((pairing[1], score))
        elif pairing[1] == name:
            paired_ingredients.append((pairing[0], score))

    # sort list of tuple based on the scores
    paired_ingredients.sort(key=lambda x: x[1])

    # return top_n results
    top_n = {}
    for idx in range(top_n_pairings):
        ingredient = paired_ingredients[-1 - idx]
        top_n[ingredient[0]] = ingredient[1]

    return top_n, paired_ingredients


def load_npmi_scores(ingredient: str, paired_ingredients: List[str]) -> List[float]:
    """Load NPMI scores for the ingredient pair, if found from the dict instances
    returned by get_npmi_pairs().
    Args:
        ingredient (str): Main ingredient to be paired.
        paired_ingredients (List[str]): Ingredients that are paired to the main ingredient.
    Return:
        (List[float]): A list of NPMI scores in the order of paired_ingredients. Note that
                       the scores can be missing for ingredients if the two ingredients do
                       co-occur in the same recipe or do not co-occur frequently enough to
                       have an NPMI >= 0.25 in the graph DB.
    """
    _, npmi_pair_scores_dict = get_npmi_pairs()

    scores = {}
    for paired_igred in paired_ingredients:
        # build key
        pair = [ingredient, paired_igred]
        pair.sort()
        key_str = "-".join(pair)

        # insert to hash table
        scores[paired_igred] = npmi_pair_scores_dict[key_str]

    return scores

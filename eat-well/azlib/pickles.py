import typedb
import networkx as nx
import pandas as pd
import numpy as np
import pickle
import math
import sys

from typing import List
from ast import literal_eval
from typedb.client import TransactionType

sys.path.append('./../')
from Migrators.Utilities.utilities import get_files
from Migrators.Food.food_recipe_pairing_migrator import make_df

#TODO: This is just an extract from Migrators.Food.food_recipe_pairing_migrator. Should
#      rewrite for a better architecture.
def rebuild_pkls(
    pwd: str,
    flavordb_dir: str = "/../DataSet/flavordb/",
    cocktaildb_dir: str = "/../DataSet/Cocktails/"
) -> None:
    """Rebuild the following pkl files:
        - compound_ingredients.pkl
        - non_compound_ingredients.pkl
        - npmi_pair_scores.pkl
    """
    flavordb_dir = pwd + flavordb_dir
    cocktaildb_dir = pwd + cocktaildb_dir

    # pull flavorDB files
    files = get_files(flavordb_dir)
    df_c = pd.DataFrame()
    for file in files:
        with open(file, "r") as input_file:
            try:
                df_c = df_c.append(pd.read_csv(input_file, delimiter="\t"))
            except:
                pass

    # pull CocktailDB files & select only ingredient columns
    files = get_files(cocktaildb_dir)
    df = make_df(cocktaildb_dir, files)
    df = df.iloc[:, :16]

    # extract unique ingredients
    filter_out = ["", "none"]  # ingredient tokens to be removed from list
    cocktail_total_ingredients = []
    for column in df.columns[1:]:
        cocktail_total_ingredients.append(df[column].tolist())
    cocktail_total_ingredients = [i for j in cocktail_total_ingredients for i in j]
    cocktail_total_ingredients = set(cocktail_total_ingredients)
    cocktail_total_ingredients = [
        item for item in cocktail_total_ingredients if item not in filter_out
    ]

    # generate all possible pairings ((n*(n-1))/2)
    pairings = [
        (a, b)
        for idx, a in enumerate(cocktail_total_ingredients)
        for b in cocktail_total_ingredients[idx + 1 :]
    ]

    # extract recipes
    recipes = []
    for row in range(0, len(df)):
        recipes.append(df.iloc[row][1:].tolist())

    # remove empty & None tokens
    filtered_recipes = []
    for recipe in recipes:
        filtered_recipe = []
        for ingredient in recipe:
            if ingredient not in filter_out:
                filtered_recipe.append(ingredient)
        filtered_recipes.append(filtered_recipe)

    # compute "pair scores" based on pairing frequency
    d = {}
    for pairing in pairings:
        # first_ingredient_score: +1 if the 1st ingredient appears in the recipe
        # second_ingredient_score: +1 if the 2nd ingredient appears in the recipe
        # both_ingredients_score: +1 if both ingredients appear in the recipe
        first_ingredient_score, second_ingredient_score, both_ingredients_score = (
            0,
            0,
            0,
        )

        for recipe in filtered_recipes:
            if pairing[0] in recipe:
                first_ingredient_score += 1
            if pairing[1] in recipe:
                second_ingredient_score += 1
            if pairing[0] in recipe and pairing[1] in recipe:
                both_ingredients_score += 1
            d[pairing] = [
                first_ingredient_score,
                second_ingredient_score,
                both_ingredients_score,
            ]

    # compute pmi & npmi, and determine the degree of connection for each pair
    # TODO: Is npmi computed correctly? https://tinyurl.com/yerlg7rc
    strongly_connected_pairings = []
    num_recipes = len(filtered_recipes)
    c = 0
    for pairing, scores in zip(d.keys(), d.values()):
        npmi, pmi = np.nan, np.nan
        score = (scores[2] / (num_recipes)) / (
            (scores[0] / num_recipes) * (scores[1] / num_recipes)
        )
        # TODO: Evaluate the validity of the threshold 0
        # TODO: In the FlavorGraph paper, there are three selection criteria:
        #       - Each ingredient appears more than 20 times in Recipe1M
        #       - Both ingredients appear more than 4 times in the same recipe
        #       - NPMI >= 0.25
        #       - If NPMI < 0.25, still include the pair if it ranks top 20
        if scores[2] > 0:
            pmi = math.log(score)
            npmi = pmi / (-math.log(scores[2] / (num_recipes)))
            # print(pairing, npmi, scores[0], scores[1], scores[2])
            if npmi > 0.25:
                strongly_connected_pairings.append(tuple((pairing, npmi)))
    # pull compounds for cocktail_total_ingredients if there is a match
    # df_c is the raw df extracted from "./DataSet/flavordb/"
    compound_ingredients = []
    for i in cocktail_total_ingredients:
        if i in set(df_c["alias"].tolist()):
            compound_ingredients.append(i)
    with open(
        f"{pwd}/data/compound_ingredients.pkl",
        "wb",
    ) as f:
        print('Writing compound_ingredients.pkl...')
        pickle.dump(compound_ingredients, f)

    # pickle list of of non compound ingredients
    non_compound_ingredients = []
    for i in cocktail_total_ingredients:
        if i not in compound_ingredients:
            non_compound_ingredients.append(i)
    with open(
        f"{pwd}/data/non_compound_ingredients.pkl",
        "wb",
    ) as f:
        print('Writing non_compound_ingredients.pkl...')
        pickle.dump(non_compound_ingredients, f)

    # pickle and store npmi scores for all ingredient-ingredient pairs
    with open(
        f"{pwd}/data/npmi_pair_scores.pkl",
        "wb",
    ) as f:
        print('Writing npmi_pair_scores.pkl...')
        pickle.dump(strongly_connected_pairings, f)
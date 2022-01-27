# Import dependencies

import pandas as pd
import json
from ast import literal_eval
import numpy as np
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd

"""
This file generates menus_dict.txt. Contains menu items and their title, type of dish, cuisine and ingredients. 

"""
if __name__ == "__main__":

    # top_9k_recipes/ folder contains recipes' ingredients. It is the output file of the NER parser + dependency rules.
    filepath = "data/top_9k_recipes/"

    recipes_file = filepath + "top_9k_recipes_part_1_processed.json"
    with open(recipes_file, "r") as inp:
        recipes_part_1 = json.load(inp)
    recipes_file = filepath + "top_9k_recipes_part_2_processed.json"
    with open(recipes_file, "r") as inp:
        recipes_part_2 = json.load(inp)
    recipes_file = filepath + "top_9k_recipes_part_3_processed.json"
    with open(recipes_file, "r") as inp:
        recipes_part_3 = json.load(inp)
    recipes = recipes_part_1 + recipes_part_2 + recipes_part_3

    # Extract the auto-generated ingredients for each recipe from the 9k recipe corpus.
    c = 0
    all_ingredients, recipe_ingredients_dictionary = [], {}
    c1 = 0
    processed_recipes = []
    for recipe in recipes:
        recipe_ingredients = []
        if recipe["title"] not in processed_recipes:
            processed_recipes.append(recipe["title"])
            try:
                for recipe_sentence in recipe["ingredients"]:
                    ingredient_dict = recipe_sentence["predictions"][0]["prediction"][
                        "ingredient"
                    ]
                    c1 += 1
                    ingredient = str()
                    for key, val in zip(
                        ingredient_dict.keys(), ingredient_dict.values()
                    ):
                        if key == "description":
                            ingredient += val + " "
                        else:
                            ingredient += val
                    recipe_ingredients.append(ingredient)
                    all_ingredients.append(ingredient)
            except:
                recipe_ingredients.append(ingredient)
                for field in recipe["ingredients"][0]["predictions"][0]["prediction"]:
                    if field == "ingredient":
                        try:
                            c1 += 1
                            ingredient = recipe["ingredients"][0]["predictions"][0][
                                "prediction"
                            ][field]["name"]
                            recipe_ingredients.append(ingredient)
                            all_ingredients.append(ingredient)
                        except:
                            c += 1

            recipe_ingredients_dictionary[recipe["title"]] = list(
                set(recipe_ingredients)
            )

    # Here we import the annotated restaurant menus and extract the recipe titles of the menus and the list of
    # unique ingredients respectively.

    df_menus = pd.read_csv("data/gsheets.tsv", "\t")
    df_menus.rename(
        columns={"main": "starters & side dishes", "starters & side dishes": "main"},
        inplace=True,
    )

    main_recipes = []
    for dish, cuisine, restaurant_id in zip(
        df_menus["main"], df_menus["cuisine"], df_menus["restaurant_id"]
    ):
        if dish not in [np.nan, "-"]:
            main_recipes.append([dish.lower(), cuisine, restaurant_id])

    side_recipes = []
    for dish, cuisine, restaurant_id in zip(
        df_menus["starters & side dishes"],
        df_menus["cuisine"],
        df_menus["restaurant_id"],
    ):
        if dish not in [np.nan, "-"]:
            side_recipes.append([dish.lower(), cuisine, restaurant_id])

    dessert_recipes = []
    for dish, cuisine, restaurant_id in zip(
        df_menus["desserts"], df_menus["cuisine"], df_menus["restaurant_id"]
    ):
        if dish not in [np.nan, "-"]:
            dessert_recipes.append([dish.lower(), cuisine, restaurant_id])

    annotated_menus_recipe_ingredients_dictionary = {}
    for recipe, ingredients in zip(
        recipe_ingredients_dictionary.keys(), recipe_ingredients_dictionary.values()
    ):
        for main_recipe in main_recipes:
            if recipe.lower() == main_recipe[0]:
                if len(ingredients) > 2:
                    annotated_menus_recipe_ingredients_dictionary[recipe] = [
                        "main",
                        main_recipe[1],
                        main_recipe[2],
                        ingredients,
                    ]

    for recipe, ingredients in zip(
        recipe_ingredients_dictionary.keys(), recipe_ingredients_dictionary.values()
    ):
        for side_recipe in side_recipes:
            if recipe.lower() == side_recipe[0]:
                if len(ingredients) > 2:
                    annotated_menus_recipe_ingredients_dictionary[recipe] = [
                        "side",
                        side_recipe[1],
                        side_recipe[2],
                        ingredients,
                    ]

    for recipe, ingredients in zip(
        recipe_ingredients_dictionary.keys(), recipe_ingredients_dictionary.values()
    ):
        for dessert_recipe in dessert_recipes:
            if recipe.lower() == dessert_recipe[0]:
                if len(ingredients) > 2:
                    annotated_menus_recipe_ingredients_dictionary[recipe] = [
                        "dessert",
                        dessert_recipe[1],
                        dessert_recipe[2],
                        ingredients,
                    ]

    # Separate menu items to main_course, starters and desserts
    main_courses = df_menus["main"].tolist()
    starters = df_menus["starters & side dishes"].tolist()
    desserts = df_menus["desserts"].tolist()

    def extract_recipe_titles(li):
        recipe_titles = []
        for i in li:
            if i not in [np.nan, "-"] and len(i) > 0:
                recipe_titles.append(i.lower())

        return recipe_titles

    recipe_titles_main = extract_recipe_titles(main_courses)
    recipe_titles_side = extract_recipe_titles(starters)
    recipe_titles_dessert = extract_recipe_titles(desserts)

    # Extract all recipe titles from restaurant menus
    recipe_titles = recipe_titles_main + recipe_titles_side + recipe_titles_dessert
    recipe_titles = list(set(recipe_titles))

    recipes = []
    for recipe in recipe_titles:
        for (recipe_from_dict, ings_from_dict) in zip(
            recipe_ingredients_dictionary.keys(), recipe_ingredients_dictionary.values()
        ):
            if recipe == recipe_from_dict.lower():
                recipes.append(recipe_from_dict)
                break

    check = []
    for recipe in recipe_titles:
        for (recipe_from_dict, ings_from_dict) in zip(
            recipe_ingredients_dictionary.keys(), recipe_ingredients_dictionary.values()
        ):
            if recipe == recipe_from_dict.lower():
                check.append(ings_from_dict)
                break

    check = [i for sub in check for i in sub]
    check = list(set(check))
    titles = list(annotated_menus_recipe_ingredients_dictionary.keys())
    total_info = list(annotated_menus_recipe_ingredients_dictionary.values())
    df = pd.DataFrame({"total_info": total_info}, index=titles)
    df.to_csv("data/all_menu_titles.csv")
    df = pd.DataFrame({"unique_ingredients": list(set(check))})
    df.to_csv("data/unique-ingredients.csv")

    # Generate a corpus of all menu items' ingredients to calculate tf-idf score for the ingredients of every menu item
    corpus = []
    for info in total_info:
        sub_corpus = ""
        for ing in info[3]:
            temp = ing.replace("  ", "_")
            temp = temp.replace(" ", "_")
            if len(sub_corpus) == 0:
                sub_corpus += temp
            else:
                sub_corpus += ", " + temp

        corpus.append(sub_corpus)

    tfIdfTransformer = TfidfTransformer(use_idf=True)
    countVectorizer = CountVectorizer()
    wordCount = countVectorizer.fit_transform(corpus)
    newTfIdf = tfIdfTransformer.fit_transform(wordCount)

    recipe_index = 0
    scores_dict = {}
    for recipe_index in range(len(corpus)):
        df = pd.DataFrame(
            newTfIdf[recipe_index].T.todense(),
            index=countVectorizer.get_feature_names(),
            columns=["TF-IDF"],
        )
        df = df.sort_values("TF-IDF", ascending=False)

        recipe_score_dict = {}
        df = df[df["TF-IDF"] > 0]
        for idx, score in enumerate(df["TF-IDF"]):
            recipe_score_dict[df.index[idx].replace("_", " ")] = round(score, 2)
        scores_dict[titles[recipe_index]] = recipe_score_dict

    menus = {}
    menus_nested_list = []
    for recipe, info in zip(
        annotated_menus_recipe_ingredients_dictionary.keys(),
        annotated_menus_recipe_ingredients_dictionary.values(),
    ):

        menu = info[2]
        dish_type = annotated_menus_recipe_ingredients_dictionary[recipe][0]
        cuisine_type = annotated_menus_recipe_ingredients_dictionary[recipe][1]
        if menu not in menus.keys():
            menus[menu] = [[dish_type, cuisine_type, recipe]]
        else:
            menus[menu].append([dish_type, cuisine_type, recipe])

    # Stores dish type, cuisine type, title, ingredient-score list for every restaurant in menus_dict.txt
    menus_dict = {}
    for idx, menu in enumerate(menus.values()):
        menu_dict = []
        for i in menu:
            if len(i[2]) > 0:
                menu_dict.append([i[0], i[1], i[2], scores_dict[i[2]]])

        menus_dict["Restaurant_" + str(idx)] = menu_dict

    with open("data/menus_dict.txt", "w") as json_file:
        json.dump(menus_dict, json_file)

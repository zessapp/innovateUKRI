import json
from tqdm import tqdm
from ast import literal_eval
import numpy as np
import random

"""
This file generates user-item ratings for 4,000 users. 

We add one more user that we hand craft their menu item preferences, to evaluate the model and showcase the user in Restaurant_recommendations.ipynb 
notebook for Q3.

This script generates the following json rating files:

raw_ratings.json: user ratings file with menu item (recipe) titles
ratings.json:     user ratings file with encoded values that represent the menu item (recipe) titles

To run the script: python ratings_preprocess.py
data prerequisites: [menus_dict.txt, encoded_mapping.txt]
"""


def select_cuisines(cuisines):
    """
    Input: cuisines (list) list of all cuisines from google sheet
    Output: liked_cuisines, disliked_cuisines: (list) list of liked and disliked cuisines, randomly generated for a user.

    """
    liked_cuisines, disliked_cuisines = [], []
    for i in cuisines:
        random_seed = random.randint(0, 10)
        if random_seed > 5:
            liked_cuisines.append(i)
        elif random_seed < 5:
            disliked_cuisines.append(i)

    return liked_cuisines, disliked_cuisines


def select_ingredients(selected_ingredients):
    """
    Input: selected_ingredients (list) list of all ingredients with tf-idf > 0.2
    Output: liked_ingredients, disliked_ingredients: (list) list of liked and disliked ingredients, randomly generated for a user.

    """
    liked_ingredients, disliked_ingredients = [], []
    for i in selected_ingredients:
        random_seed = random.randint(0, 10)

        if random_seed > 5:
            liked_ingredients.append(i)
        elif random_seed < 5:
            disliked_ingredients.append(i)

    return liked_ingredients, disliked_ingredients


if __name__ == "__main__":

    # Read the menus dictionary. Includes all generated restaurant menus, menu items, ingredients, tf-idf scores that were imported in Grakn graph.
    with open("data/menus_dict.txt") as f:
        data = json.load(f)

    cuisines, menu_items, ingredients = [], [], []
    for idx in range(0, len(data)):
        for pos in range(0, len(list(data.values())[idx])):
            cuisine = list(data.values())[idx][pos][1]
            menu_item = list(data.values())[idx][pos][2]
            cuisines.append(cuisine)
            menu_items.append(menu_item)
            ingredients.append(list(data.values())[idx][pos][3])

    ingredients = [i for sublist in ingredients for i in sublist]
    ingredients = set(ingredients)
    menu_items = set(menu_items)
    cuisines = set(cuisines)

    ingredient_score_pairs = []
    for idx in range(0, len(data)):
        for pos in range(0, len(list(data.values())[idx])):
            temp_dict = list(data.values())[idx][pos][3]
            for key, val in zip(temp_dict.keys(), temp_dict.values()):
                ingredient_score_pairs.append([key, val])

    ings, scores = [], []
    for pair in ingredient_score_pairs:
        ings.append(pair[0])
        scores.append(pair[1])

    seen_ings, indices = [], []
    for idx, ing in enumerate(ings):
        if ing not in seen_ings:
            seen_ings.append(ing)
            indices.append(idx)

    ingredients_indices, ingredient_indices = [], []
    indices = []
    seen_ings = []
    for selected_ing in tqdm(ings):
        ingredient_indices = []
        for i in range(len(ings)):
            if ings[i] == selected_ing:
                ingredient_indices.append(i)
        ingredients_indices.append((ingredient_indices))

    tf_idf_scores = []
    for indices in ingredients_indices:
        tf_idf_score = []
        for idx in indices:
            tf_idf_score.append(scores[idx])
        tf_idf_scores.append(tf_idf_score)

    tf_idf = [np.mean(sublist) for sublist in tf_idf_scores]

    s = {}
    for i, j in zip(ings, tf_idf):
        s[i] = j

    # Sort list of ingredients in descending order by tf-idf score
    sorted_s = {
        k: v for k, v in sorted(s.items(), key=lambda item: item[1], reverse=True)
    }

    # Select only ingredients with tf-idf average score higher than 0.2
    selected_ingredients = []
    for i, j in zip(sorted_s.keys(), sorted_s.values()):
        if j > 0.2:
            selected_ingredients.append(i)

    # Select the number of users to generate ratings for
    users = list(range(1000))

    user_cuisine_preferences = []
    for i in users:
        liked_cuisines, disliked_cuisines = select_cuisines(cuisines)
        user_cuisine_preferences.append(
            [
                i,
                {
                    "liked_cuisines": liked_cuisines,
                    "disliked_cuisines": disliked_cuisines,
                },
            ]
        )

    # Generate a dictionary for every user with a list of liked and a list of disliked ingredients
    user_ingredient_preferences = []
    for i in users:
        liked_ingredients, disliked_ingredients = select_ingredients(
            selected_ingredients
        )
        user_ingredient_preferences.append(
            [
                i,
                {
                    "liked_ingredients": liked_ingredients[i * 3 : i * 3 + 10],
                    "disliked_ingredients": disliked_ingredients[i * 3 : i * 3 + 10],
                },
            ]
        )

    with open("../Ripplenet/data/restaurant/encoded_mapping.txt") as f:
        mapping = json.load(f)

    # Using both cuisine and ingredient preferences, generate menu item preferences for every user.
    ratings = []
    c = 0
    for user_ingredient_data, user_cuisine_data in tqdm(
        zip(user_ingredient_preferences, user_cuisine_preferences)
    ):
        pos_rating, neg_rating, supplementary_neg_rating = [], [], []
        user_id = user_ingredient_data[0]
        liked_cuisines = list(user_cuisine_data[1].values())[0]
        disliked_cuisines = list(user_cuisine_data[1].values())[1]
        liked_ingredients = list(user_ingredient_data[1].values())[0]
        disliked_ingredients = list(user_ingredient_data[1].values())[1]
        c += 1
        random_seed = random.randint(0, len(data) - 10)
        for idx in range(random_seed, len(data)):
            random_seed = random.randint(0, round(len(list(data.values())[idx]) / 2))
            for pos in range(random_seed, len(list(data.values())[idx])):
                recipe_title = list(data.values())[idx][pos][2]
                recipe_cuisine = list(data.values())[idx][pos][1]
                recipe_ingredients = list(data.values())[idx][pos][3]
                recipe_ingredients = list(recipe_ingredients.keys())
                common_liked_ings = list(
                    set(recipe_ingredients).intersection(liked_ingredients)
                )
                common_disliked_ings = list(
                    set(recipe_ingredients).intersection(disliked_ingredients)
                )
                if recipe_title in list(mapping.keys()):
                    if recipe_cuisine in liked_cuisines or len(common_liked_ings) >= 1:
                        if len(pos_rating) < 10:
                            pos_rating.append([user_id, recipe_title, 1])
                    elif (
                        recipe_cuisine in disliked_cuisines
                        or len(common_disliked_ings) >= 1
                    ):
                        if len(neg_rating) < 10:
                            neg_rating.append([user_id, recipe_title, 0])
                    elif (
                        recipe_cuisine in disliked_cuisines
                        or len(common_disliked_ings) >= 1
                    ):
                        supplementary_neg_rating.append([user_id, recipe_title, 0])

        if len(pos_rating) > len(neg_rating):
            neg_rating += supplementary_neg_rating[
                : (len(pos_rating) - len(neg_rating))
            ]
        ratings.append(pos_rating + neg_rating)

    # Handcrafted user preferences to evaluate the model
    handcrafted_user_id = 1000
    ratings.append(
        [
            [handcrafted_user_id, "Italian Marinated Sirloin Steak", 1],
            [handcrafted_user_id, "Spinach and Mushroom Lasagna", 1],
            [handcrafted_user_id, "Profiteroles", 1],
            [handcrafted_user_id, "Spaghetti with a Twist", 1],
            [handcrafted_user_id, "Linguine with Sun-Dried Tomatoes", 1],
            [handcrafted_user_id, "Pasta Primavera", 1],
            [handcrafted_user_id, "California Caponata", 1],
            [handcrafted_user_id, "Portobello Burger", 1],
            [handcrafted_user_id, "Handcrafted Mushroom Lasagna", 1],
            [handcrafted_user_id, "Mexican Rhubarb Chocolate Chunk Brownies", 1],
            [handcrafted_user_id, "Ice Cream Eggnog", 1],
            [handcrafted_user_id, "Bacon Cheeseburgers with Spicy Mayonnaise", 1],
            [
                handcrafted_user_id,
                "Rib-Eye Steak With Herb Butter and Charred Peppers",
                1,
            ],
            [handcrafted_user_id, "Grilled Zucchini and Herb Pizza", 1],
            [handcrafted_user_id, "Red Wine Spaghetti with Meatballs", 1],
            [handcrafted_user_id, "Tofu and Peanut Stir-Fry", 0],
            [handcrafted_user_id, "Tuna Tartare", 0],
            [handcrafted_user_id, "Ahi Tuna with Napa Cabbage Salad", 0],
            [handcrafted_user_id, "Thai Fish Curry", 0],
            [handcrafted_user_id, "Green Shrimp Lo Mein", 0],
            [handcrafted_user_id, "B.B.Q. Garlic Crab", 0],
            [handcrafted_user_id, "Salmon Florentine", 0],
            [handcrafted_user_id, "Buffalo Patatas Bravas", 0],
            [handcrafted_user_id, "Grilled Peaches with Prosciutto and Balsamic", 0],
            [handcrafted_user_id, "Mussels and Clams with Spicy Tomato Broth", 0],
            [handcrafted_user_id, "Duck Confit", 0],
            [handcrafted_user_id, "Dark Chocolate-Coconut Fondue", 0],
            [handcrafted_user_id, "Grilled Tofu and Chicken Pad Thai", 0],
            [handcrafted_user_id, "Upside-Down Apple Skillet Pie", 0],
            [handcrafted_user_id, "Vegetable Tart", 0],
        ]
    )

    ratings = [i for sublist in ratings for i in sublist]

    # Store the mapping dict to encode the ratings file
    with open("raw_ratings.txt", "w") as f:
        json.dump(ratings, f)

    encoded_ratings = []
    for idx, rating in enumerate(ratings):
        if rating[1] in list(mapping.keys()):
            encoded_ratings.append([rating[0], mapping[rating[1]], rating[2]])

    # transform ratings from lists to text by line similar to ripplenet movie ratings
    with open("ratings.txt", "w") as f:
        for rating in encoded_ratings:
            f.write(str(rating)[1:-1].replace(", ", "\t") + "\n")

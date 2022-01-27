import sys
import os
from math import floor

local_path = [f"../eat-well/q3/RippleNet/", f"../eat-well/"]
sys.path.append(local_path[0] + "src/Presentation")
sys.path.append(local_path[1])
from q3.RippleNet.src.Presentation.postprocess import ripplenet_predict
import matplotlib.pyplot as plt
import numpy as np
from eat_well.generate_plots import generate_plots
import pandas as pd
from eat_well.eat_well_score_generator import (
    load_process_subgraph,
    eat_well_score_calculator,
    eat_well_scores_calculator,
)
from eat_well.energy_calc import tdee, calc_bmr
from eat_well.usecase_manager import Usecase_Manager
from postprocess import *
import postprocess
import torch
import json
from flask import Flask, render_template, request, jsonify, make_response
from flask_cors import cross_origin


ratings_filepath = local_path[0] + "data/restaurant/raw_ratings.txt"
model_filepath = local_path[0] + "data/py_model.pkl"
model = torch.load(model_filepath)
nutrition_data_list = load_process_subgraph(local_path[1] + "/kg/")

app = Flask(__name__)


def get_menu_items(
    user_allergens,
    usercase,
    user_menu_type,
    recommended_menu_items,
    nutrition_data_list,
    energy,
    energy_percent,
    meals_per_day,
):
    print(f"usercase is {usercase}, user_menu_type is {user_menu_type}")
    allergens = []
    
    allergens = [each_string.lower().replace("['", '').replace("']", '') for each_string in user_allergens]
    allergens = [x.replace("'", "") for x in allergens]
    print(allergens)
    (
        allergens_free_menu_items,
        scores,
        total_nutrition_values,
    ) = eat_well_scores_calculator(
        menu_items=recommended_menu_items,
        nutrition_data_list=nutrition_data_list,
        user_allergens=allergens,
        usercase=usercase.lower(),
        user_menu_type=user_menu_type.lower(),
        verbose=False,
        calorie_intake=energy,
        energy_percent=energy_percent,
        meals_per_day=meals_per_day,
    )

    df = pd.DataFrame(
        [scores] + [nutrition for nutrition in total_nutrition_values[1:]]
    ).T
    df.columns = [
        "score",
        "energy",
        "carbohydrate",
        "protein",
        "fat",
        "salt",
        "sodium",
        "pufa",
        "mufa",
        "omega_3",
        "omega_6",
        "fibre",
        "saturate",
        "trans_fat",
        "potassium",
        "sugar",
        "category",
        "menu_type",
    ]
    df = df.sort_values(by="score", ascending=False)
    df.reset_index(drop=True, inplace=True)
    df_copy = pd.DataFrame(
        [allergens_free_menu_items]
        + [scores]
        + [nutrition for nutrition in total_nutrition_values[1:]]
    ).T
    df_copy.columns = [
        "name",
        "score",
        "energy",
        "carbohydrate",
        "protein",
        "fat",
        "salt",
        "sodium",
        "pufa",
        "mufa",
        "omega_3",
        "omega_6",
        "fibre",
        "saturate",
        "trans_fat",
        "potassium",
        "sugar",
        "category",
        "menu_type",
    ]
    df_copy["score"] = df_copy["score"].astype(float)
    # df_copy = df_copy.drop_duplicates(inplace=True)
    ingredients = total_nutrition_values[0]
    df_copy["ingredients"] = ingredients
    df_copy = df_copy.sort_values(by="score", ascending=False)
    

    return df, df_copy, ingredients, allergens_free_menu_items, total_nutrition_values, scores


def get_recommendations(
    recommended_menu_items,
    user_allergens,
    usercase,
    user_menu_type,
    meals_per_day,
    energy_percent,
    energy,
):

    (
        df,
        df_main,
        ingredients,
        allergens_free_menu_items,
        total_nutrition_values,
        scores,
    ) = get_menu_items(
        user_allergens,
        usercase,
        user_menu_type,
        recommended_menu_items,
        nutrition_data_list,
        energy,
        energy_percent,
        meals_per_day,
    )
    df_main = df_main.drop(["category", "menu_type"], axis=1)
    df_main.reset_index(inplace=True)
    del df_main["index"]
    return df, df_main, ingredients, allergens_free_menu_items, total_nutrition_values, scores


def x_round(x):
    return floor(x * 4) / 4


def portion_df(df, index, col, portion):
    df.loc[index, col] = portion * row[col]


# energy_per_meal = energy_goal/meals_per_day


def portion_control(df_copy, total_consumed_energy, energy_goal, mealtype):
    df_cols = df_copy.columns[2:-3]
    portion_list = []
    for index, row in df_copy.iterrows():
        if mealtype == "Breakfast":
            energy_to_be_consumed = energy_goal - total_consumed_energy
            meal_energy_required = energy_to_be_consumed / 3
        elif mealtype == "Lunch":
            energy_to_be_consumed = energy_goal - total_consumed_energy
            meal_energy_required = energy_to_be_consumed / 2
        elif mealtype == "Dinner":
            meal_energy_required = energy_goal - total_consumed_energy
        kcals = row["energy"]
        portion = meal_energy_required / kcals
        portion = x_round(portion)
        portion_list.append(portion)
        # if portion > 0.25:
        #     for col in df_cols:
        #         df_copy.loc[index, col] = portion * row[col]

    return portion_list


def tdee_macro_calculator(energy):

    carbohydrates_percentage = 0.55
    protein_percentage = 0.20
    fat_percentage = 0.25
    kcal_per_g_carbs = 4
    kcal_per_g_protein = 4
    kcal_per_g_fat = 9

    # recommended macro intake quantities in grams
    recommended_carbohydrates_intake = carbohydrates_percentage * energy / 4
    recommended_protein_intake = protein_percentage * energy / 4
    recommended_fat_intake = fat_percentage * energy / 9

    return (
        recommended_carbohydrates_intake,
        recommended_protein_intake,
        recommended_fat_intake,
    )

def round_x(x):
    return round(x*4)/4

@app.route("/tdee_results", methods=["POST"], strict_slashes=False)
@cross_origin(supports_credentials=True)
def get_tdee_results():
    req = request.get_json(force=True)
    print(req)
    age = req["age"]
    height_units = req["height_units"]
    height = req["height"]
    weight_units = req["weight_units"]
    weight = req["weight"]
    sex = req["sex"]
    activity_level = req["activity_level"]

    energy = tdee(
        sex, weight, weight_units, height, height_units, age, activity_level
    )

    bmr = calc_bmr(sex, weight, weight_units, height, height_units, age)

    carbs, protein, fat = tdee_macro_calculator(energy)
    response_data = {"energy": energy, "carbs": carbs, "protein": protein, "fat": fat, "bmr": bmr}
    res = make_response(jsonify(response_data), 200)

    return res



@app.route("/recommendations", methods=["POST"], strict_slashes=False)
@cross_origin(supports_credentials=True)
def get_data():
    req = request.get_json(force=True)
    print(req)
    req["id"] = 1000
    # Energy and total_consumed_energy is calculated from the tdee function in /tdee_results.
    # Their values should be stored in context of UI and sent as input here.
    energy = req["energy"]
    #req["total_consumed_energy"] = 1000
    total_consumed_energy = req["totalConsumedEnergy"]
    print("total_consumed_energy", total_consumed_energy)
    try:
        if req["allergies"] != "No allergies":
            user_allergens = str(req["allergies"]).split(", ")
        else:
            user_allergens = []
    except:
        user_allergens = ""
    try:
        if req["diet"] != "No diet":
            usercase = str(req["diet"])
        else:
            usercase = ""
    except:
        usercase = ""
    try:

        if req["meal_type"] is not None:
            user_menu_type = req["meal_type"]
        else:
            user_menu_type = ""
    except:
        user_menu_type = ""
    print("menu type: ", user_menu_type)

    meals_per_day = 3
    energy_percent = 10
    recommendations = ripplenet_predict(
        f"{local_path[0]}data/restaurant/encoded_mapping.txt",
        f"{local_path[0]}data/model_params.pkl",
        model,
        req["id"],
    )
    recommended_menu_items = recommendations[-20:]

    df, df_copy, ingredients, menu_items, total_nutrition_values, scores = get_recommendations(
        recommended_menu_items,
        user_allergens,
        usercase,
        user_menu_type,
        meals_per_day,
        energy_percent,
        energy,
    )

    energy_goal = energy - (energy * (energy_percent / 100)) / meals_per_day

    portion_list = portion_control(
        df_copy, total_consumed_energy, energy_goal, user_menu_type
    )

    df_copy["portion_multiplier"] = portion_list
    df_copy['max_portion_multiplier'] = [round_x(x * 1.25) for x in portion_list]

    names = df_copy["name"]
    image_urls = []
    for name in names:
        url_string = (
            "https://q4-food-images.s3.eu-west-1.amazonaws.com/"
            + name.replace(" ", "+")
            + ".jpeg"
        )
        image_urls.append(url_string)

    df_copy["url"] = image_urls
    response_data = json.loads(df_copy.to_json(orient="records"))
    res = make_response(jsonify(response_data), 200)
    print(res)
    return res


# Default port:
if __name__ == "__main__":
    app.run(host="localhost", port="5000", debug=True, threaded=True)

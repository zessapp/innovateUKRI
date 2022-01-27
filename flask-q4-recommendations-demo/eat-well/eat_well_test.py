from eat_well.energy_calc import tdee
local_path = "./q3/RippleNet/"
import pickle
import json
import sys
sys.path.append(local_path + "src/Presentation")
import torch
import postprocess
from postprocess import *
from eat_well.usecase_manager import Usecase_Manager
from eat_well.eat_well_score_generator import load_process_subgraph, eat_well_score_calculator, eat_well_scores_calculator
import pandas as pd
from eat_well.generate_plots import generate_plots
import numpy as np
import matplotlib.pyplot as plt
from q3.RippleNet.src.Presentation.postprocess import ripplenet_predict
from math import *

ratings_filepath = local_path + "data/restaurant/raw_ratings.txt"
model_filepath = local_path + "data/py_model.pkl"

gender, weight, weight_units, height, height_units, age = 'male', 100, 'kg', 178, 'cm', 28
meals_per_day = 3
energy_percent = 20

energy = tdee(gender , weight, weight_units, height, height_units , age, activity_level='moderate')
print(f'You require {round(energy)} kcals to stay the same weight')

model = torch.load(model_filepath)

"""
Select user with id: 1000
"""
user_id = 1000

print("Recommended Menu Items for user with id {}: ".format(user_id))
recommendations = ripplenet_predict(f'{local_path}data/restaurant/encoded_mapping.txt',
                                    f'{local_path}data/model_params.pkl', model, user_id)
recommended_menu_items = recommendations[-20:]
recommended_menu_items

user_old_ratings = postprocess.read_ratings_json(ratings_filepath)
previous_liked_items, previous_disliked_items = postprocess.user_past_ratings(user_old_ratings, recommendations, user_id)
print("Menu Items the user has previously liked: \n")
print(previous_liked_items, '\n')
print("Menu Items the user has previously disliked: \n")
print(previous_disliked_items)
nutrition_data_list = load_process_subgraph("kg/")



def get_menu_items(user_allergens, usercase, user_menu_type, recommended_menu_items, nutrition_data_list, energy, energy_percent, meals_per_day):

    allergens_free_menu_items, scores, total_nutrition_values  = eat_well_scores_calculator(menu_items = recommended_menu_items,
                                                                                            nutrition_data_list=nutrition_data_list,
                                                                                            user_allergens=user_allergens,
                                                                                            usercase=usercase,
                                                                                            user_menu_type=user_menu_type,
                                                                                            verbose=False,
                                                                                            calorie_intake = energy,
                                                                                            energy_percent=energy_percent,
                                                                                            meals_per_day = meals_per_day
                                                                                            )
    df = pd.DataFrame([scores] + [nutrition for nutrition in total_nutrition_values[1:]]).T
    df.columns = ['Eat-Well Score', 'Energy (Kcals)', 'Carbohydrate', 'Protein',
                'Fat', 'Salt', 'Sodium', 'Pufa', 'Mufa', 'Omega 3', 'Omega 6',
                'Fibre', 'Saturate', 'Trans Fat', 'Potassium', 'sugar', 'category', 'menu_type']
    df = df.sort_values(by ='Eat-Well Score', ascending = False)
    df.reset_index(drop=True, inplace=True)
    df_copy = pd.DataFrame([allergens_free_menu_items] + [scores] + [nutrition for nutrition in total_nutrition_values[1:]]).T
    df_copy.columns = ['allergens_free_menu_items', 'Eat-Well Score', 'Energy',
                        'Carbohydrate', 'Protein', 'Fat', 'Salt', 'Sodium',
                        'Pufa', 'Mufa', 'Omega 3', 'Omega 6', 'Fibre',
                        'Saturate', 'Trans Fat', 'Potassium', 'sugar', 'category', 'menu_type']
    df_copy["Eat-Well Score"] = df_copy['Eat-Well Score'].astype(float)
    #df_copy = df_copy.drop_duplicates(inplace=True)
    df_copy = df_copy.sort_values(by='Eat-Well Score', ascending=False)

    return df, df_copy, allergens_free_menu_items, total_nutrition_values, scores



#Calculate eat-well scores for menu items
user_allergens = ['']
# usercase = "vegan"
usercase, user_menu_type = '', 'dinner'
df, df_main, allergens_free_menu_items, total_nutrition_values, scores = get_menu_items(user_allergens, usercase, user_menu_type, recommended_menu_items, nutrition_data_list, energy, energy_percent, meals_per_day)
allergens_free_menu_items

#Generate plots per nutrient
generate_plots(df_main, 'Salt', 'Sodium', 'Fibre', 'Trans Fat')

#Generate a Heat Map to examine correlation amongst different nutrients and the target variable, score.
corr = df.corr()
fig = plt.figure()
ax = fig.add_subplot(111)
cax = ax.matshow(corr,cmap='coolwarm', vmin=-1, vmax=1)
fig.colorbar(cax)
ticks = np.arange(0,len(df.columns),1)
ax.set_xticks(ticks)
plt.xticks(rotation=90)
ax.set_yticks(ticks)
ax.set_xticklabels(df.columns)
ax.set_yticklabels(df.columns)
plt.show()

df = pd.DataFrame([allergens_free_menu_items, total_nutrition_values[0], scores]).T
df.columns = ["Menu-Items", "Ingredients", "Eat-Well Score"]
allergens_free_menu_items
df_copy = pd.DataFrame([allergens_free_menu_items] + [scores] + [nutrition for nutrition in total_nutrition_values[1:]]).T
df_copy.columns = ['allergens_free_menu_items', 'Eat-Well Score', 'Energy', 'Carbohydrate', 'Protein', 'Fat', 'Salt', 'Sodium', 'Pufa', 'Mufa', 'Omega 3', 'Omega 6', 'Fibre', 'Saturate', 'Trans Fat', 'Potassium', 'Sugar', 'Category', 'Menu Type']
df_copy["Eat-Well Score"] = df_copy['Eat-Well Score'].astype(float)
#df_copy = df_copy.drop_duplicates(inplace=True)
df_copy = df_copy.sort_values(by='Eat-Well Score', ascending=False)
df_copy


ground_truth_ratings = {
    "breakfast_seafood": [],
    "breakfast_vegetarian": [],
    "breakfast_ovo_vegetarian": [],
    "breakfast_dairy_vegetarian": [],
    "breakfast_vegetarian_only": [],
    "breakfast_vegan": [],
    "breakfast_omnivorous_meat_dishes_only": [],
    "all_breakfast_dishes": [],
    "lunch_seafood": ["Grilled fish tacos with Vera Cruz Salsa", "Curried rice with smoked trout", "Tequila laced Gazpacho Cocktails with grilled shrimp"],
    "lunch_vegetarian": [],
    "lunch_ovo_vegetarian": ["Grilled steak fries with citrus-thyme aioli"],
    "lunch_dairy_vegetarian": [],
    "lunch_vegetarian_only": [],
    "lunch_vegan": ["Coconut-curry wheat berries and rice", "Roasted beet and lentil dip", "Roasted fingerling potatoes"],
    "lunch_omnivorous_meat_dishes_only": ["Greek Lamb meatball sliders with tzatziki", "Salami salad", "Adobo Buffalo wings"],
    "all_lunch_dishes": ["Grilled fish tacos with Vera Cruz salsa", "Curried rice with smoked trout", "Coconut-curry wheat berries and rice", "Greek lamb meatball sliders with tzatziki", "Tequila laced Gazpacho cocktails with grilled shrimp", "Roasted beet and lentil dip", "roasted fingerling potatoes", "grilled steak fries with citrus-thyme aioli", "salami salad", "adobo buffalo wings"],
    "dinner_seafood": ["Grilled fish tacos with Vera Cruz Salsa", "Curried rice with smoked trout", "Tequila laced Gazpacho Cocktails with grilled shrimp", "Fool-i-ya-basie Seafood stew"],
    "dinner_vegetarian": [],
    "dinner_ovo_vegetarian": ["Grilled steak fries with citrus-thyme aioli"],
    "dinner_dairy_vegetarian": [],
    "dinner_vegetarian_only": [],
    "dinner_vegan": ["Coconut-curry wheat berries and rice", "Spaghetti Aglio e Olio"],
    "dinner_omnivorous_meat_dishes_only": ["Thai lettuce wraps", "Fool-i-ya-basie Seafoodstew", "Greek Lamb meatball sliders with tzatziki", "Salami salad", "Latin burgers with caramelised onion and jalapeno relish and red pepper mayonnaise", "Adobo Buffalo wings"],
    "all_dinner_dishes": ["Grilled fish tacos with Vera cruz salsa", "thai lettuce wraps", "curried rice with smoked trout", "Fool-i-ya-basie seafood stew", "Tequila laced gazpacho cocktails with grilled shrimp", "Greek lamb meatball sliders with tzatziki", "coconut-curry wheat berries and rice", "Latin Burgers with Caramelized Onion and Jalapeno Relish and Red Pepper Mayonnaise", "grilled steak fries with citrus-thyme aioli", "spaghetti aglio e olio", "adobo buffalo wings"]

}

eat_well_ratings = {
    "breakfast_seafood": ["Coconut-Curry Wheat Berries and Rice", "Cherry Shells"],
    "breakfast_vegetarian": ["Coconut-Curry Wheat Berries and Rice", "Cherry Shells"],
    "breakfast_ovo_vegetarian": [],
    "breakfast_dairy_vegetarian": [],
    "breakfast_vegetarian_only": [],
    "breakfast_vegan": ["Coconut-Curry Wheat Berries and Rice"],
    "breakfast_seafood_only": [],
    "breakfast_omnivorous_meat_dishes_only": [],
    "all_breakfast_dishes": ["Coconut-Curry Wheat Berries and Rice", "Cherry Shells"],
    "lunch_seafood": ["Roasted Fingerling Potatoes with Fresh Herbs and Garlic", "Curried Rice With Smoked Trout", "Roasted Beet and Lentil Dip", "Coconut-Curry Wheat Berries and Rice", "Tequila Laced Gazpacho Cocktails with Grilled Shrimp", "Grilled Fish Tacos with Vera Cruz Salsa", "Spaghetti Aglio e Olio", "Grilled Steak Fries with Citrus-Thyme Aioli"],
    "lunch_vegetarian": ["Roasted Fingerling Potatoes with Fresh Herbs and Garlic"],
    "lunch_ovo_vegetarian": [],
    "lunch_dairy_vegetarian": [],
    "lunch_vegetarian_only": [],
    "lunch_vegan": ["Roasted Fingerling Potatoes with Fresh Herbs and Garlic", "Coconut-Curry Wheat Berries and Rice", "Roasted Beet and Lentil Dip", "Spaghetti Aglio e Olio"],
    "lunch_seafood_only": ["Curried Rice With Smoked Trout", "Tequila Laced Gazpacho Cocktails with Grilled Shrimp", "Grilled Fish Tacos with Vera Cruz Salsa"],
    "lunch_omnivorous_meat_dishes_only": ["Salami Salad", "Latin Burgers with Caramelized Onion and Jalapeno Relish and Red Pepper Mayonnaise", "Fool-i-ya-baise Seafood Stew", "Greek Lamb Meatball Sliders with Tzatziki", "Thai Lettuce Wraps", "Adobo Buffalo Wings"],
    "all_lunch_dishes": ["Curried Rice With Smoked Trout", "Roasted Fingerling Potatoes with Fresh Herbs and Garlic", "Roasted Beet and Lentil Dip", "Grilled Fish Tacos with Vera Cruz Salsa", "Coconut-Curry Wheat Berries and Rice", "Spaghetti Aglio e Olio", "Tequila Laced Gazpacho Cocktails with Grilled Shrimp", "Fool-i-ya-baise Seafood Stew", "Grilled Steak Fries with Citrus-Thyme Aioli", "Salami Salad", "Latin Burgers with Caramelized Onion and Jalapeno Relish and Red Pepper Mayonnaise", "Thai Lettuce Wraps", "Greek Lamb Meatball Sliders with Tzatziki", "Adobo Buffalo Wings"],
    "dinner_seafood": ["Roasted Fingerling Potatoes with Fresh Herbs and Garlic", "Curried Rice With Smoked Trout", "Roasted Beet and Lentil Dip", "Tequila Laced Gazpacho Cocktails with Grilled Shrimp", "Grilled Fish Tacos with Vera Cruz Salsa", "Spaghetti Aglio e Olio", "Grilled Steak Fries with Citrus-Thyme Aioli"],
    "dinner_vegetarian": ["Roasted Fingerling Potatoes with Fresh Herbs and Garlic", "Roasted Beet and Lentil Dip", "Spaghetti Aglio e Olio", "Grilled Steak Fries with Citrus-Thyme Aioli"],
    "dinner_ovo_vegetarian": [],
    "dinner_dairy_vegetarian": [],
    "dinner_vegetarian_only": [],
    "dinner_vegan": ["Roasted Fingerling Potatoes with Fresh Herbs and Garlic", "Coconut-Curry Wheat Berries and Rice", "Roasted Beet and Lentil Dip", "Spaghetti Aglio e Olio"],
    "dinner_seafood_only": ["Curried Rice With Smoked Trout", "Tequila Laced Gazpacho Cocktails with Grilled Shrimp", "Grilled Fish Tacos with Vera Cruz Salsa"],
    "dinner_omnivorous_meat_dishes_only": ["Salami Salad", "Latin Burgers with Caramelized Onion and Jalapeno Relish and Red Pepper Mayonnaise", "Fool-i-ya-baise Seafood Stew", "Greek Lamb Meatball Sliders with Tzatziki", "Thai Lettuce Wraps", "Adobo Buffalo Wings"],
    "all_dinner_dishes": ['Tequila Laced Gazpacho Cocktails with Grilled Shrimp',
 'Curried Rice With Smoked Trout',
 'Thai Lettuce Wraps',
 'Adobo Buffalo Wings',
 'Grilled Steak Fries with Citrus-Thyme Aioli',
 'Spaghetti Aglio e Olio',
 'Grilled Fish Tacos with Vera Cruz Salsa',
 'Roasted Beet and Lentil Dip',
 'Greek Lamb Meatball Sliders with Tzatziki',
 'Latin Burgers with Caramelized Onion and Jalapeno Relish and Red Pepper Mayonnaise',
 'Fool-i-ya-baise Seafood Stew',
 'Salami Salad',
 'Roasted Fingerling Potatoes with Fresh Herbs and Garlic']
}

import math

def rbo(list1, list2, p=0.9):
   # tail recursive helper function
    def helper(ret, i, d):
        l1 = set(list1[:i]) if i < len(list1) else set(list1)
        l2 = set(list2[:i]) if i < len(list2) else set(list2)
        a_d = len(l1.intersection(l2))/i
        term = math.pow(p, i) * a_d
        if d == i:
            return ret + term
        return helper(ret + term, i + 1, d)
    k = max(len(list1), len(list2))
    x_k = len(set(list1).intersection(set(list2)))
    summation = helper(0, 1, k)
    return ((float(x_k)/k) * math.pow(p, k)) + ((1-p)/p * summation)

rbo([i.lower() for i in ground_truth_ratings["all_dinner_dishes"]], [i.lower() for i in eat_well_ratings["all_dinner_dishes"]])

import random
import string
import typing
import os
import json
from typing import List

def random_color() -> str:
        rand = lambda: random.randint(100, 255)
        return '#%02X%02X%02X' % (rand(), rand(), rand())


def write_label_out(labels: List, dir_n: str):
    label_list = []
    out_of_range_bool = False
    for i, label in enumerate(labels[0]):
        alpha_n = lambda: random.randint(0, 25)
        ran_int = lambda: random.randint(0, 25)
        if i < 26:
            suffix = f'{string.ascii_lowercase[i]}'
        else:
            suffix = f'{string.ascii_lowercase[alpha_n()]}{string.ascii_lowercase[ran_int()]}'

        label_skeleton = {
                            "text":  label,
                            # "suffix_key": suffix,
                            "background_color": random_color(),
                            "text_color": "#ffffff"
        }
        label_list.append(label_skeleton)

    with open(f'{os.getcwd()}/data/labels/{dir_n}.json', 'w') as fout:
        json.dump(label_list , fout, indent=4)



allergen_labels = [ [
                    'celery', 'cereals containing gluten',
                    'crustaceans', 'eggs', 'fish', 'lupin',
                    'milk', 'molluscs', 'mustard', 'peanuts',
                    'sesame', 'soybeans', 'sulphur dioxide and sulphites (>10ppm)'
                    'tree nuts', "BAD DATA"
                    ] ]
write_label_out(labels = allergen_labels, dir_n='allergen_labels')

# Label for occassions
ocassion_labels = [ [   "Father's Day", "Summer dinner", "Barbecue",
                         "Healthy summer", "Picnic", "Student",
                         "Halloween", "Bonfire Night", "Diwali", "Thanksgiving",
                         "Autumn", "Hanukkah", "Boxing Day", "Christmas",
                         "New Year and Hogmanay", "Burns Night", "Veganuary",
                         "Valentine's Day", "Pancake Day", "Chinese New Year",
                         "Winter", "St David's Day", "Mother's Day",
                         "St Patrick's Day", "Passover", "Easter",
                         "baisakhi", "thai new year", "school meal",
                         "platter", "st George's Day", "iftar",
                         "eid", "kids meal", "mixed grill", "fish fry",
                         "sunday road", "ploughmans lunch", "Spring",
                         "breakfast", "midnight breakfast", "party",
                         "wedding breakfast", "second breakfast", "brunch",
                         "lunch", "box lunch", "dinner", "supper",
                         "first course", "second course", "entree",
                         "side dish", "main course", "dessert", "BAD DATA"  ] ]

ocassion_labels = [[x.lower() for x in ocassion_labels[0]]]
ocassion_labels = [[x.replace("'", '') for x in ocassion_labels[0]]]

write_label_out(labels = ocassion_labels, dir_n='ocassion_labels')

import typing
import os
import json
import jsonlines

def ocassion_fn(recipe_list_dict: dict, fn: str,  ds: str):
    #Used for NER parsing and allergen task

    # ocassion_labels = [ [   "Father's Day", "Summer dinner", "Barbecue",
    #                          "Healthy summer", "Picnic", "Student",
    #                          "Halloween", "Bonfire Night", "Diwali", "Thanksgiving",
    #                          "Autumn", "Hanukkah", "Boxing Day", "Christmas",
    #                          "New Year and Hogmanay", "Burns Night", "Veganuary",
    #                          "Valentine's Day", "Pancake Day", "Chinese New Year",
    #                          "Winter", "St David's Day", "Mother's Day",
    #                          "St Patrick's Day", "Passover", "Easter",
    #                          "baisakhi", "thai new year", "school meal",
    #                          "platter", "st George's Day", "iftar",
    #                          "eid", "kids meal", "mixed grill", "fish fry",
    #                          "sunday road", "ploughmans lunch", "Spring",
    #                          "breakfast", "midnight breakfast", "party",
    #                          "wedding breakfast", "second breakfast", "brunch",
    #                          "lunch", "box lunch", "dinner", "supper",
    #                          "first course", "second course", "entree",
    #                          "side dish", "main course", "dessert"  ] ]
    # ocassion_labels = [x.lower() for x in ocassion_labels[0]]

    # TASK OCASSIONS
    ocassion_task = []
    for recipe in recipe_list_dict:
        name = recipe['recipe']['name']
        # Add meta data
        ocassion_task.append({'name': name, 'label': [], 'meta': {'name': name, 'uuid': recipe['recipe']['uuid'], 'source': ds}} )

    with jsonlines.open(f'{os.getcwd()}/data/{ds}/output/ocassions/{ds}_foods_ocassions_{fn}.jsonl', 'w') as writer:
        writer.write_all(ocassion_task)

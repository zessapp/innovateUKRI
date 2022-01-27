import typing
import os
import json
import jsonlines

def allergens_fn(recipe_list_dict: dict, fn: str, ds: str):
    #Used for NER parsing and allergen task
    allergen_labels = [ [
                            'celery', 'cereals containing gluten',
                            'crustaceans', 'eggs', 'fish', 'lupin',
                            'milk', 'molluscs', 'mustard', 'peanuts',
                            'sesame', 'soybeans', 'sulphur dioxide and sulphites (>10ppm)'
                            'tree nuts'
                            ] ]
    # TASK ALLERGENS
    allergen_task = []
    for recipe in recipe_list_dict:
        name = recipe['recipe']['name']
        ingredient = recipe['recipe']['ingredients'].replace("'", '') + f', [name: {name}]'
        # Add meta data
        allergen_task.append({'ingredients': ingredient, 'label': allergen_labels, 'meta': {'name': name, 'uuid': recipe['recipe']['uuid']}} )

    # NEED TO COMBINE THE PAGINATED DATA
    with jsonlines.open(f'{os.getcwd()}/data/{ds}/output/allergens/{ds}_foods_allergens_{fn}.jsonl', 'w') as writer:
        writer.write_all(allergen_task)

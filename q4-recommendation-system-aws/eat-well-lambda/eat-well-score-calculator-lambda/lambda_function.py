import pandas as pd
import os
import sys
import json
import boto3
from eat_well.eat_well_score_generator import load_process_subgraph, eat_well_scores_calculator


def lambda_handler(event, context):

    s3 = boto3.resource('s3')
    bucket = s3.Bucket('eat-well-data')

    keys, localFilenames = [], []
    for bucket_object in bucket.objects.all():
        localFilenames.append(bucket_object.key)
    # Load data
    s3 = boto3.client('s3', aws_access_key_id="AKIA4UXJDAWJ6P3SUTGP",
                      aws_secret_access_key="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")

    bucket = 'eat-well-data'

    for localFilename in localFilenames[1:]:
        if "kg_subgraphs/" in localFilename:
            destination = '/tmp/' + localFilename.split('/')[1]

            s3.download_file(bucket, localFilename, destination)

    nutrition_data_list, load_process_subgraph_elapsed_time = load_process_subgraph(
        "/tmp/")

    # Recommended menu items
    recommended_menu_items = ['Roasted Fingerling Potatoes with Fresh Herbs and Garlic',
                              'Salami Salad',
                              'Coconut-Curry Wheat Berries and Rice',
                              'Raspberry Vanilla Tartlets',
                              'Fool-i-ya-baise Seafood Stew',
                              'Latin Burgers with Caramelized Onion and Jalapeno Relish and Red Pepper Mayonnaise',
                              'Honey Vanilla Fromage Blanc',
                              'Herb Coeur a La Creme',
                              'Coconut-Apricot Macaroons',
                              'Greek Lamb Meatball Sliders with Tzatziki',
                              'Roasted Beet and Lentil Dip',
                              'Grilled Fish Tacos with Vera Cruz Salsa',
                              'Spaghetti Aglio e Olio',
                              'Cherry Shells',
                              'Grilled Steak Fries with Citrus-Thyme Aioli',
                              'Adobo Buffalo Wings',
                              'Thai Lettuce Wraps',
                              'Soft Cheese Board',
                              'Curried Rice With Smoked Trout',
                              'Tequila Laced Gazpacho Cocktails with Grilled Shrimp']

    # Calculate eat-well scores for menu items
    user_allergens = ["eggs", "milk"]
    allergens_free_menu_items, scores, total_nutrition_values, eat_well_scores_calculator_elapsed_time = eat_well_scores_calculator(
        recommended_menu_items, nutrition_data_list, user_allergens, verbose=False)

    df = pd.DataFrame([allergens_free_menu_items,
                      total_nutrition_values[0], scores]).T
    df.columns = ["Menu-Items", "Ingredients", "Eat-Well Score"]

    # Eat-Well Re-ranked menu items
    df = df.sort_values(by='Eat-Well Score', ascending=False).reset_index()
    pd.set_option('max_colwidth', 400)
    items = df["Menu-Items"].tolist()

    return items, load_process_subgraph_elapsed_time, eat_well_scores_calculator_elapsed_time

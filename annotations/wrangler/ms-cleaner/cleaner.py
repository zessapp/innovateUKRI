import awswrangler as wr
import pandas as pd
from datetime import datetime as dt
import boto3
import json
import os
from airtable import Airtable

s3_full_path = 's3://bbc-goodfoods/metadata/'
fn = 'metadata-parsed.json'

parsed_df = wr.s3.read_json(path=f'{s3_full_path}{fn}')
parsed_dict = parsed_df.to_dict()
parsed_dict.keys()
ingredients = []
ingredient_dict = {}
for i in range(0, len(parsed_dict['id'])):
    recipe_id = parsed_dict['id'][i]
    recipe_dict = parsed_dict['recipeNameId'][i]
    temp_dict = {}
    for j in range(0, len(recipe_dict['predictions'])):
        try:
            name = recipe_dict['predictions'][j]['prediction']['ingredient']['name']
            ingredients.append(name)
            temp_dict[recipe_dict['predictions'][j]['sentence_id']] =  name
        except:

            try:
                name = recipe_dict['predictions'][j]['prediction']['substitutions'][0]['name']
                ingredients.append(name)
                temp_dict[recipe_dict['predictions'][j]['sentence_id']] =  name
            except:
                try:
                    name = recipe_dict['predictions'][j]['text']
                    unit = recipe_dict['predictions'][j]['prediction']['unit']
                    measure = recipe_dict['predictions'][j]['prediction']['measure']
                    name = name.replace(unit, '').replace(measure, '').replace('"', '').lstrip(' ').rstrip(' ')
                    ingredients.append(name)
                    temp_dict[recipe_dict['predictions'][j]['sentence_id']] =  name
                except:
                    pass

    ingredient_dict[recipe_id] = temp_dict

ingredient_set = set(ingredients)
# Push to S3
wr.s3.to_json(
                df=pd.DataFrame.from_dict(ingredient_dict),
                path=f'{s3_full_path}metadata_completed.json',
            )

# Push to airtable
# TODO: migrate to secrets
airtable_session = Airtable(airtable_url_or_base_key ='app2AGBJVCx6yoIrD', api_key='keyiFsLwfsSOR9s0S', table_name='Nutrient Annotation')


# Change name to UUID
for i, ingredient in enumerate(ingredient_set):
    # print(i)
    if i > 0:
        airtable_session.insert(
                                {"id": str(i),
                                "Ingredient (as per 100 g)": str(ingredient)}
                                )

# Uncomment if wishing to delete airtable data
# all_data_dict = airtable_session.get_all()
# for i in range(0, (len(all_data_dict))):
#     airtable_session.delete(all_data_dict[i]['id'])

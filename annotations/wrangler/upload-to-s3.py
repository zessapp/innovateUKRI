import awswrangler as wr
import pandas as pd
from datetime import datetime as dt
import boto3
import json
import os
from os.path import dirname

base_dir = dirname(os.getcwd())
database_names = ['full-recipes', 'recipe-metadata']
try:
    [wr.catalog.create_database(name) for name in database_names]
except:
    print('Database already exists.')

s3_full_path, s3_meta_path = 's3://bbc-goodfoods/full-recipes/', 's3://bbc-goodfoods/metadata/'

recipe_df_list = []
with open(f'{base_dir}/datasources.txt', 'r') as d:
    datasources = d.read().splitlines()
    for ds in datasources:
        print(f'Prediction for datasource {ds}')
        for file_name in [file for file in os.listdir(f'{base_dir}/data/{ds}/output/json/') if file.endswith('.json')]:
            json_data = json.load(open(f'{base_dir}/data/{ds}/output/json/{file_name}', 'r'))

            for i in json_data.keys():
                recipe_name = json_data[i]['recipe']['name']
                recipe_ingredients = json_data[i]['recipe']['ingredients']
                recipe_time = json_data[i]['recipe']['time']
                recipe_serves = json_data[i]['recipe']['serves']
                recipe_instructions = json_data[i]['recipe']['instructions']
                recipe_id = json_data[i]['recipe']['uuid']

                recipe_dict = {"name": recipe_name, "ingredients": recipe_ingredients,
                                "time": recipe_time, "instructions": recipe_instructions,
                                "serves": recipe_serves, "uuid": recipe_id}
                # For the whole df
                recipe_df = pd.DataFrame(recipe_dict, index=[0])
                recipe_df_list.append(recipe_df)


df = pd.concat(recipe_df_list)
df.reset_index(inplace=True)
del df['index']
# Upload the whole dataset as a parquet to S3
wr.s3.to_parquet(
                df=df,
                path=s3_full_path,
                dataset=True,
                database=database_names[0],
                table="recipe_collection"
            )
meta_df = df[['uuid', 'ingredients']]


index = meta_df.index
meta_df.columns = ['recipe_id', 'sentence']

meta_json = {}
for index, row in meta_df.iterrows():
    meta_temp_json = {}
    meta_temp_json['recipe_id'] = row['recipe_id']
    meta_temp_json['sentence'] = row['sentence']
    meta_json[index] = meta_temp_json

# meta_df.set_index('recipe_id', inplace=True)

# Upload as json to meta path
wr.s3.to_json(
                df=pd.DataFrame(meta_json),
                path=f'{s3_meta_path}metadata.json',
            )
# Let's also get it on AWS glue just incase
# wr.s3.to_parquet(
#                 df=pd.DataFrame(meta_json),
#                 path=f'{s3_meta_path}parquet/',
#                 dataset=True,
#                 database=database_names[1],
#                 table="recipe_metadata"
#             )

#wr.athena.read_sql_query(sql="SELECT * from recipe_metadata",database=f'{s3_meta_path}parquet/',ctas_approach=False)
# test json
# wr.s3.read_json(path=f'{s3_meta_path}metadata.json')

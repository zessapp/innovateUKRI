import boto3
import sagemaker
import os, json
import pandas as pd
from sagemaker.predictor import json_serializer, json_deserializer, Predictor
from airtable import Airtable
from config.secrets import base_airtable_raw, base_airtable_prep, api_key_airtable, aws_access_key_id, aws_secret_access_key
from config.configs import region_name, endpoint_name, table_name
# Make typed
import time
import pandas as pd
import itertools
flatten = itertools.chain.from_iterable

def fetch_processed_data(ingredient_raw_l, ingredient_prep_l, ingredient_raw_list, ingredient_prep_list):
    ingredient_raw_list.append([x for x in ingredient_raw_l if x])
    ingredient_prep_list.append([x for x in ingredient_prep_l if x])

def write_processed_data(ingredient_raw_list, ingredient_prep_list, ds, airtable_prep, airtable_raw):
    ingredient_raw_s = set(flatten(ingredient_raw_list))
    ingredient_prep_s = set(flatten(ingredient_prep_list))
    union = ingredient_raw_s & ingredient_prep_s
    ingredient_prep_s = ingredient_prep_s - union
    # merged = ingredient_raw_s | ingredient_prep_s

    with open(f'{os.getcwd()}/data/{ds}/output/ner/{ds}_raw_ner.txt', 'w') as f:
        f.write(str(ingredient_raw_s))

    with open(f'{os.getcwd()}/data/{ds}/output/ner/{ds}_prep_ner.txt', 'w') as f:
        f.write(str(ingredient_prep_s))

    for raw_i in ingredient_raw_s:

        airtable_raw.insert (
                            {

                              "name": str(raw_i),
                              "raw ingredient": str(raw_i)
                            }
        )

    for prep_i in ingredient_prep_s:

        airtable_prep.insert( {
                      "name": str(prep_i),
                      "prepared ingredient": str(prep_i)
                    }
        )

def predict_ingredients(ds, predictor, ingredient_raw_list, ingredient_prep_list):
    start_ = time.time()
    for file_name in [file for file in os.listdir(f'{os.getcwd()}/data/{ds}/input/') if file.endswith('.json')]:
        print(file_name)
        # Change to fetch all data
        with open(f'{os.getcwd()}/data/{ds}/input/{file_name}') as w:
            data = json.load(w)

        ingredient_raw_l, ingredient_prep_l = [], []
        recipe_d = {}
        # Iterate through data
        print('performing predictions')
        for key in  data.keys():
            current_recipe_d = {}
            current_raw, current_prep = [], []
            # Main data
            current_recipe_d['ingredients'] = data[key]['recipe']['ingredients'].replace("'", '').split(', ')
            recipe_name = data[key]['recipe']['name']

            macro_nutrients = data[key]['recipe']['nutrients']
            current_recipe_d['macros'] = macro_nutrients
            uuid = data[key]['recipe']['uuid']
            current_recipe_d['uuid'] = uuid
            # Perform predictions
            ingredient_list, result_list = [], []
            measure_list_l, unit_list_l = [], []
            k = data[key]['recipe']['ingredients'].split("',")
            k = [i.replace("'", '').lstrip(' ') for i in k]
            k = [i for i in k if i != '']
            k = [{'text': str(i.encode('ascii', 'ignore')).replace("b'", "'")} for i in k]
            predict_str = '{' + f'"sentences": {json.dumps(k)}' + '}'
            predict_str = predict_str.replace("'", '').replace(', {"text": " "}', '').replace('-', ' ')
            result = predictor.predict(predict_str)

            r = result.decode('utf-8')
            prediction_result = json.loads(r)
            # Upload prediction
            # UPDATED : Currently doing predictiosn one by one
            for prediction_value in prediction_result:

                ingredient_list.append(prediction_value['text'].lstrip(' '))

                predictions = prediction_value['prediction']
                measure_list, raw_list, prep_list, unit_list = [],[], [], []
                for pre in predictions:
                    for k,v in pre.items():
                        if 'UNIT' in v:
                            unit_list.append(k)
                        if 'MMT' in v:
                            measure_list.append(k)
                        if 'RAW' in v:
                            raw_list.append(k)
                        if 'PREP' in v:
                            prep_list.append(k)

                try:
                    unit = unit_list[0]
                except:
                    unit = 'Not recorded'
                try:
                    measure = measure_list[0]
                except:
                    measure = 'not recorded'
                try:
                    prep = (', ').join(prep_list).replace(',', '')
                except:
                    pass
                try:
                    raw = (', ').join(raw_list).replace(',', '')
                except:
                    pass

                if raw == '' and prep == '':
                    pass
                else:
                    ingredient_raw_l.append(raw)
                    current_raw.append(raw)

                    ingredient_prep_l.append(prep)
                    current_prep.append(prep)

                    unit_list_l.append((', ').join(unit_list).replace(',', ''))
                    measure_list_l.append((', ').join(measure_list).replace(',', ''))

            current_recipe_d['raw ingredients'] = [x for x in current_raw if x]
            current_recipe_d['prep ingredients'] =  [x for x in current_prep if x]

            measure = [x for x in measure_list_l if x]
            if len(measure) == 0:
                measure.append('Not recorded')
            unit = [x for x in unit_list_l if x]
            current_recipe_d['measures'] = dict(zip(measure, unit))
            recipe_d[recipe_name] = current_recipe_d

        fn = file_name.replace('.json', '')
        with open(f'{os.getcwd()}/data/{ds}/output/json/{fn}_predicted.json', 'w') as json_file:
            json.dump(recipe_d, json_file)

        fetch_processed_data(ingredient_raw_l, ingredient_prep_l, ingredient_raw_list, ingredient_prep_list )

    end_time = time.time() - start_
    print(f'Finished predictions on file {file_name} in {end_time} s')

start = time.time()

#Start air table session
airtable_raw = Airtable(base_airtable_raw, table_name=table_name, api_key=api_key_airtable)
airtable_prep = Airtable(base_airtable_prep, table_name=table_name, api_key=api_key_airtable)

# Start sagemaker session
runtime= boto3.client('runtime.sagemaker')
boto_session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)

sess = sagemaker.Session(boto_session=boto_session)
predictor = Predictor(endpoint_name=endpoint_name,  sagemaker_session=sess)
print('Connected to Sagemaker and airtable, starting the predictions and writing.')

ingredient_raw_list, ingredient_prep_list = [], []

with open(f'{os.getcwd()}/datasources.txt', 'r') as d:
    datasources = d.read().splitlines()
    for ds in datasources:
        print(f'Prediction for datasource {ds}')
        predict_ingredients(ds=ds, predictor=predictor, ingredient_raw_list=ingredient_raw_list,
                            ingredient_prep_list=ingredient_prep_list)
        write_processed_data(ingredient_raw_list, ingredient_prep_list, ds=ds, airtable_raw=airtable_raw, airtable_prep=airtable_prep)

end = time.time()
print('finished in :', end-start, 's')

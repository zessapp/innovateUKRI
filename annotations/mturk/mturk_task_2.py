from time import sleep
import pandas as pd
import json
import os
os.chdir(f'{os.getcwd()}/mturk/')
from fetch_gsheet import fetch_sheet
from fetch_algolia import fetch_algolia_data
import sys
sys.path.insert(0, f'{os.getcwd()}/utils/')
from mturk_utils import setup_mturk, upload_to_mturk

mturk, question_xml, mturk_environment = setup_mturk(create_hits_in_production=True, html_name='task1')

# Refactor
# Fetch raw data and transform for use in task
sheet, sheet_df = fetch_sheet('')
# sheet_df.to_csv(f'{os.getcwd()}/data/gsheets.tsv', '\t', index=False)
sheet_set = set(sheet)
sheet_list = list(filter(None, sheet_set))
print(len(sheet_list))

# Fetch the raw algolia dataset
# Load the data
algolia_df = pd.read_json(rf'{os.getcwd()}/data/top_9k_recipes.json')

algolia_df.title = algolia_df.title.str.upper()
subset_df = algolia_df[algolia_df['title'].isin(sheet_list)]

#algolia_titles = list(algolia_df.title)
#missing_values = set(sheet_list ) - set(algolia_titles)


subset_df = subset_df[['title', 'ingredients']]
subset_df.ingredients = subset_df.ingredients.apply(lambda x: ",".join(x) if isinstance(x, list) else x)
subset_df.title = subset_df.title.str.capitalize()

# Let's get a small subtask of 15 randomly sampled, but without repeats so we complete the dataset
for i in range(0, round(len(subset_df)/40)-2):
    if i == round(len(subset_df)/40):
        break
    # if i == 1:
    #     break
    random_df = subset_df.sample(n=40, replace=False)
    random_df.to_csv(f'{os.getcwd()}/data/task_2/{i}_batch_40.csv', index=False)
    len(random_df)
    # ran_list.append(list(random['title']))
    # task_attributes = {
    #     'MaxAssignments': 2,
    #     'LifetimeInSeconds': 60*60*168,         # How long the task will be available on the MTurk website (168 hours or 7 days)
    #     'AssignmentDurationInSeconds': 60*5,  # How long will Workers have to complete each item (5 minutes)
    #     'Reward': '0.02',                     # The reward you will offer Workers for each response
    #     'Title': f'Classify meals part {i+1}',
    #     'Description': 'Classify meals as good or not good',
    #     'Keywords': 'classification, meals, food, tasty'
    # }
    # hit_type_id = ''
    # results = []
    # sleep(1)
    # try:
    #     hit_type_id = upload_to_mturk(random_df, question_xml, task_attributes, mturk, results)
    #     print(mturk_environment['preview'] + f"?groupId={hit_type_id}")
    # except:
    #     print('Throttling failed, retrying in 5 seconds')
    #     sleep(5)
    #     try:
    #         hit_type_id = upload_to_mturk(random_df, question_xml, task_attributes, mturk, results)
    #         print(mturk_environment['preview'] + f"?groupId={hit_type_id}")
    #     except Exception as e:
    #         print(f'\n\nFailed because of {e}\n\n')
    #         pass
    #     pass
print('Finished uploading tasks')
print(results)


random_df.to_csv(f'{os.getcwd()}/data/15_test.csv', index=False)
# Capture last dataset
subset_df.to_csv(f'{os.getcwd()}/data/subset_mturk_task_2.tsv', sep='\t')

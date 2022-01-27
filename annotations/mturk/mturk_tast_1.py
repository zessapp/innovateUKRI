import json
import os
os.chdir(f'{os.getcwd()}/mturk/')
import sys
sys.path.insert(0, f'{os.getcwd()}/utils/')
import pandas as pd
import numpy

uniq_in_df = pd.read_csv(f'{os.getcwd()}/data/unique-ingredients.csv')
uniq_in_list=list(uniq_in_df['unique_ingredients'])

len_list = len(uniq_in_list)

# Alter accordingly
x = numpy.arange(250)
counter = 0
for i in range(0, round(len_list/250)):
    print(i)
    if i == round(len_list/250):
        break
    df = pd.DataFrame({'ingredient': uniq_in_list[counter:(counter+250)]})
    df.to_csv(f'{os.getcwd()}/data/task_1/{i}_task_1.csv', index=False)

    counter+=250

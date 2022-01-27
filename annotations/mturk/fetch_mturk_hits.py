import json
import boto3
import xmltodict
import os
from bs4 import BeautifulSoup
import unicodedata
import datetime

s3_full_path = 's3://mturk-outputs/'


create_hits_in_production = True
environments = {
  "production": {
    "endpoint": "https://mturk-requester.us-east-1.amazonaws.com",
    "preview": "https://www.mturk.com/mturk/preview"
  },
  "sandbox": {
    "endpoint":
          "https://mturk-requester-sandbox.us-east-1.amazonaws.com",
    "preview": "https://workersandbox.mturk.com/mturk/preview"
  },
}
mturk_environment = environments["production"] if create_hits_in_production else environments["sandbox"]

session = boto3.Session(profile_name='mturk')
mturk = session.client(
    service_name='mturk',
    region_name='us-east-1',
    endpoint_url=mturk_environment['endpoint'],
)
print(mturk.get_account_balance()['AvailableBalance'])

# mturk.create_worker_block(WorkerId='AV4CCDHEDRA5L', Reason='Very Biased Results and No Explanations')

hits = mturk.list_hits(MaxResults=100)

hits_id = hits['HITs']
next_token = hits['NextToken']

hit_list = []
for hit in hits_id:
    hit_list.append(hit['HITId'])

hit_dict_list = []
for i in range(0, 6000):
    try:
        hits = mturk.list_hits(MaxResults=100, NextToken=next_token)
        hit_dict_list.append(hits)
        next_token = hits['NextToken']
    except:
        break

for dict_ in hit_dict_list:
    hits_id_ = dict_['HITs']
    for hit in hits_id_:
        hit_list.append(hit['HITId'])
len(hit_list)

assignment_list = []
for i, hit in enumerate(hit_list):
    print(i)
       # Get a list of the Assignments that have been submitted
    assignmentsList = mturk.list_assignments_for_hit(
        HITId=hit,
        AssignmentStatuses=['Submitted', 'Approved'],
        MaxResults=2
    )
    for assignment in assignmentsList['Assignments']:
        assignment_mturk = mturk.get_assignment(AssignmentId=assignment['AssignmentId'])
        assignment_list.append(assignment_mturk)

print('Finished fetching hits')
# TODO : extract questions
assignment_dict = {}
for k, assignment in enumerate(assignment_list):
    print(k)
    temp_dict = {}
    if isinstance(assignment, list):
        continue
    assign = assignment['Assignment']
    temp_dict['assignment_id'] = assign['AssignmentId']
    print(assign['AssignmentId'])
    temp_dict['worker_id'] = assign['WorkerId']
    temp_dict['hit_id'] = assign['HITId']
    answer_dict = xmltodict.parse(assign['Answer'])
    answer = answer_dict['QuestionFormAnswers']['Answer']
    answer_list = []
    question_dict = xmltodict.parse(assignment['HIT']['Question'])
    question_list = []
    for a in question_dict:
        soup = BeautifulSoup(question_dict['HTMLQuestion']['HTMLContent']).get_text()
        try:
            task_type = 2
            meal = soup.split('Meal:')[1]
            ingredients = soup.split('Meal: ')[1].split('Ingredients:')[1].split('Question')[0]
            ingredients = unicodedata.normalize("NFKD", ingredients).rstrip(' ').replace('\n', '').split(',')
            meal = unicodedata.normalize("NFKD", meal).rstrip(' ').lstrip(' ').replace('\n', '')
            question_list.append({'meal': meal, 'ingredients': ingredients, 'task_type': 2})
        except:
            task_type = 1
            ingredient = soup.split('Please annotate for ingredient')[1].split('Base ingredient(s)')[0]
            ingredient = unicodedata.normalize("NFKD", ingredient).rstrip(' ').lstrip(' ').replace('\n', '').replace("'", '')
            question_list.append({'ingredients': ingredient, 'task_type': 1})
            pass

    temp_dict['question'] = question_list
    temp_dict['task_type'] = task_type
    temp_dict['iteration'] = k
    try:
        for a in answer:
            answer_list.append({a['QuestionIdentifier']: a['FreeText']})
        temp_dict['response'] = answer_list
    except:
        pass

    assignment_dict[k] = temp_dict


s3 = boto3.resource('s3')
s3object = s3.Object('mturk-outputs', f'mturk_annotations_{datetime.date.today().strftime("%b-%d-%Y")}.json')
s3object.put(
            Body=(bytes(json.dumps(assignment_dict).encode('UTF-8')))
)

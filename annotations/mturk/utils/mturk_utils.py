import boto3
import xmltodict
import os

def upload_to_mturk(random_df, question_xml, task_attributes, mturk, results):
    print(len(random_df))
    for index, row in random_df.iterrows():
        response = mturk.create_hit(
            **task_attributes,
            Question=question_xml.replace('${title}',row['title']).replace('${ingredients}',row['ingredients'])
        )
        hit_type_id = response['HIT']['HITTypeId']
        results.append({
            'hit_id': response['HIT']['HITId']
        })
    print("You can view the HITs here:")
    return hit_type_id

def setup_mturk(create_hits_in_production, html_name):
    # Let's make stuff in a sandbox for now - FYI, API only avaible for us-east-1
     # Change to True if we wanna do this in prod
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

    # Let's now connect
    session = boto3.Session(profile_name='mturk')
    mturk = session.client(
        service_name='mturk',
        region_name='us-east-1',
        endpoint_url=mturk_environment['endpoint'],
    )
    # Let's check the balance - are we rich?
    print(mturk.get_account_balance()['AvailableBalance'])
    path = f'{os.getcwd()}'
    html_layout = open(f'{path}/{html_name}.html', 'r').read()
    #Define the Mturk task
    QUESTION_XML = """<HTMLQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2011-11-11/HTMLQuestion.xsd">
            <HTMLContent><![CDATA[{}]]></HTMLContent>
            <FrameHeight>1000</FrameHeight>
            </HTMLQuestion>"""
    question_xml = QUESTION_XML.format(html_layout)
    return mturk, question_xml, mturk_environment

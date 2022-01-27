import json
import subprocess
import sys
import time
import os
import pytest
import requests
import boto3
from simpletransformers_model_server.model_handler_service import ModelHandlerService

BASE_URL = "http://0.0.0.0:8080/"
PING_URL = BASE_URL + "ping"
INVOCATION_URL = BASE_URL + "invocations"
testHandlerService = ModelHandlerService()

@pytest.fixture(scope="module", autouse=True)
def container():
    try:
        command_run = (
            "docker run --name sagecontainerr -p 8080:8080 "
            "-e SAGEMAKER_MULTI_MODEL=false "
            "sageimager serve"
        )
        command_cp = (
            "docker cp model sagecontainerr:/.sagemaker/mms/models/model/"
        )

        proc_run = subprocess.Popen(command_run.split(), stdout=sys.stdout, stderr=subprocess.STDOUT)
        time.sleep(2)
        subprocess.run(command_cp.split())
        time.sleep(15)
        attempts = 0
        while attempts < 5:
            time.sleep(3)
            try:
                requests.get(PING_URL)
                break
            except:  # noqa: E722
                attempts += 1
                pass
        yield proc_run.pid
    finally:
        subprocess.check_call("docker rm -f sagecontainerr".split())


def test_ping():
    res = requests.get(PING_URL)
    assert res.status_code == 200

def test_invocations():
    res = requests.get(INVOCATION_URL)
    assert res.status_code == 200

def test_invocations_output():


    result = os.popen('''
        curl -H "Content-Type: application/json" -X POST -d '{
        "sentences": [{
            "text": "ingredient x"
            }]
        }' 
        http://0.0.0.0:8080/invocations
        ''').read()
 
    assert isinstance(result, str)

def test_unit_qty_sep():

    string = "This is a test string"
    result = testHandlerService.unit_qty_sep(string)
    assert isinstance(result, str)

def test_word_to_num():

    inp = "This is a test string"
    result = testHandlerService.word_to_num(inp)
    assert isinstance(result, str)

def test_pred_to_preds():

    pred = [{"key": "value"}, {"key": "value"}]
    result = testHandlerService.pred_to_preds(pred)
    assert isinstance(result, list)
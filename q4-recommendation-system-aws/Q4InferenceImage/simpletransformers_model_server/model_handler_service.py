from typing import Dict, Generator, Iterator, Optional, ClassVar, Union, cast, Any, List
import json
from mms.context import Context
from errors import createError, ZessError
import logging
import pickle
import json
import sys
sys.path.append("../")
import numpy as np
import boto3
import os
import numpy as np
from sklearn.metrics import roc_auc_score
from model import RippleNet
from train import evaluation
import postprocess
from postprocess import *

# create logger
logger = logging.getLogger("simple_example")
logger.setLevel(logging.INFO)

class TestModelHandlerService:

    def __init__(self):
        pass

   
class ModelHandlerService(object):
    """
    The Model handler service implementation for the Zess ML multi model serving container.
    """

    def __init__(self):

        self.initialized: bool = False

        self.model: ClassVar[Optional[RippleNet]] = None
        self.ing_predict = None

        self.model_dir: str = ""
        self.model_name: str = ""
        self.model_filename: str = ""
        self.model_path: str = ""

        self.batch_size: int = 1

        self._context: Optional[Context] = None

    
    def load_model(self, model_path: str):
        """
        Loads the model from the model directory via the model path

        Arguments:

            model_dir - The directory where the model is stored
            model_path - The absolute path to the model

        Return:

            void

        """

        if not os.path.isfile(model_path):
            raise RuntimeError(
                "The model in the following path is missing:{}".format(model_path)
            )

        try:
            return pickle.load(open(model_path, "rb"))
        except IOError as exc:
            raise RuntimeError("Failed to open the picked model") from exc
       

    def initialize(self, context: Context):
        """
        Initialize model. This will be called during model loading time.

        Arguements:

            context - The server context from multi-model-server see (https://github.com/awslabs/multi-model-server/).

        Return:

            void

        """

        # Get the system properties from the context object
        properties = context.system_properties

        # Gets the batch size from sagemaker
        self.batch_size = cast(int, properties.get("batch_size"))

        # Get the SageMaker model directory. This is the directory sagemaker downloads the model from S3.
        self.model_dir = cast(str, properties.get("model_dir"))

        logger.info("This is the model dir {}".format(self.model_dir))

        # This gets the model_name from the multi-model-server Context variable See -> (https://github.com/awslabs/multi-model-server/blob/master/mms/context.py)
        self.model_name = cast(str, context.model_name or "model")
        self.model_path = self.model_dir + "/" + self.model_name
        logger.info("This is the model_path {}".format(self.model_path))
        self.model = cast(RippleNet, self.load_model(self.model_path))

        self.initialized = True
    

    def inference(self, user_id):
        """
        This function calls the prediction function within the model class

        Arguments:

            The data from the POST request (int)


        Return:

            The recommended menu items

        """

        s3 = boto3.resource('s3', aws_access_key_id="AKIA4UXJDAWJ6P3SUTGP",
                          aws_secret_access_key="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")
        
        bucket = 'zess-q3-recommendations'
        file_name = 'save.pkl'
        mapping_file_path = 's3://zess-q3-recommendations/model_data_input/encoded_mapping.txt'
  
        #Load the model's parameters and test data
        user_id = int(user_id[0]['body'].decode("utf-8"))
        recommendations = ripplenet_predict(self.model, user_id)
        recommended_menu_items = recommendations[-20:]

        return recommended_menu_items

    def handle(self, user_id, context: Context):
        """
        The handler exposed to the service that calls the inference function

        Arguements:

            data - The data from the POST request

        Return:

            List - The recommended menu items

        """
        
        recommendations = self.inference(user_id)

        return [recommendations]


_service = ModelHandlerService()


def handle(data, context: Context):

    if data is None:
        context.set_response_status(400)
        return None

    if not _service.initialized:
        _service.initialize(context)

    return _service.handle(data, context)

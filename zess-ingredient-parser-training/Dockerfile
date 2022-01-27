FROM python:3.6

# TODO - Update Debian (`aptitude update` ????)

RUN pip install torch

RUN pip install simpletransformers

RUN pip install s3fs

# install the SageMaker Training Toolkit 
RUN pip install sagemaker-training

COPY Bert_model/train.py /opt/ml/code/train.py

# define train.py as the script entry point
ENV SAGEMAKER_PROGRAM train.py

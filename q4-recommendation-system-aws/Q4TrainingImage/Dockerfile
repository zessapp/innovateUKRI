FROM python:3.6

RUN pip install --no-cache-dir numpy

RUN pip install --no-cache-dir sklearn

RUN pip install --no-cache-dir boto3  

RUN pip install --no-cache-dir torch  

# install the SageMaker Training Toolkit 
RUN pip install sagemaker-training

COPY RippleNet/src /opt/ml/code

ENV MODEL_PATH=/opt/ml/model

# define train.py as the script entry point
ENV SAGEMAKER_PROGRAM main.py

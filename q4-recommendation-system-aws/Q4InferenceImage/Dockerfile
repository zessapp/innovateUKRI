FROM ubuntu:20.04

# Set a docker label to advertise multi-model support on the container
LABEL com.amazonaws.sagemaker.capabilities.multi-models=true
# Set a docker label to enable container to use SAGEMAKER_BIND_TO_PORT environment variable if present
LABEL com.amazonaws.sagemaker.capabilities.accept-bind-to-port=true

# This sets commands that respect DEBIAN_FRONTEND to non-interactive mode by default 
ENV DEBIAN_FRONTEND=noninteractive 

# Set some environment variables. PYTHONUNBUFFERED keeps Python from buffering our standard
# output stream, which means that logs can be delivered to the user quickly. PYTHONDONTWRITEBYTECODE
# keeps Python from writing the .pyc files which are unnecessary in this case. We also update
# PATH so that the train and serve programs are found when the container is invoked.

ENV PYTHONUNBUFFERED=TRUE
ENV PYTHONDONTWRITEBYTECODE=TRUE

# Install necessary dependencies for MMS and SageMaker Inference Toolkit
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    software-properties-common \
    build-essential \
    ca-certificates \
    openjdk-8-jdk-headless \
    python3-dev \
    curl \
    vim \
    && rm -rf /var/lib/apt/lists/* \
    && curl -O https://bootstrap.pypa.io/get-pip.py \
    && python3 get-pip.py

RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1
RUN update-alternatives --install /usr/local/bin/pip pip /usr/local/bin/pip3 1

# Install MMS, SageMaker Inference Toolkit, Torch and SimpleTransformers to set up the dependencies for the docker image
RUN pip3 --no-cache-dir install multi-model-server \
    sagemaker-inference \
    retrying \
    torch==1.7.1 \
    boto3 \
    sklearn \
    smart-open


# Copy our entrypoint to the /usr/local/bin directory
COPY entrypoint.py /usr/local/bin/entrypoint.py
RUN chmod +x /usr/local/bin/entrypoint.py

# Copy the default custom service file to handle incoming data and inference requests

# RUN mkdir -p /home/
COPY ./simpletransformers_model_server /home/simpletransformers_model_server

RUN mkdir -p /opt/ml/model
# COPY model.tar /opt/ml/model

EXPOSE 8080 8081

# Define an entrypoint script for the docker image
ENTRYPOINT ["python", "/usr/local/bin/entrypoint.py"]

# Define command to be passed to the entrypoint
# CMD ["serve"]
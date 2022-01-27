import os

# for Windows URI = IP:port (127.0.0.1:{PORT})
HOSTNAME: str = "localhost"
PORT: int = 1729
URI: str = f"{HOSTNAME}:{PORT}"

DATABASE: str = "Q3"
CURRENT_DIR = os.getcwd()
DATA_FOLDER: str = f"{CURRENT_DIR}/DataSet/"
SCHEMA: str = "./Schema/q3.gql"
INSERT_QUERY_BATCH_SIZE = 50

# Docker Config
# DOCKER_IMAGE: str = "graknlabs/grakn:2.0.0-alpha-9"
# DOCKER_CONTAINER_NAME: str = "grakn-2.0"

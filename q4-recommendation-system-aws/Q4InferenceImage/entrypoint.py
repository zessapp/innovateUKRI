from __future__ import absolute_import

import subprocess
import sys
import shlex

from retrying import retry
from sagemaker_inference import model_server


def _retry_if_error(exception):
    """
    Tests the exception to see if it should be retired within the @retry decorator

    Args:
        exception: Any exception thrown by the function decorated by @retry

    Returns:
        bool: "True" if the exception is an instance of CalledProcessError or OSError
    """
    return isinstance(exception, subprocess.CalledProcessError or OSError)


@retry(stop_max_delay=1000 * 50, retry_on_exception=_retry_if_error)
def _start_server():
    """
    Starts the multi model server

    For more information about how to use this please see:
    https://github.com/aws/sagemaker-inference-toolkit
    https://github.com/awslabs/multi-model-server

    """
    # by default the number of workers per model is 1, but we can configure it through the
    # environment variable below if desired.
    # os.environ['SAGEMAKER_MODEL_SERVER_WORKERS'] = '2'
    model_server.start_model_server(
        handler_service="/home/simpletransformers_model_server/model_handler_service.py:handle"
    )

def main():
    """
    Starts the server if the "serve" argument is passed through when running docker run.

    If any other arguments are passed through, try to run the command via a subprocess

    """
    if sys.argv[1] == "serve":
        _start_server()
    else:
        subprocess.check_call(shlex.split(" ".join(sys.argv[1:])))

    # prevent docker exit
    subprocess.call(["tail", "-f", "/dev/null"])


main()
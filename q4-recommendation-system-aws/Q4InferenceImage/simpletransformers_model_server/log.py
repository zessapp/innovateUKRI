from sys import stderr


def log(message: str, is_error: bool = False):
    """
    All output of stdout and stderr get logged as per:
    https://github.com/awslabs/multi-model-server/blob/master/docs/logging.md

    """
    if(is_error):
        print(message, file=stderr)
    else:
        print(message)

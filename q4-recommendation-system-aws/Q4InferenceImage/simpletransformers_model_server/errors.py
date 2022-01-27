from typing import TypedDict


class ZessError():

    def __init__(self, code: str, message: str, statusCode: int = 200):
        self.statusCode = statusCode
        self.code = code
        self.message = message


def createError(statusCode: int, code: str, message: str) -> ZessError:
    """
    Creates an error in a standardised format
    """
    return ZessError(
        code,
        message,
        statusCode,
    )

# from grakn.client import GraknClient
from time import sleep
from Config.config import DATABASE, INSERT_QUERY_BATCH_SIZE, URI
from Migrators.Utilities.console import log_step
from typedb.client import *
from os.path import isfile, join
from os import listdir
import pandas as pd
from typing import List, cast
import csv
from timeit import default_timer as timer
from pandas.core.frame import DataFrame
from kglib.utils.kg_utils import *

def get_files(data_folder="./DataSet/", VERBOSE=False):

    files = [
        data_folder + f for f in listdir(data_folder) if isfile(join(data_folder, f))
    ]
    return files


# TODO - Write this crap code again with batching, rate limiting and session, transaction management

# TODO: this entire script is to be refactored into a class based approach in kg_utils which will be split into constiuent classes


# def write_to_grakn(
#     graql_query_list: List[str],
#     client: TypeDB.core_client,
#     keyspace: str,
#     batch_size: int = INSERT_QUERY_BATCH_SIZE,
#     VERBOSE=False,
# ):
#     with TypeDB.core_client(URI) as grakn_client:
#         # Not necessary to do this:
#         # grakn_client = cast(TypeDB.core_client, grakn_client)
#
#         for graql_query in graql_query_list:
#
#             with grakn_client.session(keyspace, SessionType.DATA) as session:
#                 session = cast(Session, session)
#
#                 grakn_response_list: list = []
#
#                 with session.transaction(TransactionType.WRITE) as transaction:
#                     if VERBOSE:
#                         print(graql_query)
#
#                     response = transaction.query().insert(graql_query)
#
#                     grakn_response_list.append(response)
#                     transaction.commit()
#
#                 sleep(0.01)
#
#                 return grakn_response_list



def convert_df_columns_to_lowercase(
    df: pd.DataFrame, column_names: List[str]
) -> DataFrame:
    return df.apply(
        lambda x: x.astype(str).str.lower() if x.name in column_names else x,
        result_type="expand",
    )


def parse_data_to_dictionaries(df: DataFrame, self, input, field_name: str):
    items = []
    with open(input) as data:
        for row in csv.DictReader(data, delimiter="\t", skipinitialspace=True):
            item = {key: value for key, value in row.items()}
            items.append(item)
    return items


def load_data_into_df(
    data_folder: str,
    file_name: str,
    folder_name: str,
    data_columns: List[str],
    log_message: str,
    seperator: str = "\t",
) -> DataFrame:
    log_step(log_message)

    filepath = f"{data_folder}/{folder_name}/{file_name}"

    ingredients_df = pd.read_csv(filepath, sep=seperator)

    ingredients_df.columns = data_columns

    return ingredients_df


def migrate_data_into_grakn(
    start_log_message: str,
    end_log_message: str,
    query_list: List[str],
):
    """
    Migrates a list of Graql queries into Grakn while logging the time taken in the console.
    """

    log_step(start_log_message)

    start = timer()

    KnowledgeGraph(address=URI, query = query_list,
                    db_name = DATABASE, batch_size=INSERT_QUERY_BATCH_SIZE,
                    verbose=True).writeBatchData()

    end = timer()
    print("Elapsed time: " + str(end - start) + " seconds.")

    log_step(end_log_message)


def get_df_row_value(df: DataFrame, row: int, name: str):
    return df.iloc[row][name]

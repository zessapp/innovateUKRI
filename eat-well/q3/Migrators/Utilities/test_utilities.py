# from migrator import DATA_FOLDER
from grakn.client import GraknClient
from Migrators.Utilities.utilities import (
    convert_df_columns_to_lowercase,
    load_data_into_df,
    write_to_grakn,
)
from Config.config import DATABASE, DATA_FOLDER, URI
import pytest


MOLECULES_DATASET_TEST_FILENAME = "test_molecules.tsv"
MOLECULES_DATASET_TEST_FOLDERNAME = "Test"

MOLECULES_DATASET_UPPERCASE_TEST_FILENAME = "test_molecules_uppercase.tsv"

MOLECULES_DATA_COLUMNS = ["pubchem_id", "common_name", "flavor_profile"]


@pytest.mark.integration
def test_load_data_into_df():

    molecules_df = load_data_into_df(
        data_folder=DATA_FOLDER,
        folder_name=MOLECULES_DATASET_TEST_FOLDERNAME,
        file_name=MOLECULES_DATASET_TEST_FILENAME,
        data_columns=MOLECULES_DATA_COLUMNS,
        log_message="Loading Some Test Data into Dataframe",
    )

    print(molecules_df.dtypes)

    assert not molecules_df.empty


@pytest.mark.integration
def test_convert_df_columns_to_lowercase():

    molecules_df = load_data_into_df(
        data_folder=DATA_FOLDER,
        folder_name=MOLECULES_DATASET_TEST_FOLDERNAME,
        file_name=MOLECULES_DATASET_UPPERCASE_TEST_FILENAME,
        data_columns=MOLECULES_DATA_COLUMNS,
        log_message="Converting Some Test Data To Lowercase In Dataframe",
    )

    molecules_df = convert_df_columns_to_lowercase(molecules_df, ["common_name"])

    print(molecules_df.dtypes)

    assert not molecules_df.empty


@pytest.mark.integration
def test_convert_df_columns_to_lowercase_retains_same_type():

    molecules_df = load_data_into_df(
        data_folder=DATA_FOLDER,
        folder_name=MOLECULES_DATASET_TEST_FOLDERNAME,
        file_name=MOLECULES_DATASET_UPPERCASE_TEST_FILENAME,
        data_columns=MOLECULES_DATA_COLUMNS,
        log_message="Converting Some Test Data To Lowercase In Dataframe",
    )

    molecules_df_type_before = molecules_df.dtypes.to_string()

    molecules_df = convert_df_columns_to_lowercase(molecules_df, ["common_name"])

    molecules_df_type_after = molecules_df.dtypes.to_string()

    assert molecules_df_type_before == molecules_df_type_after


@pytest.mark.integration
def test_write_once_to_grakn():

    mock_queries = [
        'insert $molecules isa molecule, has flavor-profile "\'peanut\'", has flavor-profile "\'peanut butter\'", has flavor-profile "\'almond\'", has flavor-profile "\'walnut\'", has flavor-profile "\'cocoa\'", has flavor-profile "\'leather\'", has flavor-profile "\'nutty\'", has flavor-profile "\'butter\'", has flavor-profile "\'caramel\'", has flavor-profile "\'coffee\'", has flavor-profile "\'meat\'", has flavor-profile "\'nut\'", has common-name "2,3-dimethylpyrazine", has pubchem-id "22201";',
    ]

    grakn_client = GraknClient.core(URI)

    response = write_to_grakn(
        graql_query_list=mock_queries, client=grakn_client, keyspace=DATABASE
    )

    assert len(response) == 1


@pytest.mark.integration
def test_write_multiple_to_grakn():

    mock_queries = [
        'insert $molecules isa molecule, has flavor-profile "\'peanut\'", has flavor-profile "\'peanut butter\'", has flavor-profile "\'almond\'", has flavor-profile "\'walnut\'", has flavor-profile "\'cocoa\'", has flavor-profile "\'leather\'", has flavor-profile "\'nutty\'", has flavor-profile "\'butter\'", has flavor-profile "\'caramel\'", has flavor-profile "\'coffee\'", has flavor-profile "\'meat\'", has flavor-profile "\'nut\'", has common-name "2,3-dimethylpyrazine", has pubchem-id "22201";',
        'insert $molecules isa molecule, has flavor-profile "\'peanut\'", has flavor-profile "\'peanut butter\'", has flavor-profile "\'almond\'", has flavor-profile "\'walnut\'", has flavor-profile "\'cocoa\'", has flavor-profile "\'leather\'", has flavor-profile "\'nutty\'", has flavor-profile "\'butter\'", has flavor-profile "\'caramel\'", has flavor-profile "\'coffee\'", has flavor-profile "\'meat\'", has flavor-profile "\'nut\'", has common-name "2,3-dimethylpyrazine", has pubchem-id "22201";',
    ]

    grakn_client = GraknClient.core(URI)

    response = write_to_grakn(
        graql_query_list=mock_queries, client=grakn_client, keyspace=DATABASE
    )

    assert len(response) == 2

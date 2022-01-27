from Migrators.Utilities.grakn_utilities import init_grakn_db
from Migrators.Utilities.console import log_step
from Migrators.Food.restaurant_menu_ingredient_migrator import (
    restaurant_menu_ingredient_migrator,
)


from Config.config import (
    # DOCKER_CONTAINER_NAME,
    # DOCKER_IMAGE,
    # PORT,
    URI,
)
from typedb.client import TypeDB
from Schema.schema_insert import insertSchema
from timeit import default_timer as timer
import os


# global flag toggling counter and query printouts when we want to see less detail
VERBOSE = True
os.chdir(os.getcwd().replace("acd--preprocess", "cosmos-test/zess-acd/"))


# TODO - Modify the schema, queries and entities so they all extend BaseEntity which
# has a property called concept_id which is a globaly unique UUID
def migrator(URI):
    global VERBOSE
    start = timer()
    typedb_client = None

    # Init the Grakn Client as a shared resource
    try:
        log_step(f"Setting up Grakn Client with URI: {URI}")
        typedb_client = TypeDB.core_client(URI)
    except Exception as ex:
        log_step(f"Failed to load Grakn Client with URI: {URI}")
        raise Exception(ex)

    init_grakn_db(grakn_client=typedb_client)
    insertSchema(grakn_client=typedb_client)

    restaurant_menu_ingredient_migrator(grakn_client=typedb_client)

    end = timer()
    time_in_sec = end - start
    print("Total Elapsed time: " + str(time_in_sec) + " seconds.")


if __name__ == "__main__":
    migrator(URI)

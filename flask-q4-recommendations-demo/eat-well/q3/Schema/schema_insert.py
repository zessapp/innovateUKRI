from Migrators.Utilities.console import log_step
from Config.config import DATABASE, SCHEMA, URI
from typedb.client import *


def insertSchema(grakn_client: TypeDB.core_client, VERBOSE=False):

    with open(SCHEMA, "r") as graql_file:
        schema_load = graql_file.read()

    log_step(f"Inserting schema: {SCHEMA}")

    # raise runtime error if no DB is found
    if not grakn_client.databases().contains(DATABASE):
        raise RuntimeError(f'DB "{DATABASE}" is  not found.' + 
                           f'Ensure to invoke grakn.utilities.init_grakn_db prior to the use of DB "{DATABASE}".')
    session = grakn_client.session(DATABASE, SessionType.SCHEMA)

    with session.transaction(TransactionType.WRITE) as write_transaction:
        write_transaction.query().define(schema_load)
        write_transaction.commit()

    log_step("Success inserting schema")

    session.close()

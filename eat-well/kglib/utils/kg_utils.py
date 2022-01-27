from abc import ABC, abstractmethod
from typedb.client import *
import typedb as td
from typing import *

connectionType = td.connection.session._TypeDBSessionImpl
# This needs to be abstracted itself and improved. Possibly moved too.

class Vaticle(ABC):
    """
        Abstracted implementation for vaticle inheritance interface
        Requires only the address, a query, transaction type, database
        To be extended to also write and do schema reads
    """


    def __init__(self, address: str, query, db_name: str, verbose: bool) -> None:
        self.__address = address
        self.__query = query
        self.__db_name = db_name
        self.__batch_size = batch_size
        self.__VERBOSE = verbose

    @property
    @abstractmethod
    def address(self):
        pass

    @address.setter
    @abstractmethod
    def address(self, value: str):
        pass

    @property
    @abstractmethod
    def query(self):
        pass

    @query.setter
    @abstractmethod
    def query(self, value: Union[List[str], str]):
        pass

    @property
    @abstractmethod
    def db_name(self):
        pass

    @db_name.setter
    @abstractmethod
    def db_name(self, value: str):
        pass

    @property
    @abstractmethod
    def batch_size(self):
        pass

    @batch_size.setter
    @abstractmethod
    def batch_size(self, value: int):
        pass

    @property
    @abstractmethod
    def verbose(self):
        pass

    @verbose.setter
    @abstractmethod
    def verbose(self, value: bool):
        pass


    @abstractmethod
    def connectData(self):
        pass

    @abstractmethod
    def connectSchema(self):
        pass

    @abstractmethod
    def readData(self):
        pass

    @abstractmethod
    def initiateGraknDB(self):
        pass




class KnowledgeGraph(Vaticle):

    """
    Connection sockets - could create a context management util
    Concrete child class
    """

    # Can now make this a list
    def __init__(self, address: str, query, db_name: str, batch_size: int, verbose: bool) -> None:
        self.__address = address
        self.__query = query
        self.__db_name = db_name
        self.__batch_size = batch_size
        self.__VERBOSE = verbose

    @property
    def address(self):
        return self.__address

    @address.setter
    def address(self, value: str) -> str:
        self.__address = value

    @property
    def query(self):
        return self.__query

    @query.setter
    def query(self, value: Union[List[str], str]) -> Union[List[str], str]:
        self.__query = value

    @property
    def db_name(self):
        return self.__db_name

    @db_name.setter
    def db_name(self, value: str) -> str:
        self.__db_name = value

    @property
    def batch_size(self):
        return self.__batch_size

    @batch_size.setter
    def batch_size(self, value: int) -> int:
        self.__batch_size = value

    @property
    def verbose(self):
        return self.__VERBOSE

    @verbose.setter
    def verbose(self, value: bool) -> bool:
        self.__VERBOSE = value

    def connectData(self) -> td.connection.session._TypeDBSessionImpl:
        '''
        Establish a connection to the session and return the session for data mode
        '''

        client = td.client.TypeDB.core_client(self.__address)
        print(f'connected to {self.__address}\n')
        return client.session(self.__db_name, SessionType.DATA)

    def connectSchema(self) -> td.connection.session._TypeDBSessionImpl:
        '''
        Establish a connection to the session and return the session
        '''

        client = td.client.TypeDB.core_client(self.__address)
        print(f'connected to {self.__address}\n')
        return client.session(self.__db_name, SessionType.SCHEMA)

    def initiateGraknDB(self) -> None:
        '''
        Delete the database if it already exists to rewrite.
        Name is defined by db_name
        '''
        db = td.client.TypeDB.core_client(self.__address).databases()

        if db.contains(self.__db_name): db.get(self.__db_name).delete()

        db.create(self.__db_name)

    def readData(self) -> List:
        '''
        Establishes a connection to the typedb instance and returns the concept map accordingly
        '''
        session: connectionType =  self.connectData()
        concept_map: List = []
        with session.transaction(TransactionType.READ) as read_transaction:
            answer = read_transaction.query().match(self.__query)
            for a in answer:
                concept_map.append(a)
        session.close()
        return concept_map

    def writeData(self) -> None:
        '''
        Establishes a connection to the typedb instance and writes data out
        '''
        session: connectionType =  self.connectData()
        with session.transaction(TransactionType.WRITE) as write_transaction:
            insert_iterator = write_transaction.query().insert(self.__query)
            write_transaction.commit()
        session.close()

    def writeBatchData(self) -> None:
        '''
        Writes to TypeDB in batches
        '''
        batch_count: int = 0
        vaticle_query_list_length: int = len(self.__query)
        session: connectionType =  self.connectData()
        transaction = session.transaction(TransactionType.WRITE)

        for graql_query in self.__query:
            # Increase the batch count, respectively
            batch_count += 1

            has_hit_batch_limit = batch_count % self.__batch_size == 0
            is_next_iteration_after_batch_limit = batch_count % self.__batch_size == 1

            if is_next_iteration_after_batch_limit:
                # Restablish the connection
                session: connectionType =  self.connectData()
                transaction = session.transaction(TransactionType.WRITE)

            if self.__VERBOSE: print(graql_query)

            transaction.query().insert(graql_query)

            if has_hit_batch_limit or batch_count == vaticle_query_list_length:
                transaction.commit()
                transaction.close()
                session.close()


    def writeSchema(self) -> None:
        '''
        Establishes a connection to the typedb instance and writes schema
        '''
        session: connectionType =  self.connectData()
        with session.transaction(TransactionType.WRITE) as write_transaction:
            insert_iterator = write_transaction.query().define(self.__query)
            write_transaction.commit()
        session.close()

class ProcessingInterface(ABC):

    @abstractmethod
    def __init__(self, variable: str, value_dict: dict, conceptMap: td.connection.session._TypeDBSessionImpl) -> None:
        self.__variable = variable
        self.__value_dict = value_dict
        self.__conceptMap = conceptMap

    @property
    @abstractmethod
    def variable(self):
        pass

    @variable.setter
    @abstractmethod
    def variable(self, value: str):
        pass

    @property
    @abstractmethod
    def value_dict(self):
        pass

    @value_dict.setter
    @abstractmethod
    def value_dict(self, value: str):
        pass

    @property
    @abstractmethod
    def conceptMap(self):
        pass

    @conceptMap.setter
    @abstractmethod
    def conceptMap(self, value: str):
        pass

    @abstractmethod
    def returnValues(self):
        pass


class Processing(ProcessingInterface):

    def __init__(self, variable: str, value_dict: dict, conceptMap: td.connection.session._TypeDBSessionImpl) -> None:
        self.__variable = variable
        self.__value_dict = value_dict
        self.__conceptMap = conceptMap

    @property
    def variable(self):
        return self.__variable

    @variable.setter
    def variable(self, value: str) -> str:
        self.__variable = value

    @property
    def value_dict(self):
        return self.__value_dict

    @value_dict.setter
    def value_dict(self, value: str) -> str:
        self.__value_dict = value

    @property
    def conceptMap(self):
        return self.__conceptMap

    @conceptMap.setter
    def conceptMap(self, value: str) -> str:
        self.__conceptMap = value


    def returnValues(self) -> dict:
        value_list: List = []
        for answer in self.__conceptMap:
            if 'Attribute' in str(answer.get(self.__variable)):
                value_list.append(answer.get(self.__variable).get_value())
        self.__value_dict[self.__variable] = value_list
        return self.__value_dict

class Schema(ABC):

    @abstractmethod
    def __init__(self, address: str, schema_address: str, db_name: str) -> None:
        self.__address = address
        self.__schema_address = schema_address
        self.__db_name = db_name

    @property
    @abstractmethod
    def address(self):
        pass

    @address.setter
    @abstractmethod
    def address(self, value: str):
        pass

    @property
    @abstractmethod
    def schema_address(self):
        pass

    @schema_address.setter
    @abstractmethod
    def schema_address(self, value: str):
        pass

    @property
    @abstractmethod
    def db_name(self):
        pass

    @db_name.setter
    @abstractmethod
    def db_name(self, value: str):
        pass

    @abstractmethod
    def insertSchema(self):
        pass

class schemaFunctions(Schema):

    def __init__(self, address: str, schema_address: str, db_name: str) -> None:
        self.__address = address
        self.__schema_address = schema_address
        self.__db_name = db_name

    @property
    def address(self):
        return self.__address

    @address.setter
    def address(self, value: str) -> str:
        self.__address = value

    @property
    def schema_address(self):
        return self.__schema_address

    @schema_address.setter
    def schema_address(self, value: str) -> str:
        self.__schema_address = value

    @property
    def db_name(self):
        return self.__db_name

    @db_name.setter
    def db_name(self, value: str) -> str:
        self.__db_name = value

    def insertSchema(self) -> None:

        with open(self.__schema_address, "r") as graql_file:
            schema_file = graql_file.read()

        print(f"Inserting schema: {self.__schema_address}")
        # Instaniate the session

        db = td.client.TypeDB.core_client(self.__address).databases()
        # raise runtime error if no DB is found
        if not db.contains(self.__db_name):
            raise RuntimeError(f'DB "{self.__db_name}" is  not found.' +
                               f'Ensure to invoke grakn.utilities.init_grakn_db prior to the use of DB "{self.__db_name}".')

        session: connectionType =  KnowledgeGraph(self.__address, '', self.__db_name, 0, True).connectSchema()

        with session.transaction(td.client.TransactionType.WRITE) as write_transaction:
            write_transaction.query().define(schema_file)
            write_transaction.commit()

        print("Finished inserting schema")

        session.close()

# Extend to write
# Extend to fetch results

# kg = KnowledgeGraph(address='127.0.0.1:1729', query = 'match $x isa thing; get $x; offset 0; limit 100;',
#                     db_name = 'Q3')
# kg.address
# conceptMap = kg.readData()
#
# # kg.writeData()
# # Process through multiple variables
# variable_dict = {}
# variables = Processing(variable='x', value_dict=variable_dict, conceptMap=conceptMap).returnValues()

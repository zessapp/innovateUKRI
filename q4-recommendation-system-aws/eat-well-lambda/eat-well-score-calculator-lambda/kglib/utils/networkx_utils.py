from abc import ABC, abstractmethod
from typedb.client import *
import typedb as td
from typing import *
from kglib.utils.graph.query.query_graph import QueryGraphAZ
import re

class networkx(ABC):
    """
        Abstracted implementation for networkx util inheritance interface
        Requires:
        To be extended to also write and do schema reads
    """


    @abstractmethod
    def __init__(self, query: str) -> None:
        self.__query = query

    @property
    @abstractmethod
    def query(self):
        pass

    @query.setter
    @abstractmethod
    def query(self, value: str):
        pass

    @abstractmethod
    def nodeExtraction(self):
        pass


class Extraction(networkx):

    """
    Connection sockets - could create a context management util
    Concrete child class
    """

    # Can now make this a list
    def __init__(self, query: str) -> None:
        self.__query = query


    @property
    def query(self):
        return self.__query

    @query.setter
    def query(self, value: str) -> str:
        self.__query = value

    def nodeExtraction(self) -> tuple:
        """
        Entities: menu-items, ingredients, cuisines
        Attribuites: name, tf-idf-score
        Relations: contains, typeof
        Filter tf-idf-score by > 0.15
        """
        print('Extracting nodes')
        strip_dollar = lambda x: [y.replace('$', '') for y in x]
        relation_vars, get_vars, node_vars = [], [], []
        for line in self.__query.split(';'):
            newline = line.lstrip()
            var = re.findall(r'\$\w+', newline)
            if len(var) > 0:
                if 'match' in newline:
                    node_vars.extend(var)
                elif '(' in newline and ')' in newline:
                    relation_vars.append(var[0])
                elif 'get' in newline:
                    get_vars.extend(var)
                else:
                    node_vars.extend(var)

        node_vars = list(set(node_vars).intersection(get_vars))
        node_vars, relation_vars = strip_dollar(node_vars), strip_dollar(relation_vars)
        if 'min' in node_vars and 'in' in node_vars:
            node_vars.remove('min')
            node_vars.insert(0, 'min')
            node_vars.remove('in')
            node_vars.insert(1, 'in')

        print(self.__query, node_vars, relation_vars)
        return self.__query, node_vars, relation_vars

class Graph(ABC):

    @abstractmethod
    def __init__(self, query: str, node_vars: list, relation_vars: list, node_dict: dict) -> None:
        self.__query = query
        self.__node_vars = node_vars
        self.__relation_vars = relation_vars
        self.__node_dict = node_dict

    @abstractmethod
    def buildGraph(self) -> QueryGraphAZ :
        pass

    @abstractmethod
    def buildMenuRecommendationGraph(self) -> QueryGraphAZ:
        pass

    @property
    @abstractmethod
    def query(self):
        pass

    @query.setter
    @abstractmethod
    def query(self, value: str):
        pass

    @property
    @abstractmethod
    def node_vars(self):
        pass

    @node_vars.setter
    @abstractmethod
    def node_vars(self, value: list):
        pass

    @property
    @abstractmethod
    def relation_vars(self):
        pass

    @relation_vars.setter
    @abstractmethod
    def relation_vars(self, value: list):
        pass

    @property
    @abstractmethod
    def node_dict(self):
        pass

    @node_dict.setter
    @abstractmethod
    def node_dict(self, value: dict):
        pass

class BuildGraph(Graph):

    def __init__(self, query: str, node_vars: list, relation_vars: list, node_dict: dict) -> None:
        self.__query = query
        self.__node_vars = node_vars
        self.__relation_vars = relation_vars
        self.__node_dict = node_dict

    @property
    def query(self):
        return self.__query

    @query.setter
    def query(self, value: str) -> str:
        self.__query = value

    @property
    def node_vars(self):
        return self.__node_vars

    @node_vars.setter
    def query(self, value: list) -> list:
        self.node_vars = value

    @property
    def relation_vars(self):
        return self.__relation_vars

    @relation_vars.setter
    def relation_vars(self, value: list) -> list:
        self.__relation_vars = value

    @property
    def node_dict(self):
        return self.node_dict

    @node_dict.setter
    def relation_vars(self, value: dict) -> dict:
        self.node_dict = value



    def buildGraph(self) -> QueryGraphAZ:
        import inspect

        # build QueryGraphAZ instance
        q = inspect.cleandoc(self.__query)
        graph = QueryGraphAZ().add_vars(self.__node_vars + self.__relation_vars)

        return q, graph

    def buildMenuRecommendationGraph(self) -> QueryGraphAZ :
            '''
            Specific to schemas using menu and ingredient items with contains $con relations
            This can be extended or interfaced to be extended for other usecases
            '''
            q, graph = self.buildGraph()
            # add relations & nodes to graph
            for i, relation in enumerate(self.__relation_vars):
                if "con" in relation:
                    for j in self.__node_vars:
                        try:
                            graph = graph.add_role_edge(relation, j, self.__node_dict[j])
                        except:
                            graph = graph.add_role_edge(relation, j, j)


            return (q, lambda x: x, graph)

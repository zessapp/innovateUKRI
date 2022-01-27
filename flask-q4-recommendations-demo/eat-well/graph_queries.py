from typing import List
import itertools
import inspect
from typing import List, Dict
from kglib.utils.graph.thing.queries_to_networkx_graph import build_graph_from_queries
from kglib.utils.graph.query.query_graph import QueryGraphAZ
from typedb.client import *
from tqdm import tqdm
import pickle
import azlib.queries as azq
import typedb
import networkx.algorithms.isomorphism as iso
import networkx as nx
import sys
import os
import time
from Config.eat_well_config import query_dict, node_dict, DATABASE, ADDRESS
from kglib.utils.networkx_utils import *
from kglib.utils.kg_utils import *
sys.path.insert(0, f"{os.getcwd()}/SkipGram/")

session = KnowledgeGraph(ADDRESS, '', DATABASE, 0, True).connectData()


def create_concept_graphs(
        query: str,
        query_all: bool,
        limit: int,
        name: str) -> List:

    graphs = []
    graph_query_handles = [BuildGraph(*Extraction(query)
                           .nodeExtraction(), node_dict=node_dict)
                           .buildMenuRecommendationGraph()]
    options = TypeDBOptions.core()
    # print(*graph_query_handles)
    if len(graph_query_handles) > 0:
        with session.transaction(TransactionType.READ, options) as read_transaction:
            # build a graph from the queries, samplers, and query graphs
            graph = build_graph_from_queries(
                graph_query_handles, read_transaction)
        # NOTE: not required for zess-acd-cocktail as our learning is unsupervised
        # obfuscate_labels(graph, TYPES_AND_ROLES_TO_OBFUSCATE)
        if query_all:
            graph.name = "all_data"
        else:
            graph.name = name
        graphs.append(graph)

    return graphs


def main() -> None:

    # Now we get a subgraph containing the following:
    """
    Entities: menu-items, ingredients, cuisines
    Attribuites: name, tf-idf-score
    Relations: contains, typeof
    Filter tf-idf-score by > 0.15
    """
    query_all = False

    graph_list = []
    temp_key_list = []

    node_chunks = []
    for i in range(0, len(query_dict.keys()), 3):
        node_chunks.append(list(query_dict.keys())[i:i + 3])

    # This can be further modularised

    for idx, chunk in enumerate(node_chunks):

        query = f"""match $mi isa menu-item, has name $min, has servings $serv, has menu-type $mt, has category $cat; $i isa ingredient, has name $in, has allergen $alrgn,    """

        var_nodes = []
        for v, value in enumerate(chunk):

            if v == 0:
                query_append = f'has {value} ${query_dict[value]}'

            if v > 0:
                query_append += f', has {value} ${query_dict[value]}'
            var_nodes.append(f'${query_dict[value]}')

        query += query_append + ';'
        query += f"""

                 $con (ingredient-belongs-to-menu-item: $mi, menu-item-has-ingredient: $i) isa contains; $con has weight-g $wg;

                 get $min, $in, $serv, $alrgn, $con, $wg, $mt, $cat, """
        query += ', '.join(var_nodes) + ';'

        temp_key_list = []

        graph = create_concept_graphs(
            query=query,
            query_all=query_all,
            limit=100000000,
            name=f"subset_graphs_{idx}")

        with open(f"./kg/nutrition_graph_{idx}.pkl", "wb") as f:
            pickle.dump(graph, f)
        print(
            f"# of sample subgraphs extracted for nutrition_graph_{idx} {len(graph)}\n")

    query_final = """
            match $i isa ingredient, has name $in; get $i, $in;
            """

    conceptMap = KnowledgeGraph(
        ADDRESS, query_final, DATABASE, 0, True).readData()
    variable_dict = {}
    variables = Processing(
        variable='in', value_dict=variable_dict, conceptMap=conceptMap).returnValues()

    with open(f'./kg/ingredient_list.pkl', 'wb') as f:
        pickle.dump(list(variables['in']), f)

    print(f"Finished")


if __name__ == "__main__":
    main()

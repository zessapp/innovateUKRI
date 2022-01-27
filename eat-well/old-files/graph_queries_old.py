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
import time
import os
import time
sys.path.insert(0, f"{os.getcwd()}/SkipGram/")

DATABASE = "Q4"
ADDRESS = "localhost:1729"

client = TypeDB.core_client(ADDRESS)
session = client.session(DATABASE, SessionType.DATA)


def create_concept_graphs(
    typedb_session: typedb.connection.session,
    query_params: list,
    query_all: bool,
    limit: int,
    name: str,
) -> List:
    graphs = []
    query, node_vars, relation_vars = create_queries(
        query_params, query_all=query_all, limit=limit)
    print(query, node_vars, relation_vars)

    graph_query_handles = get_query_handles(
        query=query, node_vars=node_vars, relation_vars=relation_vars, verbose=False
    )
    typedb_session = session
    options = TypeDBOptions.core()
    if len(graph_query_handles) > 0:
        with typedb_session.transaction(TransactionType.READ, options) as tx:
            # build a graph from the queries, samplers, and query graphs
            graph = build_graph_from_queries(graph_query_handles, tx)

        # NOTE: not required for zess-acd-cocktail a our learning is unsupervised
        # obfuscate_labels(graph, TYPES_AND_ROLES_TO_OBFUSCATE)
        if query_all == True:
            graph.name = "all_data"
        else:
            graph.name = name
        graphs.append(graph)

    return graphs


def create_queries(query_params: list, query_all: bool, limit: int) -> tuple:

    # Now we get a subgraph containing the following:
    """
    Entities: menu-items, ingredients, cuisines
    Attribuites: name, tf-idf-score
    Relations: contains, typeof
    Filter tf-idf-score by > 0.15
    """

    if len(query_params) == 3:
        query = """match $mi isa menu-item, has name $min;
                        $i isa ingredient, has name $in, has {} ${}, has {} ${}, has {} ${};

                        $con (ingredient-belongs-to-menu-item: $mi, menu-item-has-ingredient: $i) isa contains;

                    get $min, $in, $con, ${}, ${}, ${};

                """.format(query_params[0][0], query_params[0][1], query_params[1][0], query_params[1][1], query_params[2][0], query_params[2][1], query_params[0][1], query_params[1][1], query_params[2][1])

        node_vars = ["min", "in", query_params[0][1],
                     query_params[1][1], query_params[2][1]]
    else:
        query = """match $mi isa menu-item, has name $min;
        	          $i isa ingredient, has name $in, has {} ${};

                      $con (ingredient-belongs-to-menu-item: $mi, menu-item-has-ingredient: $i) isa contains;

      		    get $min, $in, $con, ${};

            """.format(query_params[0][0], query_params[0][1], query_params[0][1])

        node_vars = ["min", "in", query_params[0][1]]
    relation_vars = ["con"]
    return query, node_vars, relation_vars


def build_graph(query: str, node_vars: list, relation_vars: list) -> QueryGraphAZ:

    # build QueryGraphAZ instance
    q = inspect.cleandoc(query)
    graph = QueryGraphAZ().add_vars(node_vars + relation_vars)

    # add relations & nodes to graph
    for i, relation in enumerate(relation_vars):

        if "con" in relation:
            for j in node_vars:
                print(j)
                if j == "min":
                    graph = graph.add_role_edge(
                        relation, j, "menu-item-has-ingredient"
                    )
                elif j == "in":
                    graph = graph.add_role_edge(
                        relation, j, "ingredient-belongs-to-menu-item"
                    )
                else:
                    graph = graph.add_role_edge(
                        relation, j, "{}".format(j)
                    )

    return (q, lambda x: x, graph)


def get_query_handles(
    query: str, node_vars: List, relation_vars: List, verbose: bool = False
) -> List[tuple]:
    print('...!!', node_vars, relation_vars)
    return [build_graph(query, node_vars, relation_vars)]


def main() -> None:

    # Now we get a subgraph containing the following:
    """
    Entities: menu-items, ingredients, cuisines
    Attribuites: name, tf-idf-score
    Relations: contains, typeof
    Filter tf-idf-score by > 0.15
    """
    query_all = False
    total_query_params = [[["kcals-per-100-g", "energy"],
                          ["protein-per-100-g", "protein"], ["sugar-per-100-g", "sugar"]], [["saturates-per-100-g", "saturates"], ["pufa-per-100-g", "pufa"], ["mufa-per-100-g", "mufa"]],
                          [["omega-3-per-100-g", "omega_3"], ["omega-6-per-100-g",
                                                              "omega_6"], ["trans-per-100-g", "trans"]],
                          [["salt-per-100-g", "salt"], ["alcohol-per-100-g",
                                                        "alcohol"], ["sodium-per-100-g", "sodium"]],
                          [["potassium-per-100-g", "potassium"], ["carbs-per-100-g", "carbohydrate"], ["fat-per-100-g", "fat"]], [["fibre-per-100-g", "fibre"]]]
    name = "subset_graphs"
    for idx, query_params in enumerate(total_query_params):
        print(idx)
        graphs = create_concept_graphs(
            session, query_params, query_all=query_all, limit=100000000, name=name
        )

        with open(
            "./data/nutrition_graph_{}.pkl".format(
                idx
            ),
            "wb",
        ) as f:
            pickle.dump(graphs, f)
        print(f"# of sample subgraphs extracted for {len(graphs)}")


if __name__ == "__main__":
    main()

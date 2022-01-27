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
sys.path.insert(0, f"{os.getcwd()}/SkipGram/")

DATABASE = "Q3"
ADDRESS = "localhost:1729"

client = TypeDB.core_client(ADDRESS)
session = client.session(DATABASE, SessionType.DATA)


def create_concept_graphs(
    typedb_session: typedb.connection.session,
    query_all: bool,
    limit: int,
    name: str,
) -> List:
    graphs = []
    query, node_vars, relation_vars = create_queries(
        query_all=query_all, limit=limit)

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


def create_queries(query_all: bool, limit: int) -> tuple:

    # Now we get a subgraph containing the following:
    """
    Entities: menu-items, ingredients, cuisines
    Attribuites: name, tf-idf-score
    Relations: contains, typeof
    Filter tf-idf-score by > 0.15
    """
    query = f"""match $mi isa menu-item, has name $min;
        	       $i isa ingredient, has name $in, has allergen $a;
                   $c isa cuisine, has name $cn;
                   $to (belongs-to-cuisine: $c, cuisine-contains: $mi) isa typeof;
                   $con (ingredient-belongs-to-menu-item: $mi, menu-item-has-ingredient: $i) isa contains, has tf-idf-score $tf;
                   $tf > 0.2;
                   get $a, $min, $in, $cn, $to, $con;
            """
    node_vars = ["a", "min", "in", "cn"]
    relation_vars = ["to", "con"]
    return query, node_vars, relation_vars


def build_graph(query: str, node_vars: list, relation_vars: list) -> QueryGraphAZ:

    # build QueryGraphAZ instance
    q = inspect.cleandoc(query)
    graph = QueryGraphAZ().add_vars(node_vars + relation_vars)

    # add relations & nodes to graph
    for i, relation in enumerate(relation_vars):
        # ingredient-ingredient relation
        if "to" in relation:

            graph = graph.add_role_edge(
                relation, node_vars[i + 2], "belongs-to-cuisine"
            )
            graph = graph.add_role_edge(
                relation, node_vars[i], "cuisine-contains")

        # ingredient-flavor_compound relation
        elif "con" in relation:

            graph = graph.add_role_edge(
                relation, node_vars[i], "menu-item-has-ingredient"
            )
            graph = graph.add_role_edge(
                relation, node_vars[i - 1], "ingredient-belongs-to-menu-item"
            )

    return (q, lambda x: x, graph)


def get_query_handles(
    query: str, node_vars: List, relation_vars: List, verbose: bool = False
) -> List[tuple]:
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
    name = "subset_graphs"
    graphs = create_concept_graphs(
        session, query_all=query_all, limit=10000000000, name=name
    )

    with open(
        "/Users/kostaspsychogyio/Desktop/zess-q3-recommendations/DataSet/graphs_{}.pkl".format(
            name
        ),
        "wb",
    ) as f:
        pickle.dump(graphs, f)
    print(f"# of sample subgraphs extracted for {len(graphs)}")


if __name__ == "__main__":
    main()

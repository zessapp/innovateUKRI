import inspect
import itertools
from typing import List
from kglib.utils.graph.query.query_graph import QueryGraphAZ


def build_graph(query: str, node_vars: list, relation_vars: list) -> QueryGraphAZ:

    # build QueryGraphAZ instance
    q = inspect.cleandoc(query)
    graph = QueryGraphAZ().add_vars(node_vars + relation_vars)

    # add relations & nodes to graph
    for i, relation in enumerate(relation_vars):
        # ingredient-ingredient relation
        if "uw" in relation:
            graph = graph.add_role_edge(relation, node_vars[i], "menu-has-ingredient")
            graph = graph.add_role_edge(
                relation, node_vars[i + 1], "ingredient-used-with"
            )

        # ingredient-flavor_compound relation
        elif "bt" in relation:
            if "c" in node_vars[i]:
                node_ingredient = node_vars[i]
                node_flavor_cmp = node_vars[i + 1]
            else:
                node_ingredient = node_vars[i + 1]
                node_flavor_cmp = node_vars[i]

            graph = graph.add_role_edge(
                relation, node_ingredient, "flavor-compound-ingredient"
            )
            graph = graph.add_role_edge(
                relation, node_flavor_cmp, "flavor-compound-ingredient"
            )

    return (q, lambda x: x, graph)


# SAMPLE QUERIES

# Symbol Dictionary:
# F: flavor-compound
# C: compound-ingredient
# N: non-compound-ingredient

# F - C - N - C' - F'
METAPATH_FCNCF = """
match
    # entities
    $n isa non-compound-ingredient, has name $n_name;
    $f1 isa flavor-compound, has name $f1_name;
    $f2 isa flavor-compound, has name $f2_name;
    $c1 isa compound-ingredient, has name $c1_name;
    $c2 isa compound-ingredient, has name $c2_name;
	$f1_name = '{name}';

    # conditions
    not {$f1 is $f2;};
    not {$c1 is $c2;};

    # relations
    $bt1 (flavor-compound-ingredient: $f1, flavor-compound-ingredient: $c1) isa bound-to;
    $uw1 (ingredient-used-with: $c1, ingredient-used-with: $n) isa used-with;
    $uw2 (ingredient-used-with: $n, ingredient-used-with: $c2) isa used-with;
    $bt2 (flavor-compound-ingredient: $c2, flavor-compound-ingredient: $f2) isa bound-to;
get
    $n, $f1, $f2, $c1, $c2, $bt1, $uw1, $uw2, $bt2;
    offset {pagination_number}; limit 1;
"""

# N - C - F - C' - N'
METAPATH_NCFCN = """
match
    # entities
    $f isa flavor-compound;
    $c1 isa compound-ingredient, has name $c1_name;
    $c2 isa compound-ingredient, has name $c2_name;
    $n1 isa non-compound-ingredient, has name $n1_name;
    $n2 isa non-compound-ingredient, has name $n2_name;
    $n1_name='{name}';

    # conditions
    not {$n1 is $n2;};
    not {$c1 is $c2;};

    # relations
    $uw1 (ingredient-used-with: $n1, ingredient-used-with: $c1) isa used-with;
    $bt1 (flavor-compound-ingredient: $c1, flavor-compound-ingredient: $f) isa bound-to;
    $bt2 (flavor-compound-ingredient: $f, flavor-compound-ingredient: $c2) isa bound-to;
    $uw2 (ingredient-used-with: $c2, ingredient-used-with: $n2) isa used-with;
get
    $f, $c1, $c2, $n1, $n2, $uw1, $bt1, $bt2, $uw2;
    offset {pagination_number}; limit 1;
"""

# N - N' - C - F - C' - N'' - N'''
METAPATH_NNCFCNN = """
match
    # entities
    $f isa flavor-compound;
    $c1 isa compound-ingredient, has name $c1_name;
    $c2 isa compound-ingredient, has name $c2_name;
    $n1 isa non-compound-ingredient, has name $n1_name;
    $n2 isa non-compound-ingredient, has name $n2_name;
    $n3 isa non-compound-ingredient, has name $c3_name;
    $n4 isa non-compound-ingredient, has name $c4_name;
    $n1_name='{name}';

    # conditions
    not {$n1 is $n2;};
    not {$n1 is $n3;};
    not {$n1 is $n4;};
    not {$n2 is $n3;};
    not {$n2 is $n4;};
    not {$n3 is $n4;};
    not {$c1 is $c2;};

    # relations
    $uw1 (ingredient-used-with: $n1, ingredient-used-with: $n2) isa used-with;
    $uw2 (ingredient-used-with: $n2, ingredient-used-with: $c1) isa used-with;
    $bt1 (flavor-compound-ingredient: $c1, flavor-compound-ingredient: $f) isa bound-to;
    $bt2 (flavor-compound-ingredient: $f, flavor-compound-ingredient: $c2) isa bound-to;
    $uw3 (ingredient-used-with: $c2, ingredient-used-with: $n3) isa used-with;
    $uw4 (ingredient-used-with: $n3, ingredient-used-with: $n4) isa used-with;
get
    $f, $c1, $c2, $n1, $n2, $n3, $n4, $uw1, $uw2, $bt1, $bt2, $uw3, $uw4;
    offset {pagination_number}; limit 1;
"""

MAPPINGS = """
match
    $x isa non-compound-ingredient, has name $x_name;
    $x_name = "{}";
get
    $x, $x_name;
offset 0; limit 1;
"""

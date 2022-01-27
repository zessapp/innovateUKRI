from typing import Dict, List, TypedDict
from Config.config import DATABASE
from typedb.client import *
from Config.config import URI
from kglib.utils.kg_utils import *



class RelationshipEntityMapping(TypedDict):
    relationship_name: str
    grakn_entity_variable_token: str


def insert_attribute_query_statement(
    attribute_name: str, attribute_val: str, last_statement: bool = False
):
    trailing_comma = ";" if last_statement else ""

    return f', has {attribute_name} "{attribute_val}"{trailing_comma}'


def entity_and_relation_query_fragment(
    relationship_entity_list: List[RelationshipEntityMapping],
):

    entity_relationship_string: str = ""

    relationship_entity_items = relationship_entity_list
    relationship_entity_items_length = len(relationship_entity_items)

    for index, item in enumerate(relationship_entity_items):
        if index + 1 == relationship_entity_items_length:

            entity_relationship_string += (
                f" {item['relationship_name']}: {item['grakn_entity_variable_token']}"
            )

            break

        entity_relationship_string += (
            f" {item['relationship_name']}: {item['grakn_entity_variable_token']},"
        )

    return entity_relationship_string


def insert_relationship_query_statement(
    relationship_entity_list: List[RelationshipEntityMapping],
    relationship_variable_token: str,
    relationship_type: str,
    last_statement: bool = False,
):
    trailing_comma = ";" if last_statement else ""

    return f" insert {relationship_variable_token} ({entity_and_relation_query_fragment(relationship_entity_list)}) isa {relationship_type}{trailing_comma}"

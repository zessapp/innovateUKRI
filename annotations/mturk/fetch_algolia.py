import pandas as pd
from algoliasearch.search_client import SearchClient
import json

def fetch_algolia_data():
    client = SearchClient.create('1X9LAADTF2', 'b68b7f70c9f9bf8a0ca03d5d6c04ffbe')
    index_ = client.init_index('dev_zess')
    hits = {}
    res = index_.browse_objects()

    for i, hit in enumerate(res):
        hits[i] = hit


    df_list = []
    for i in range(0, len(hits)):
        temp_df = pd.json_normalize(hits[i])
        df_list.append(temp_df)

    algolia_df = pd.concat(df_list)
    return algolia_df

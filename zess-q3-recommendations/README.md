# Q3 Zess Recommendations

## Pre-requisites

1. Anaconda or Miniconda
2. Python 3.8 (For pip)

## Environment Setup

1. Create a new conda environment using `conda create --name orbit python=3.8`
2. Activate the new environment `conda activate orbit`
3. Install conda dependencies `conda install --file conda-requirements.txt`
4. Install pip dependencies `pip install -r pip-requirements.txt`

## TypeDB Installation

1.  To Install TypeDB Server 2.1.3:
    - **Docker**: docker pull vaticle/typedb:2.1.3
    - **Mac OS X**: brew install vaticle/tap/typedb==2.1.3
    - Refer to Vaticle's installation doc for other OS: https://docs.vaticle.com/docs/running-typedb/install-and-run/
2.  To Install latest (2.1.1) TypeDB Client:
    - pip install typedb-client==2.1.1

## Script to run in order:

- Generate menus_dict.txt file (contains data that are migrated to Grakn): `python generate_menu_data.py`
- Run the migrator: `python migrator.py`
- Extract subgraph for Ripplenet: `python graph_queries.py` located at src/
- Generate KG Triplets (head, relation, tail): `python kg_triplets_generation.py`
- Generate user ratings file: `python ratings_preprocess.py`
- Train Ripplenet: `python main.py --dataset restaurant`
- Generate recommendations infering trined Ripplenet model: `Presentation/Restaurant_Recommendations.ipynb`

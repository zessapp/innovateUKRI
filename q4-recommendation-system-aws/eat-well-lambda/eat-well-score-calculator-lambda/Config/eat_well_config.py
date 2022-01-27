
query_dict = {"kcals-per-100-g": "energy",
                "protein-per-100-g": "protein",
                "sugar-per-100-g": "sugar",
                "saturates-per-100-g": "saturates",
                "pufa-per-100-g": "pufa",
                "mufa-per-100-g": "mufa",
                "omega-3-per-100-g": "omega_3",
                "omega-6-per-100-g": "omega_6",
                "trans-per-100-g": "trans",
                "salt-per-100-g": "salt",
                # "alcohol-per-100-g":"alcohol",
                "sodium-per-100-g": "sodium",
                "potassium-per-100-g": "potassium",
                "carbs-per-100-g": "carbohydrate",
                "fat-per-100-g": "fat",
                "fibre-per-100-g": "fibre"}

node_dict = {'con': 'contains',
             'min': 'menu-item-has-ingredient',
             'in': 'ingredient-belongs-to-menu-item',
             }

DATABASE = "Q4"
ADDRESS = "localhost:1729"

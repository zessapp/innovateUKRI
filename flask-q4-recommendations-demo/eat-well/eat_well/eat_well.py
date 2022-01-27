# %% codecell
import pandas as pd
import math
from sklearn import preprocessing
# %% codecell
"""
Load annotations

"""

df = pd.read_csv("ingredient_annotations.csv")
# %% codecell
"""
Identify annotated ingredients

"""

indexes = []
for row in df.iterrows():
    if row[1]['Not food/drink'] != 'checked' and not math.isnan(row[1]['Energy (Kcal)']):
        indexes.append(row[0])



# %% codecell
annotated_df = df.iloc[indexes].reset_index(drop=True)
# %% codecell
def carbs_protein_fat_ratio(energy, carbohydrate, protein, fat) -> float:

    #carbs: 45-65%, protein: 10-35%, fat: 20-35%
    carbs_energy_lower_bound = 0.45 * energy
    carbs_energy_upper_bound = 0.65 * energy

    protein_energy_lower_bound = 0.1 * energy
    protein_energy_upper_bound = 0.35 * energy

    fat_energy_lower_bound = 0.2 * energy
    fat_energy_upper_bound = 0.35 * energy

    #4kcal per g carbs
    carbs_weight_lower_bound = carbs_energy_lower_bound / 4
    carbs_weight_upper_bound = carbs_energy_upper_bound / 4

    #4 kcal per g protein
    protein_weight_lower_bound = protein_energy_lower_bound / 4
    protein_weight_upper_bound = protein_energy_upper_bound / 4

    #9kcal per g fats
    fat_weight_lower_bound = fat_energy_lower_bound / 9
    fat_weight_upper_bound = fat_energy_upper_bound / 9
#     print(carbs_weight_lower_bound, carbs_weight_upper_bound)
    if carbohydrate >= carbs_weight_lower_bound and carbohydrate <= carbs_weight_upper_bound:
        carbs_score = 1
    elif carbohydrate < carbs_weight_lower_bound:
        carbs_score = 1 - (abs(carbohydrate - carbs_weight_lower_bound)) / carbs_weight_lower_bound
    elif carbohydrate > carbs_weight_upper_bound:
        carbs_score = 1 - (carbohydrate - carbs_weight_lower_bound) / carbs_weight_lower_bound
    else:
        carbs_score = 0
        print(carbs_score)

    if protein >= protein_weight_lower_bound and protein <= protein_weight_upper_bound:
        protein_score = 1

    elif protein < protein_weight_lower_bound:
        protein_score = 1 - (abs(protein - protein_weight_lower_bound)) / protein_weight_lower_bound
    elif protein > protein_weight_upper_bound:
        protein_score = 1 - (protein - protein_weight_lower_bound) / protein_weight_lower_bound

    if fat >= fat_weight_lower_bound and fat <= fat_weight_upper_bound:
        fat_score = 1

    elif fat < fat_weight_lower_bound:
        fat_score = 1 - (abs(fat - fat_weight_lower_bound)) / fat_weight_lower_bound

    elif fat > fat_weight_upper_bound:
        fat_score = 1 - (fat - fat_weight_lower_bound) / fat_weight_lower_bound
    #
    print(carbs_score, protein_score, fat_score)
    score = 0.5 * carbs_score + 0.2 * protein_score + 0.3 * fat_score
    print('final: ', score)
    return score
# %% codecell
carbs_protein_fat_ratio(385, 48.7, 27, 15)
# %% codecell



# %% codecell

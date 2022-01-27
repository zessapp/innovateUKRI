import os
os.getcwd()
from eat_well_features import EatWellFeatures

meals_per_day = EatWellFeatures().calorie_deficit_params['meals_per_day']
energy_goal = EatWellFeatures().calorie_deficit_params['user_energy_daily_goal']

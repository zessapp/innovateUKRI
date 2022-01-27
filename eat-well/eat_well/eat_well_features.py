import pandas as pd
import math
import numpy as np
from eat_well.usecase_manager import Usecase_Manager


class EatWellFeatures():

    def __init__(self) -> None:
        """
        Load annotations and Identify annotated ingredients

        """
        import time
        import os
        home = os.path.expanduser('~/')
        start_time = time.time()
        self.df = pd.read_csv(f"{home}/eat-well/eat_well/data/ingredient_annotations.csv")

        indexes = []
        for row in self.df.iterrows():
            if row[1]['Not food/drink'] != 'checked' and not math.isnan(row[1]['Energy (Kcal)']):
                indexes.append(row[0])
        self.annotated_df = self.df.iloc[indexes].reset_index(drop=True)

        self.carbs_protein_fat_ratio_params = {"carbohydrates_lower_bound": 0.45,
                                               "carbohydrates_upper_bound": 0.65,
                                               "protein_lower_bound": 0.1,
                                               "protein_upper_bound": 0.35,
                                               "fat_lower_bound": 0.2,
                                               "fat_upper_bound": 0.35,
                                               "kcal_per_g_carbs": 4,
                                               "kcal_per_g_protein": 4,
                                               "kcal_per_g_fat": 9,
                                               "carbs_score_weight": 0.5,
                                               "protein_score_weight": 0.2,
                                               "fat_score_weight": 0.3
                                               }
        # Maximum intakes
        self.sodium_intake_params = {
            "daily_salt_intake": 6,  # grams
            "daily_sodium_intake": 2.4,  # grams
            "meals_per_day": 3
        }
        # Ideal intakes
        self.potassium_intake_params = {
            "daily_potassium_intake": 3,
            "meals_per_day": 3
        }

        self.sodium_potassium_intake_params = {
            "ratio": np.round(float(1/3), 3)
        }

        self.meals_per_day_params = {
            "meals_per_day": 3
        }
        # TODO
        # Needs gender options


        self.calorie_deficit_params = {
            "user_energy_daily_intake": 2500,
            "user_energy_daily_goal": 2200,
            "meals_per_day": 3,

        }

        self.fruit_vegetable_intake_params = {
            "fruit_veg_per_day": 5,
            "meals_per_day": 3
        }

        self.red_processed_meat_intake_params = {
            "red_processed_meat_per_day": 90,
            "meals_per_day": 3
        }

        self.pufa_intake_params = {
            "pufa_fats_ratio": 0.5
        }

        self.mufa_intake_params = {
            "mufa_fats_ratio": 0.25
        }

        self.saturated_intake_params = {
            "saturatedfats_fats_ratio_lower_bound": 0.03,
            "saturatedfats_fats_ratio_upper_bound": 0.05
        }

        self.trans_fats_intake_params = {
            "transfats_fats_ratio": 0
        }

        self.omega_ratio_params = {
            "omega_3_to_omega_6_ratio": 2
        }

        self.fibre_intake_params = {
            "daily_fibre_intake": 30,  # grams
            "meals_per_day": 3
        }

        self.polyphenol_intake_params = {
            "daily_polyphenol_intake": 1000,  # in mg
            "meals_per_day": 3
        }

        self.fermented_food_intake_params = {
            "daily_fermented_food_intake": 3,
            "meals_per_day": 3
        }

        self.alcohol_intake_params = {
            "daily_alcohol_intake": 16,  # grams
            "meals_per_day": 3
        }
        # print("8----->", (time.time() - start_time))

    def request_nutrient(self, nutrient_type, df):
        # print(df[df[0] == str(nutrient_type)][1])
        val = float(df[df[0] == str(nutrient_type)][1])
        return val

    def carbs_protein_fat_ratio(self, energy: float, carbohydrate: float, protein: float, fat: float) -> float:
        """
        Modulate carbohydrates to 40-50% of diet, protein at 20-30% and remainder fats

        """
        # carbs: 45-65%, protein: 10-35%, fat: 20-35%
        carbs_energy_lower_bound = self.carbs_protein_fat_ratio_params[
            "carbohydrates_lower_bound"] * energy
        carbs_energy_upper_bound = self.carbs_protein_fat_ratio_params[
            "carbohydrates_upper_bound"] * energy

        protein_energy_lower_bound = self.carbs_protein_fat_ratio_params[
            "protein_lower_bound"] * energy
        protein_energy_upper_bound = self.carbs_protein_fat_ratio_params[
            "protein_upper_bound"] * energy

        fat_energy_lower_bound = self.carbs_protein_fat_ratio_params["fat_lower_bound"] * energy
        fat_energy_upper_bound = self.carbs_protein_fat_ratio_params["fat_upper_bound"] * energy

        # 4kcal per g carbs
        carbs_weight_lower_bound = carbs_energy_lower_bound / \
            self.carbs_protein_fat_ratio_params["kcal_per_g_carbs"]
        carbs_weight_upper_bound = carbs_energy_upper_bound / \
            self.carbs_protein_fat_ratio_params["kcal_per_g_carbs"]

        # 4 kcal per g protein
        protein_weight_lower_bound = protein_energy_lower_bound / \
            self.carbs_protein_fat_ratio_params["kcal_per_g_protein"]
        protein_weight_upper_bound = protein_energy_upper_bound / \
            self.carbs_protein_fat_ratio_params["kcal_per_g_protein"]

        # 9kcal per g fats
        fat_weight_lower_bound = fat_energy_lower_bound / \
            self.carbs_protein_fat_ratio_params["kcal_per_g_fat"]
        fat_weight_upper_bound = fat_energy_upper_bound / \
            self.carbs_protein_fat_ratio_params["kcal_per_g_fat"]
    #     print(carbs_weight_lower_bound, carbs_weight_upper_bound)
        if carbohydrate >= carbs_weight_lower_bound and carbohydrate <= carbs_weight_upper_bound:
            carbs_score = 1
        elif carbohydrate < carbs_weight_lower_bound:
            carbs_score = 1 - \
                (abs(carbohydrate - carbs_weight_lower_bound)) / \
                carbs_weight_lower_bound
        elif carbohydrate > carbs_weight_upper_bound:
            carbs_score = 1 - \
                (carbohydrate - carbs_weight_upper_bound) / \
                carbs_weight_upper_bound

        if protein >= protein_weight_lower_bound and protein <= protein_weight_upper_bound:
            protein_score = 1

        elif protein < protein_weight_lower_bound:
            protein_score = 1 - \
                (abs(protein - protein_weight_lower_bound)) / \
                protein_weight_lower_bound
        elif protein > protein_weight_upper_bound:
            protein_score = 1 - \
                (protein - protein_weight_upper_bound) / \
                protein_weight_upper_bound

        if fat >= fat_weight_lower_bound and fat <= fat_weight_upper_bound:
            fat_score = 1

        elif fat < fat_weight_lower_bound:
            fat_score = 1 - (abs(fat - fat_weight_lower_bound)
                             ) / fat_weight_lower_bound

        elif fat > fat_weight_upper_bound:
            fat_score = 1 - (fat - fat_weight_upper_bound) / \
                fat_weight_upper_bound

        # Alter the weighting based on the user profile
        score = self.carbs_protein_fat_ratio_params["carbs_score_weight"] * carbs_score + self.carbs_protein_fat_ratio_params["protein_score_weight"] * \
            protein_score + \
            self.carbs_protein_fat_ratio_params["fat_score_weight"] * fat_score

        return score

    def carbs_intake_ratio(self, energy: float, carbohydrate: float) -> float:

        # 4kcal per g carbs
        carbohydrate_energy = self.carbs_protein_fat_ratio_params["kcal_per_g_carbs"] * carbohydrate

        if carbohydrate_energy <= (0.2 * energy):
            score = 1
        else:
            score = 0

        return score

    def sodium_intake(self, salt: float, sodium: float) -> float:
        """
        Reduce salt intake to <6g or 2.4g sodium and increase potassium to ~3g

        """
        sodium = sodium * 0.001

        salt_upper_bound_per_meal = self.sodium_intake_params["daily_salt_intake"] / \
            self.sodium_intake_params["meals_per_day"]
        if salt > 0:
            if salt < salt_upper_bound_per_meal:
                salt_score = 1
            elif salt >= salt_upper_bound_per_meal:
                salt_score = 1 - \
                    (salt - salt_upper_bound_per_meal) / \
                    salt_upper_bound_per_meal
        elif salt == 0 and sodium > 0:
            sodium_upper_bound_per_meal = self.sodium_intake_params[
                "daily_sodium_intake"] / self.sodium_intake_params["meals_per_day"]
            if sodium < sodium_upper_bound_per_meal:
                salt_score = 1
            elif sodium >= sodium_upper_bound_per_meal:
                salt_score = 1 - \
                    (sodium - sodium_upper_bound_per_meal) / \
                    sodium_upper_bound_per_meal
        else:
            # If salt/sodium is not known, assign score 0.5
            salt_score = 0.5

        if salt_score < 0:
            salt_score = 0

        score = salt_score
        return score

    def potassium_intake(self, potassium: float) -> float:
        """
        Reduce potassium intake to 3g/day

        """

        potassium = potassium * 0.001

        if potassium > 0:
            potassium_upper_bound_per_meal = self.potassium_intake_params[
                "daily_potassium_intake"] / self.potassium_intake_params["meals_per_day"]
            # print('----', abs(potassium - potassium_upper_bound_per_meal))
            if potassium <= potassium_upper_bound_per_meal:
                potassium_score = 1 - \
                    (abs(potassium - potassium_upper_bound_per_meal)) / \
                    potassium_upper_bound_per_meal
            elif potassium > potassium_upper_bound_per_meal:
                potassium_score = 1 - \
                    0.1 * (abs(potassium - potassium_upper_bound_per_meal)) / \
                    potassium_upper_bound_per_meal
        else:
            # If potassium is not known, assign score 0.5
            potassium_score = 0.5

        score = potassium_score
        return score

    def sodium_potassium_intake(self, sodium: float, potassium: float):
        """
        Desired sodium-potassium ratio should be 1:3

        """

        sodium = sodium * 0.001
        potassium = potassium * 0.001

        # Avoid dvision by zero in case potassium is 0.
        if potassium > 0:
            sodium_potassium_ratio = float(sodium / potassium)
            # print('+++++', sodium_potassium_ratio, abs(sodium_potassium_ratio -
            #                                            self.sodium_potassium_intake_params["ratio"]))
            if sodium_potassium_ratio <= self.sodium_potassium_intake_params["ratio"]:
                sodium_potassium_ratio_score = 1 - \
                    0.5 * (abs(sodium_potassium_ratio -
                           self.sodium_potassium_intake_params["ratio"]) / self.sodium_potassium_intake_params["ratio"])
            elif sodium_potassium_ratio > self.sodium_potassium_intake_params["ratio"]:
                sodium_potassium_ratio_score = 1 - \
                    (abs(sodium_potassium_ratio -
                     self.sodium_potassium_intake_params["ratio"]) / self.sodium_potassium_intake_params["ratio"])
            score = sodium_potassium_ratio_score
        else:
            score = 0.5

        return score

    def calorie_deficit(self, energy: float, calorie_intake: float, energy_percent: float, meals_per_day: float ) -> float:
        """
        Calory restriction:

        energy: total energy (kcal) of the meal
        user_energy_threshold: daily recommended energy intake per meal
        daily_user_goal: user goals for daily calory deficit

        """
        calorie_intake = float(calorie_intake)
        meal_energy_threshold = calorie_intake / meals_per_day
        user_meal_goal = calorie_intake-(calorie_intake * (energy_percent/100))/ meals_per_day

        print(meal_energy_threshold)
        if energy < meal_energy_threshold:
            energy_diff = meal_energy_threshold - energy
            if energy_diff > 0 and energy_diff <= user_meal_goal:
                score = 1
            elif energy_diff > user_meal_goal:
                score = -0.5
        if energy >= meal_energy_threshold:
            energy_diff = abs(meal_energy_threshold - energy)
            score = 0.5

        return score

    def red_processed_meat_intake(self, ingredients: list) -> float:
        """
        No more than 90 g/day, i.e. 30 g/meal of read or processed meat intake

        """

        red_processed_meat_weight = 0
        for ingredient in ingredients:
            # If the ingredient is red or processed meat
            try:
                if list(self.annotated_df[self.annotated_df['Ingredient (as per 100 g)'] == ingredient]['Red/Processed Meat'])[0] == 'checked':
                    red_processed_meat_weight += 100
            except:
                pass
        # At least 5 fruits or vegetables a day, i.e. 2 veg/fruits per meal.
        meat_intake_per_meal = np.round(
            self.red_processed_meat_intake_params["red_processed_meat_per_day"] / self.red_processed_meat_intake_params["meals_per_day"])
        if red_processed_meat_weight <= meat_intake_per_meal:
            score = 1
        elif red_processed_meat_weight > meat_intake_per_meal and red_processed_meat_weight <= 1.5 * meat_intake_per_meal:
            score = 0.5
        else:
            score = -0.5

        return score

    def eliminate_red_meat(self, ingredients: list) -> bool:
        contains_red_meat = None
        for ingredient in ingredients:
            if 'checked' in list(self.annotated_df[self.annotated_df['Ingredient (as per 100 g)'] == ingredient]['Red/Processed Meat']):
                contains_red_meat = True
                break
            else:
                pass

        if contains_red_meat == None:
            contains_red_meat = False

        return contains_red_meat

    def fruit_vegetable_intake(self, ingredients: list) -> float:
        """
        At least 2 fruits and vegetables included per meal

        """

        veg_fruit_count = 0
        for ingredient in ingredients:
            # If the ingredient is red or processed meat
            if len(list(self.annotated_df[self.annotated_df['Ingredient (as per 100 g)'] == ingredient]['Fruit/Veg'])) > 0:
                if list(self.annotated_df[self.annotated_df['Ingredient (as per 100 g)'] == ingredient]['Fruit/Veg'])[0] == 'checked':
                    veg_fruit_count += 1

        # At least 5 fruits or vegetables a day, i.e. 2 veg/fruits per meal.
        if veg_fruit_count >= np.round(self.fruit_vegetable_intake_params["fruit_veg_per_day"] / self.fruit_vegetable_intake_params["meals_per_day"]):
            score = 1
        elif veg_fruit_count == 1:
            score = 0.5
        else:
            score = 0

        return score

    def pufa_intake(self, fat: float, pufa: float) -> float:
        """
        PUFA to fats ratio should be at >= 50%

        """

        if fat == 0:
            score = 0.5

            return score
        else:
            pufa_fat_ratio = pufa / fat
            if pufa_fat_ratio >= self.pufa_intake_params["pufa_fats_ratio"]:
                score = 1
            elif pufa_fat_ratio < self.pufa_intake_params["pufa_fats_ratio"] and pufa_fat_ratio >= (0.7 * self.pufa_intake_params["pufa_fats_ratio"]):
                score = 0.5
            else:
                score = 0

            return score

    def mufa_intake(self, fat: float, mufa: float) -> float:
        """
        MUFA to fats ratio should be at >= 25%

        """

        if fat == 0:
            score = 0.5

            return score
        else:
            mufa_fat_ratio = mufa / fat

            if mufa_fat_ratio >= self.mufa_intake_params["mufa_fats_ratio"]:
                score = 1
            elif mufa_fat_ratio < self.mufa_intake_params["mufa_fats_ratio"] and mufa_fat_ratio >= (0.7 * self.mufa_intake_params["mufa_fats_ratio"]):
                score = 0.5
            else:
                score = 0

            return score

    def saturated_intake(self, fat: float, saturated: float) -> float:
        """
        saturated fat to fats ratio should be between 0.03% and 0.05%

        """

        if fat == 0:
            score = 0.5

            return score
        else:
            saturated_fat_ratio = saturated / fat

            if saturated_fat_ratio >= self.saturated_intake_params["saturatedfats_fats_ratio_upper_bound"]:
                score = -0.5
            elif saturated_fat_ratio < self.saturated_intake_params["saturatedfats_fats_ratio_upper_bound"] and saturated_fat_ratio >= self.saturated_intake_params["saturatedfats_fats_ratio_lower_bound"]:
                score = 1
            else:
                score = 0.5

            return score

    def trans_fats_intake(self, fat: float, trans_fats: float) -> float:
        """
        trans fat to fats ratio should be 0

        """

        if fat == 0:
            score = 0.5

            return score
        else:
            trans_fats_fat_ratio = trans_fats / fat

            if trans_fats_fat_ratio >= 0.01:
                score = -1
            elif trans_fats_fat_ratio < 0.01 and trans_fats_fat_ratio > self.trans_fats_intake_params["transfats_fats_ratio"]:
                score = 0.5
            elif trans_fats_fat_ratio == self.trans_fats_intake_params["transfats_fats_ratio"]:
                score = 1

            return score

    def omega_ratio(self, omega_3: float, omega_6: float) -> float:
        """
        omega 3 to omega 6 ratio should be 2:1

        """

        # Avoid error: Division by zero
        if omega_6 == 0:
            score = 0
            return score
        else:
            ratio = omega_3 / omega_6
            if ratio >= self.omega_ratio_params["omega_3_to_omega_6_ratio"]:
                score = 1
            elif ratio < self.omega_ratio_params["omega_3_to_omega_6_ratio"] and ratio >= (0.5 * self.omega_ratio_params["omega_3_to_omega_6_ratio"]):
                score = 0.5
            elif ratio < (0.5 * self.omega_ratio_params["omega_3_to_omega_6_ratio"]):
                score = 0

        return score

    def fibre_intake(self, fibre: float) -> float:
        """
        fibre intake at least 30g per day, i.e. 10g per meal

        """
        fibre_intake_per_meal = self.fibre_intake_params["daily_fibre_intake"] / \
            self.fibre_intake_params["meals_per_day"]
        if fibre >= fibre_intake_per_meal:
            score = 1
        elif fibre >= (0.5 * fibre_intake_per_meal) and fibre < fibre_intake_per_meal:
            score = 0.5
        else:
            score = 0

        return score

    def polyphenol_intake(self, polyphenol: float) -> float:
        """
        Increase polyphenol intake at 1000mg/day

        """

        # from mg to g
        polyphenol = 0.01 * \
            self.polyphenol_intake_params["daily_polyphenol_intake"]
        recommended_polyphenol_intake_per_meal = polyphenol / \
            self.polyphenol_intake_params["meals_per_day"]
        if polyphenol >= recommended_polyphenol_intake_per_meal:
            score = 1
        elif polyphenol < recommended_polyphenol_intake_per_meal and polyphenol >= (recommended_polyphenol_intake_per_meal / 2):
            score = 0.5
        else:
            score = 0

        return score

    def fermented_food_intake(self, ingredients: list) -> float:
        """
        Increase fermented food intake - 2 to 3 servings per day, i.e. 1 fermented ingredient per meal approximately.

        """

        fermented_food_count = 0
        for ingredient in ingredients:
            # If the ingredient is red or processed meat
            if list(self.annotated_df[self.annotated_df['Ingredient (as per 100 g)'] == ingredient]['Fermented Food'])[0] == 'checked':
                fermented_food_count += 1
        # At least 5 fruits or vegetables a day, i.e. 2 veg/fruits per meal.
        fermented_food_per_meal = np.round(
            self.fermented_food_intake_params["daily_fermented_food_intake"] / self.fermented_food_intake_params["meals_per_day"])
        if fermented_food_count == fermented_food_per_meal:
            score = 1
        elif fermented_food_count == (2 * fermented_food_per_meal):
            score = 0.5
        else:
            score = 0

        return score

    def sugar_intake(self, sugar: float, meals_per_day: float) -> float:
        '''
        Keep sugar intake less than 30g for the day
        '''

        if sugar <= (90/meals_per_day)/4:
            score = 1
        elif sugar <= (90/meals_per_day)/2:
            score = 0.75
        elif sugar <=  (90/meals_per_day)-(90/meals_per_day)/4:
            score = 0.5
        elif sugar <= (90/meals_per_day):
            score = 0.25
        elif sugar >= 90/meals_per_day:
            score = -0.25
        elif sugar >= 90/meals_per_day * 2:
            score = - 0.5
        elif sugar >= 90/meals_per_day * 3:
            score = -1
        else:
            score = 0

        return score

    def alcohol_intake(self, alcohol: float) -> float:
        """
        Reduce alcohol intake < 14 units/week (2units/day) or 112g/week, 16g/day

        """
        recommended_alcohol_intake_per_meal = self.alcohol_intake_params[
            "daily_alcohol_intake"] / self.alcohol_intake_params["meals_per_day"]
        if alcohol <= recommended_alcohol_intake_per_meal:
            score = 1
        elif alcohol >= recommended_alcohol_intake_per_meal and alcohol <= (1.3 * recommended_alcohol_intake_per_meal):
            score = 0.5
        else:
            score = 0

        return score

    def omega_3_intake(self, omega_3: float, meals_per_day: float) -> float:
        """
        Omega 3: 3g/meals - 3g/d recommendation

        """
        if omega_3 >= 3/meals_per_day:
            score = 1
        elif omega_3 <= 3/meals_per_day and omega_3 >= (3/meals_per_day)/2:
            score = 0.5
        elif omega_3 <= (3/meals_per_day)/2 and omega_3 > 0:
            score = 0.25
        else:
            score = 0

        return score

    def final_score_calculator(self, ingredients: list, num_of_servings: float, df: pd.DataFrame, usercase: str, verbose: bool,
                                calorie_intake: float, energy_percent: float, meals_per_day: float) -> float:
        # print(type(self.request_nutrient("energy", df)), type(num_of_servings))
        energy = self.request_nutrient("energy", df) / num_of_servings
        carbohydrate = self.request_nutrient(
            "carbohydrate", df) / num_of_servings
        protein = self.request_nutrient("protein", df) / num_of_servings
        fat = self.request_nutrient("fat", df) / num_of_servings
        salt = self.request_nutrient("salt", df) / num_of_servings
        sodium = self.request_nutrient("sodium", df) / num_of_servings
        potassium = self.request_nutrient("potassium", df) / num_of_servings
        pufa = self.request_nutrient("pufa", df) / num_of_servings
        mufa = self.request_nutrient("mufa", df) / num_of_servings
        omega_3 = self.request_nutrient("omega_3", df) / num_of_servings
        omega_6 = self.request_nutrient("omega_6", df) / num_of_servings
        fibre = self.request_nutrient("fibre", df) / num_of_servings
        saturates = self.request_nutrient("saturates", df) / num_of_servings
        trans_fats = self.request_nutrient("trans", df) / num_of_servings
        sugar = self.request_nutrient('sugar', df) / num_of_servings
        if verbose:
            print("energy: ", energy)
            print("carbohydrate: ", carbohydrate)
            print("protein: ", protein)
            print("fat: ", fat)
            print("salt: ", salt)
            print("sodium: ", sodium)
            print("pufa: ", pufa)
            print("mufa: ", mufa)
            print("omega_3: ", omega_3)
            print("omega_6: ", omega_6)
            print("fibre: ", fibre)
            print("saturates: ", saturates)
            print("trans_fats: ", trans_fats)
            print("potassium: ", potassium)
            print('sugar: ', sugar)
            print()

        carbs_protein_fat_ratio_score = self.carbs_protein_fat_ratio(
            energy, carbohydrate, protein, fat)
        carbs_intake_ratio_score = self.carbs_intake_ratio(
            energy, carbohydrate)
        sodium_intake_score = self.sodium_intake(salt, sodium)
        potassium_intake_score = self.potassium_intake(potassium)
        calorie_deficit_Score = self.calorie_deficit(energy, calorie_intake, energy_percent, meals_per_day)
        red_processed_meat_intake_score = self.red_processed_meat_intake(
            ingredients)
        fruit_vegetable_intake_score = self.fruit_vegetable_intake(
            ingredients)
        pufa_intake_score = self.pufa_intake(fat, pufa)
        mufa_intake_score = self.mufa_intake(fat, mufa)
        saturated_intake_score = self.saturated_intake(fat, saturates)
        trans_fats_intake = self.trans_fats_intake(fat, trans_fats)
        omega_ratio_score = self.omega_ratio(omega_3, omega_6)
        omega_3_score = self.omega_3_intake(omega_3, meals_per_day)

        fibre_intake_score = self.fibre_intake(fibre)
        sodium_potassium_score = self.sodium_potassium_intake(
            sodium, potassium)
        contains_red_meat = self.eliminate_red_meat(ingredients)
        sugar_score = self.sugar_intake(sugar, meals_per_day)

        nutrients = [carbs_protein_fat_ratio_score, carbs_intake_ratio_score, sodium_intake_score, potassium_intake_score, calorie_deficit_Score, red_processed_meat_intake_score,
                     fruit_vegetable_intake_score, pufa_intake_score, mufa_intake_score, saturated_intake_score, trans_fats_intake, omega_ratio_score,
                     fibre_intake_score, sodium_potassium_score, sugar_score, omega_3_score]
        UM = Usecase_Manager(usercase)
        score = UM.usecase_score_generator(nutrients)

        return score, contains_red_meat, ingredients, energy, carbohydrate, protein, fat, salt, sodium, pufa, mufa, omega_3, omega_6, fibre, saturates, trans_fats, potassium, sugar

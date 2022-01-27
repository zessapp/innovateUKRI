class Usecase_Manager:

    def __init__(self, usercase):
        self.usecase = usercase

    def usecase_score_generator(self, nutrients):

        carbs_protein_fat_ratio_score, carbs_intake_ratio_score, sodium_intake_score, potassium_intake_score, calorie_deficit_Score, red_processed_meat_intake_score, \
            fruit_vegetable_intake_score, pufa_intake_score, mufa_intake_score, saturated_intake_score, trans_fats_intake, omega_ratio_score, \
            fibre_intake_score, sodium_potassium_score, sugar_score, omega_3_score = nutrients

        if self.usecase == None or self.usecase == "no requirements":

            if sodium_potassium_score > 0.5:
                final_score = float(((1.5 * carbs_protein_fat_ratio_score) + (0.25 * sodium_intake_score) + (0.25 * potassium_intake_score) + (2 * calorie_deficit_Score) + (red_processed_meat_intake_score) + (1.5 * fruit_vegetable_intake_score) +
                        (pufa_intake_score) + (1.5 * omega_3_score) + (1.5 * mufa_intake_score) + (1 * saturated_intake_score) + (3 * trans_fats_intake) + (1.5 * omega_ratio_score) + fibre_intake_score + (0.25 * sodium_potassium_score) + (sugar_score * 2)) / 15)
            else:
                final_score = float(((1.5 * carbs_protein_fat_ratio_score) + (0.5* sodium_intake_score) + (0.5 * potassium_intake_score) + (2 * calorie_deficit_Score) + (red_processed_meat_intake_score) + (1.5 * fruit_vegetable_intake_score) +
                        (pufa_intake_score) + (1.5 * omega_3_score) + (1.5 * mufa_intake_score) + (1 * saturated_intake_score) + (3 * trans_fats_intake) + (1.5 * omega_ratio_score) + fibre_intake_score + (0.25 * sodium_potassium_score) + (sugar_score * 2)) / 15)

        elif self.usecase.lower() == "vegan" or self.usecase.lower() == "pescetarian":

            if sodium_potassium_score > 0.5:
                final_score = float((1.25 * carbs_protein_fat_ratio_score + 0.5 * sodium_intake_score + 0.5 * potassium_intake_score + 2 * calorie_deficit_Score + 0.5 * fruit_vegetable_intake_score +
                                     pufa_intake_score + 1.5 * mufa_intake_score + 1.75 * saturated_intake_score + 3.0 * trans_fats_intake + 0.25 * omega_ratio_score + 1.5 * fibre_intake_score + sodium_potassium_score + (sugar_score * 2)) / 14)
            else:
                final_score = float((1.25 * carbs_protein_fat_ratio_score + 0.5 * sodium_intake_score + 0.5 * potassium_intake_score + 2 * calorie_deficit_Score + 0.5 * fruit_vegetable_intake_score +
                                    pufa_intake_score + 1.5 * mufa_intake_score + 1 * saturated_intake_score + 3.0 * trans_fats_intake + 0.25 * omega_ratio_score + 1.5 * fibre_intake_score + 0.25 * sodium_potassium_score + (sugar_score * 2)) / 14)

        elif self.usecase.lower() == "low carb carnivorous":

            if sodium_potassium_score > 0.5:
                final_score = float(((1.5 * carbs_protein_fat_ratio_score) + (0.125 * sodium_intake_score) + (0.125 * potassium_intake_score) + (2 * calorie_deficit_Score) + (red_processed_meat_intake_score) + (1.5 * fruit_vegetable_intake_score) +
                        (pufa_intake_score) + (1.5 * omega_3_score) + (1.5 * mufa_intake_score) + (1 * saturated_intake_score) + (3 * trans_fats_intake) + (1.5 * omega_ratio_score) + fibre_intake_score + (0.25 * sodium_potassium_score) + (sugar_score * 2)) / 15)
            else:
                final_score = float(((1.5 * carbs_protein_fat_ratio_score) + (0.25 * sodium_intake_score) + (0.25 * potassium_intake_score) + (2 * calorie_deficit_Score) + (red_processed_meat_intake_score) + (1.5 * fruit_vegetable_intake_score) +
                        (pufa_intake_score) + (1.5 * omega_3_score) + (1.5 * mufa_intake_score) + (1 * saturated_intake_score) + (3 * trans_fats_intake) + (1.5 * omega_ratio_score) + fibre_intake_score + (0.25 * sodium_potassium_score) + (sugar_score * 2)) / 15)
        else:
            final_score = float(((1.5 * carbs_protein_fat_ratio_score) + (1.25 * sodium_intake_score) + (1.25 * potassium_intake_score) + (2 * calorie_deficit_Score) + (red_processed_meat_intake_score) + (2 * fruit_vegetable_intake_score) +
                    (1.5 * omega_3_score) + (1.5 * mufa_intake_score) + (2 * saturated_intake_score) + (3 * trans_fats_intake) + (1.5 * omega_ratio_score) + fibre_intake_score + (1.25 * sodium_potassium_score) + (sugar_score * 2)) / 14)

        return final_score

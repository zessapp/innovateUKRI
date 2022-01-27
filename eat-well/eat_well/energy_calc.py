import typing


def calc_bmr(sex: str , weight: float, weight_unit: str, height: float, height_unit: str , age: int) -> float:

    '''
        Men: BMR = 88.362 + (13.397 * weight in kg) + (4.799 * height in cm) - (5.677 *age in years)
        Women: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) – (4.330 x age in years)
    '''
    if weight_unit == 'lbs': weight = weight * 2.2
    elif weight_unit == 'st': weight = weight * 6.35
    if height_unit == 'ft':
        # Format i.e. 5.10 is 5 ft 10 inches
        ft, inc = float(height.split('.')[0]), float(height.split('.')[1])
        height = (ft * 30.48) + (inc * 2.54)

    if sex == 'male':
        return 66.47 + (13.75 * weight) + (5.003 * float(height)) - (6.755 * age)
    elif sex == 'female':
        return 655.1 + (9.563 * weight) + (1.85 * float(height)) - (4.676 * age)

    return BMR

def tdee(sex: str , weight: float, weight_unit: str, height: float, height_unit:str , age: int, activity_level: str) -> float:
    """
    Sedentary (little to no exercise + work a desk job) = 1.2
    Lightly Active (light exercise 1-3 days / week) = 1.375
    Moderately Active (moderate exercise 3-5 days / week) = 1.55
    Very Active (heavy exercise 6-7 days / week) = 1.725
    Extremely Active (very heavy exercise, hard labor job, training 2x / day) = 1.9
    """

    bmr = calc_bmr(sex , weight, weight_unit, height, height_unit, age)

    if activity_level.lower() == 'sedentary': activity = 1.2
    if activity_level.lower() == 'light': activity = 1.375
    if activity_level.lower() == 'moderate': activity = 1.55
    if activity_level.lower() == 'very': activity = 1.725
    if activity_level.lower() == 'extremely': activity = 1.9

    return bmr * activity

# test purposes
# gender, weight, weight_unit, height, height_unit, age = 'male', 100, 'kg', 188, 'cm', 28
# tdee(gender , weight, weight_unit, height, height_unit , age, activity_level='sedentary')

# def tdee_macro_calculator(energy):
#
#     carbohydrates_percentage = 0.55
#     protein_percentage = 0.20
#     fat_percentage = 0.25
#     kcal_per_g_carbs = 4
#     kcal_per_g_protein = 4
#     kcal_per_g_fat = 9
#
#     # recommended macro intake quantities in grams
#     recommended_carbohydrates_intake = carbohydrates_percentage * energy / 4
#     recommended_protein_intake = protein_percentage * energy / 4
#     recommended_fat_intake = fat_percentage * energy / 9
#
#     return (
#         recommended_carbohydrates_intake,
#         recommended_protein_intake,
#         recommended_fat_intake,
#     )
#
# tdee_macro_calculator(tdee(gender , weight, weight_unit, height, height_unit , age, activity_level='sedentary'))

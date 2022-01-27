import unittest
from eat_well_features import EatWellFeatures


class TestStringMethods(unittest.TestCase):

    def test_carbs_protein_fat_ratio(self):
        features = EatWellFeatures()
        assert features.carbs_protein_fat_ratio(100, 12, 4, 3) == 1

    def test_sodium_intake(self):
        features = EatWellFeatures()
        assert features.sodium_intake(0.2, 0) == 1

    def test_potassium_intake(self):
        features = EatWellFeatures()
        assert features.potassium_intake(800) == 1

    def test_calorie_deficit(self):
        features = EatWellFeatures()
        assert features.calorie_deficit(700, 2400, 300) == 1

    def test_fruit_vegetable_intake(self):
        features = EatWellFeatures()
        assert features.fruit_vegetable_intake(
            ['garlic', 'apple', 'orange', 'bacon']) == 1

    def test_pufa_intake(self):
        features = EatWellFeatures()
        assert features.pufa_intake(10, 6) == 1

    def test_mufa_intake(self):
        features = EatWellFeatures()
        assert features.mufa_intake(10, 4) == 1

    def test_saturated_intake(self):
        features = EatWellFeatures()
        assert features.saturated_intake(10, 0.4) == 1

    def test_trans_fats_intake(self):
        features = EatWellFeatures()
        assert features.trans_fats_intake(10, 0) == 1

    def test_omega_ratio(self):
        features = EatWellFeatures()
        assert features.omega_ratio(2, 4) == 0

    def test_fibre_intake(self):
        features = EatWellFeatures()
        assert features.fibre_intake(11) == 1

    def test_polyphenol_intake(self):
        features = EatWellFeatures()
        assert features.polyphenol_intake(10003) == 1


if __name__ == '__main__':
    unittest.main()

import { IAppContext, IRecipe } from "src/components/AppContext"
import { portionIncrement } from "src/components/Planner/MealPlannerItem"

interface ISummary {
    carbohydrate: number
    energy: number
    fat: number
    fibre: number
    mufa: number
    name: string
    omega_3: number
    omega_6: number
    potassium: number
    protein: number
    salt: number
    saturate: number
    score: number
    sodium: number
    sugar: number
    trans_fat: number
}

export const getTotalMealNutrientValue = (
    context: IAppContext,
    nutrientKey: string
) => {
    let nutrient = 0

    Object.keys(context.userData.mealPlanner).forEach((value) => {
        const meals =
            (context.userData.mealPlanner[value].meal as IRecipe[]) || []

        meals.forEach((recipe) => {
            // If selected portions is undefined assume worst case (lowest portion)
            const selectedPortions =
                recipe?.portion_selected || portionIncrement

            if (recipe && nutrientKey in recipe) {
                nutrient = nutrient + recipe[nutrientKey] * selectedPortions
            }
        })
    })

    return nutrient
}

const summaryKeys = [
    "carbohydrate",
    "energy",
    "fat",
    "fibre",
    "pufa",
    "mufa",
    "omega_3",
    "omega_6",
    "potassium",
    "protein",
    "salt",
    "saturate",
    "sodium",
    "sugar",
    "trans_fat",
]

export const getSummary = (context: IAppContext): ISummary => {
    // eslint-disable-next-line prefer-const
    let summaryObject = {} as ISummary

    summaryKeys.forEach((key) => {
        summaryObject[key] = getTotalMealNutrientValue(context, key)
    })

    return summaryObject
}

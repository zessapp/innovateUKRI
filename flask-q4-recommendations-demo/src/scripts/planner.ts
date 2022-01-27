import { IAppContext, IRecipe } from "src/components/AppContext";
import { IRecipe } from "src/components/pages/MealPlannerSelectionPage";
import { portionIncrement } from "src/components/Planner/MealPlannerItem";


// export const getMealWithPortionMultiplier = (context: IAppContext, meal: IRecipe) => {

//     let mealWithPortions = {}

//     // If selected portions is undefined assume worst case (lowest portion)
//     const selectedPortions = meal.portion_selected || portionIncrement

//     Object.keys(meal).forEach((key, index, array)=>{
//         mealWithPortions[key] = meal[key] * selectedPortions
//     })

//     return mealWithPortions 
// }
import { createContext, useContext } from 'react'

interface IActivity {
	text: string
	code: string
}

interface ISex {
	text: string
	code: string
}
export interface IRecipe {
    portion_multiplier: number
	max_portion_multiplier: number
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
    pufa: number
    salt: number
    saturate: number
    score: number
    sodium: number
    sugar: number
    trans_fat: number
    ingredients: string[]
    url: string
    portion_selected?: number 
}

export interface IAppContext {
	userData: {
		diet: number
		allergies: number[]
		activityLevel: number
		age: number
		height: string
		weight: string
		sex: number
		tdee:{
			carbs: number
			energy: number
			fat: number
			protein: number 
		},
		mealPlanner: {
            Breakfast: {
                meal: IRecipe[],
            },
            Lunch: {
                meal: IRecipe[],
            },
            Dinner: {
                meal: IRecipe[],
            },
        },
	},
	diets:string[]
	allergies: string[]
	activities: IActivity[]
	mealTypes:string[]
	sex: ISex[]
	setUserData: Function
  }  

const AppContext = createContext<IAppContext>({
	userData: {
		diet: null,
		allergies: null,
		activityLevel: null,
		age: null,
		height: null,
		weight: null,
		sex: null,
		tdee: {
			carbs: null,
			energy: null,
			fat: null,
			protein: null 
		},
		mealPlanner: {
            Breakfast: {
                meal: [], 
            }, 
            Lunch: {
                meal: [],
            },
            Dinner: {
                meal: [],
            },
        },
	},
	diets:[],
	allergies: [],
	activities: [],
	mealTypes:[],
	sex:[],
	setUserData: null
  });

export default AppContext;


export function useUserContext() {
	return useContext(AppContext);
}


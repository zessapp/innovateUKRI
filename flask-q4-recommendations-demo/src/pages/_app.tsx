// ./pages/_app.js
import { useState } from "react"
import AppContext from "../components/AppContext"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    font-size: clamp(16px, 1.8vh, 163.84px);
    line-height: 1.35em;

    /* Minimum aspect ratio */
    @media (min-aspect-ratio: 4/4) {
        font-size: clamp(16px, 1.8vh, 163.84px);
    }
    
    /* Maximum aspect ratio */
    @media (max-aspect-ratio: 4/4) {
        font-size: clamp(16px, 1.8vw, 163.84px);
    }
  }

`

const saveLocalStorage = (object: object) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("appData", JSON.stringify(object))
    }
}

const getLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("key"))
    }
}

export default function App({ Component }) {
    // Get menu data via GraphQL query in `pageProps`.
    const userData = {
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
            protein: null,
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
    }

    const appData = {
        diets: [
            "Vegan",
            "Vegetarian",
            "Seafood",
            "Dairy-vegetarian",
            "Ovo-vegetarian",
            "No diet", // TODO - Change this to "I eat everything"
        ],
        allergies: [
            "Cereals containing gluten",
            "Milk",
            "Eggs",
            "Molluscs",
            "Sulphur",
            "Celery (Allergen)",
            "Treenuts",
            "Fish",
            "Lupin",
            "Soya",
            "Peanuts",
            "Sesame",
            "Mustard",
            "No allergies",
        ],
        activities: [
            {
                text: "Sedentary (little to no exercise + work a desk job)",
                code: "sedentary",
            },
            {
                text: "Lightly Active (light exercise 1-3 days / week)",
                code: "light",
            },
            {
                text: "Moderately Active (moderate exercise 3-5 days / week)",
                code: "moderate",
            },
            {
                text: "Very Active (heavy exercise 6-7 days / week)",
                code: "very",
            },
            {
                text:
                    "Extremely Active (very heavy exercise, hard labor job, training 2x / day)",
                code: "extremely",
            },
        ],
        mealTypes: ["Breakfast", "Lunch", "Dinner"],
        sex: [
            { text: "Male", code: "male" },
            { text: "Female", code: "female" },
        ],
    }

    // Store menu as state for the MenuProvider.
    const [userDataState, setUserDataState] = useState(userData)

    return (
        <AppContext.Provider
            value={{
                userData: userDataState,
                ...appData,
                setUserData: (value) => {
                    setUserDataState(value)
                },
            }}
        >
            <GlobalStyle />
            <Component />
        </AppContext.Provider>
    )
}

import React, { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Box, Heading, Text } from "grommet"
import styled from "styled-components"
import axios from "axios"
import { IAppContext, IRecipe, useUserContext } from "../AppContext"
import { getTotalMealNutrientValue } from "src/scripts/summary"
import MealPlannerItem from "../Planner/MealPlannerItem"
interface IMealPlannerSelectionPage {
    mealType: string
}

export const keyOrder = [
    "energy",
    "carbohydrate",
    "protein",
    "fat",
    "sugar",
    "fibre",
    "saturate",
    "mufa",
    "pufa",
    "omega_3",
    "omega_6",
    "trans_fat",
    "potassium",
    "sodium",
    "salt",
    "portion_multiplier",
    "max_portion_multiplier",
    "name",
    "score",
]

const MealPlannerSelectionPageContainer = styled(Box)`
    max-width: 50vw;
    min-width: 700px;
`

const MealPlannerSelectionPage: FC<IMealPlannerSelectionPage> = (props) => {
    const router = useRouter()

    const userContext = useUserContext()

    const [isLoading, setIsLoading] = useState(true)

    const [recommendations, setRecommendations] = useState<IRecipe[]>([])

    const getRecommendations = async (
        context: IAppContext,
        mealType: string,
        setRecommendations: (value: unknown) => unknown
    ) => {
        const url = `http://localhost:5000/recommendations`

        const recommendationsResponse = await axios.post<IRecipe>(url, {
            energy: context.userData.tdee.energy || 0,
            totalConsumedEnergy:
                getTotalMealNutrientValue(context, "energy") || 0,
            allergies: context.userData.allergies?.map(
                (allergyIndex, index) => {
                    return context.allergies[allergyIndex]
                }
            ),
            diet: context.diets[context.userData.diet],
            meal_type: mealType,
        })

        // TODO - Filter out foods that are already selected in another meal

        // context.setUserData({
        //     ...context.userData,
        //     tdee: recommendationsResponse.data,
        // })

        setRecommendations(recommendationsResponse.data)

        setIsLoading(false)

        console.log("recommendationsResponse", recommendationsResponse.data)
    }

    useEffect(() => {
        setIsLoading(true)
        getRecommendations(userContext, props.mealType, setRecommendations)
    }, [])

    return (
        <MealPlannerSelectionPageContainer alignSelf="center">
            <Text
                weight="bold"
                onClick={() => {
                    router.push("/meal-planner")
                }}
                style={{ cursor: "pointer", opacity: 0.7 }}
            >
                {"<"} Back To Planner{" "}
            </Text>
            <Heading
                size="superLarge"
                color="black"
                margin="0"
                textAlign="center"
            >
                {props.mealType}
            </Heading>
            <Box>
                {isLoading && (
                    <Heading
                        size="superLarge"
                        color="black"
                        margin={{ vertical: "medium" }}
                        textAlign="center"
                    >
                        Loading
                    </Heading>
                )}
                <Box pad={{ top: "medium" }}>
                    {!isLoading &&
                        recommendations.map((item, index) => (
                            <MealPlannerItem
                                meal={item}
                                mealType={props.mealType}
                            />
                        ))}
                </Box>
            </Box>
        </MealPlannerSelectionPageContainer>
    )
}

export default MealPlannerSelectionPage

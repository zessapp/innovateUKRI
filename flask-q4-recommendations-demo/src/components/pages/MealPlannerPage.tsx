import React from "react"
import { useRouter } from "next/router"
import { Box, Text, Grid, Image, Button } from "grommet"
import Card from "src/components/common/Card"
import PlannerMeal from "src/components/Planner/PlannerMeal"
import styled from "styled-components"
import { IAppContext, useUserContext } from "../AppContext"
import { getSummary } from "src/scripts/summary"
import { nutrientMapping } from "../Planner/MealPlannerItem"

const MealPlannerPageContainer = styled(Box)`
    max-width: 50vw;
    min-width: 700px;
`
const SummaryCard = styled(Card)`
    background: white;
`

const MealPlannerDataBlock = styled(Box)``

const MealPlannerDataLabel = styled(Text)`
    font-weight: bold;
    font-size: 0.8rem;
    color: #6f6f6f;
`

const deleteMeal = (context: IAppContext, mealType: string, mealName: string, index: number) => {
   
    context.setUserData({
        ...context.userData,
        mealPlanner: {
            ...context.userData.mealPlanner,

        },
        mealType: {
            ...context.userData.mealPlanner[mealType].meal.splice(index, 1),
        }, 
    })
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
]

export default function MealPlanner() {
    const userContext = useUserContext()
    const router = useRouter()

    const summaryData = getSummary(userContext)

    return (
        <MealPlannerPageContainer alignSelf="center">
            <SummaryCard pad="medium">
                <Text size="xlarge" weight="bold" textAlign="center">
                    Summary
                </Text>
                <Grid rows={["auto"]} columns={["1/2", "1/2"]} gap="small">
                    {/* {Object.keys(summaryData).map((key, index) => (
                        <MealPlannerDataBlock>
                            <MealPlannerDataLabel>{key}</MealPlannerDataLabel>
                            <Text>
                                {parseFloat(summaryData[key].toFixed(2))}
                            </Text>
                        </MealPlannerDataBlock>
                    ))} */}

                    {keyOrder.map((key) => {
                        return (
                            <MealPlannerDataBlock>
                                <MealPlannerDataLabel>
                                    {nutrientMapping[key]}
                                </MealPlannerDataLabel>
                                <Text>
                                    {parseFloat(summaryData[key].toFixed(2))}
                                </Text>
                            </MealPlannerDataBlock>
                        )
                    })}
                </Grid>
            </SummaryCard>
            <Box pad="medium">
                <Text weight="bold">My Morning</Text>
                <PlannerMeal mealName="Breakfast" mealTime="9:00 am">
                    {userContext.userData.mealPlanner.Breakfast.meal?.length >
                        0 &&
                        userContext.userData.mealPlanner.Breakfast.meal.map(
                            (meal, index) => (
                                <Box>
                                    <Image
                                        src={meal.url}
                                        style={{ borderRadius: "0.3rem" }}
                                    />
                                    <Text>{meal.name}</Text>
                                    <Button
                                        primary
                                        label="Delete"
                                        color="#CF6F73"
                                        style={{ color: "white" }}
                                        size="small"
                                        fill={"horizontal"}
                                        margin={{
                                            bottom: "medium",
                                            top: "medium",
                                        }}
                                        onClick={() => {
                                            deleteMeal(userContext, "Breakfast", meal.name, index)
                                        }}
                                    />
                                </Box>
                            )
                        )}
                </PlannerMeal>

                <PlannerMeal mealName="Lunch" mealTime="12:00 pm">
                    {userContext.userData.mealPlanner.Lunch.meal?.length > 0 &&
                        userContext.userData.mealPlanner.Lunch.meal.map(
                            (meal, index) => (
                                <Box>
                                    <Image
                                        src={meal.url}
                                        style={{ borderRadius: "0.3rem" }}
                                    />
                                    <Text>{meal.name}</Text>
                                    <Button
                                        primary
                                        label="Delete"
                                        color="#CF6F73"
                                        style={{ color: "white" }}
                                        size="small"
                                        fill={"horizontal"}
                                        margin={{
                                            bottom: "medium",
                                            top: "medium",
                                        }}
                                        onClick={() => {
                                            deleteMeal(userContext, "Lunch", meal.name, index)
                                        }}
                                    />
                                </Box>
                            )
                        )}
                </PlannerMeal>

                <PlannerMeal mealName="Dinner" mealTime="9:00 pm">
                    {userContext.userData.mealPlanner.Dinner.meal?.length > 0 &&
                        userContext.userData.mealPlanner.Dinner.meal.map(
                            (meal, index) => (
                                <Box>
                                    <Image
                                        src={meal.url}
                                        style={{ borderRadius: "0.3rem" }}
                                    />
                                    <Text>{meal.name}</Text>
                                    <Button
                                        primary
                                        label="Delete"
                                        color="#CF6F73"
                                        style={{ color: "white" }}
                                        size="small"
                                        fill={"horizontal"}
                                        margin={{
                                            bottom: "medium",
                                            top: "medium",
                                        }}
                                        onClick={() => {
                                            deleteMeal(userContext, "Dinner", meal.name, index)
                                        }}
                                    />
                                </Box>
                            )
                        )}
                </PlannerMeal>

                {/* <PlannerMeal mealName="Breakfast" mealTime="9:00">
                    {userContext.userData.mealPlanner.Breakfast.meal && (
                        <Box>
                            <Image
                                src={
                                    userContext.userData.mealPlanner.Breakfast
                                        .meal.url
                                }
                                style={{ borderRadius: "0.3rem" }}
                            />
                            <Text>
                                {
                                    userContext.userData.mealPlanner.Breakfast
                                        .meal.name
                                }
                            </Text>
                            <Button
                                primary
                                label="Delete"
                                color="#CF6F73"
                                style={{ color: "white" }}
                                size="small"
                                fill={"horizontal"}
                                margin={{ bottom: "medium", top: "medium" }}
                                onClick={() => {
                                    deleteMeal(userContext, "Breakfast")
                                }}
                            />
                        </Box>
                    )}
                </PlannerMeal>
            </Box>
            <Box pad="medium">
                <Text weight="bold"> My Afternoon</Text>

                <PlannerMeal mealName="Lunch" mealTime="12:00">
                    {userContext.userData.mealPlanner.Lunch.meal && (
                        <Box>
                            <Image
                                src={
                                    userContext.userData.mealPlanner.Lunch.meal
                                        .url
                                }
                            />
                            <Text>
                                {
                                    userContext.userData.mealPlanner.Lunch.meal
                                        .name
                                }
                            </Text>
                            <Button
                                primary
                                label="Delete"
                                color="#CF6F73"
                                style={{ color: "white" }}
                                size="small"
                                fill={"horizontal"}
                                margin={{ bottom: "medium", top: "medium" }}
                                onClick={() => {
                                    deleteMeal(userContext, "Lunch")
                                }}
                            />
                        </Box>
                    )}
                </PlannerMeal>
            </Box>
            <Box pad="medium">
                <Text weight="bold"> My Evening</Text>

                <PlannerMeal mealName="Dinner" mealTime="18:30">
                    {userContext.userData.mealPlanner.Dinner.meal && (
                        <Box>
                            <Image
                                src={
                                    userContext.userData.mealPlanner.Dinner.meal
                                        .url
                                }
                            />
                            <Text>
                                {
                                    userContext.userData.mealPlanner.Dinner.meal
                                        .name
                                }
                            </Text>
                            <Button
                                primary
                                label="Delete"
                                color="#CF6F73"
                                style={{ color: "white" }}
                                size="small"
                                fill={"horizontal"}
                                margin={{ bottom: "medium", top: "medium" }}
                                onClick={() => {
                                    deleteMeal(userContext, "Dinner")
                                }}
                            />
                        </Box>
                    )}
                </PlannerMeal> */}
            </Box>
        </MealPlannerPageContainer>
    )
}

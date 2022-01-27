import React, { Fragment, FC, useState, useEffect } from "react"
import router, { useRouter } from "next/router"
import { Box, Heading, Text } from "grommet"
import Button from "src/components/common/Button"
import Card from "src/components/common/Card"
import SurveyCard from "../common/Survey/SurveyCard"
import styled from "styled-components"
import { IAppContext, useUserContext } from "../AppContext"
import axios from "axios"

interface IUserSummaryPage {}

export interface ITDEE {
    energy: number
    carbs: number
    protien: number
    fat: number
}

const UserSummaryPageContainer = styled(Box)`
    max-width: 50vw;
    min-width: 700px;
`

const SummaryCard = styled(Card)`
    background: white;
`

const validateTdee = (context: IAppContext) => {
    return (
        !!context.userData.age &&
        !!context.userData.height &&
        !!context.userData.weight &&
        !!context.sex[context.userData.sex]?.code &&
        !!context.activities[context.userData.activityLevel]?.code
    )
}

// age, height, height_units, weight, weight_untis, gender
// [energy, carbs, protein, fat]

// age, height, height_units, weight, weight_untis, gender
const getTdee = async (context: IAppContext) => {
    const url = `http://localhost:5000/tdee_results`

    if (validateTdee(context)) {
        const tdeeResponse = await axios.post<ITDEE>(url, {
            age: context.userData.age,
            height: parseFloat(context.userData.height) || 0,
            height_units: "cm",
            weight: parseFloat(context.userData.weight) || 0,
            weight_units: "kg",
            sex: context.sex[context.userData.sex].code,
            activity_level:
                context.activities[context.userData.activityLevel].code,
        })

        context.setUserData({
            ...context.userData,
            tdee: tdeeResponse.data,
        })

        console.log("tdeeResponse", tdeeResponse.data)
    }
}

const UserSummaryPage: FC<IUserSummaryPage> = () => {
    const router = useRouter()

    const userContext = useUserContext()

    const user = userContext.userData

    useEffect(() => {
        getTdee(userContext)
    }, [])

    return (
        <UserSummaryPageContainer alignSelf="center">
            <Box direction="column" pad="large">
                <Heading
                    size="superlarge"
                    color="black"
                    margin="0"
                    textAlign="center"
                >
                    Here is your summary
                </Heading>
            </Box>
            <Box direction="column">
                <SummaryCard pad="medium" margin={{ bottom: "large" }}>
                    <Text weight="bold">Basal Metabolic Rate:</Text>
                    {Object.keys(user).map((key, index) => {
                        if (key.includes("tdee")) {
                            console.log(key)
                            return (
                                <Text>
                                    {(
                                        Math.round(user[key].bmr * 100) / 100
                                    ).toFixed(2)}{" "}
                                    Kcals
                                </Text>
                            )
                        }
                    })}

                    <Text>
                        <p></p>
                    </Text>
                    <Text weight="bold">
                        Calculated Total Daily Energy Expenditure:
                    </Text>
                    {Object.keys(user).map((key, index) => {
                        if (key.includes("tdee")) {
                            console.log(key)
                            return (
                                <Text>
                                    {(
                                        Math.round(user[key].energy * 100) / 100
                                    ).toFixed(2)}{" "}
                                    Kcals
                                </Text>
                            )
                        }
                    })}
                    <Text>
                        <p></p>
                    </Text>
                    <Text weight="bold">Carbs:</Text>
                    {Object.keys(user).map((key, index) => {
                        if (key.includes("tdee")) {
                            console.log(key)
                            return (
                                <Text>
                                    {(
                                        Math.round(user[key].carbs * 100) / 100
                                    ).toFixed(2)}{" "}
                                    g
                                </Text>
                            )
                        }
                    })}
                    <Text>
                        <p></p>
                    </Text>
                    <Text weight="bold">Protein:</Text>
                    {Object.keys(user).map((key, index) => {
                        if (key.includes("tdee")) {
                            console.log(key)
                            return (
                                <Text>
                                    {(
                                        Math.round(user[key].protein * 100) /
                                        100
                                    ).toFixed(2)}{" "}
                                    g
                                </Text>
                            )
                        }
                    })}
                    <Text>
                        <p></p>
                    </Text>
                    <Text weight="bold">Fat:</Text>
                    {Object.keys(user).map((key, index) => {
                        if (key.includes("tdee")) {
                            console.log(key)
                            return (
                                <Text>
                                    {(
                                        Math.round(user[key].fat * 100) / 100
                                    ).toFixed(2)}{" "}
                                    g
                                </Text>
                            )
                        }
                    })}
                </SummaryCard>

                <SummaryCard pad="medium" margin={{ bottom: "large" }}>
                    <Text weight="bold">Activity level</Text>
                    <Text>
                        {userContext.activities[user.activityLevel]?.text}
                    </Text>
                </SummaryCard>
                <SummaryCard pad="medium" margin={{ bottom: "large" }}>
                    <Text weight="bold">Age</Text>
                    <Text>{user.age}</Text>
                </SummaryCard>
                <SummaryCard pad="medium" margin={{ bottom: "large" }}>
                    <Text weight="bold">Allergies</Text>
                    <Text>
                        {user.allergies &&
                            user.allergies.map((value, index) => {
                                const allergy = userContext.allergies[value]

                                return index + 1 === user.allergies.length
                                    ? allergy
                                    : allergy + ", "
                            })}
                    </Text>
                </SummaryCard>
                <SummaryCard pad="medium" margin={{ bottom: "large" }}>
                    <Text weight="bold">Diet</Text>
                    <Text>{userContext.diets[user.diet]}</Text>
                </SummaryCard>
                <SummaryCard pad="medium" margin={{ bottom: "large" }}>
                    <Text weight="bold">Height</Text>
                    <Text>{user.height}</Text>
                </SummaryCard>
                <SummaryCard pad="medium" margin={{ bottom: "large" }}>
                    <Text weight="bold">Sex</Text>
                    <Text>{userContext.sex[user.sex]?.text}</Text>
                </SummaryCard>
                <SummaryCard pad="medium" margin={{ bottom: "large" }}>
                    <Text weight="bold">Weight</Text>
                    <Text>{user.weight}</Text>
                </SummaryCard>

                <Box direction="column" margin={{ vertical: "large" }}>
                    <Button
                        primary
                        label="Next Page"
                        size="medium"
                        fill={"horizontal"}
                        margin={{ bottom: "medium" }}
                        onClick={() => router.push("meal-planner")}
                    />
                </Box>
            </Box>
        </UserSummaryPageContainer>
    )
}

export default UserSummaryPage

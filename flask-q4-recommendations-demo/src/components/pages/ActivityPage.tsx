import React, { Fragment, FC, useState } from "react"
import router, { useRouter } from "next/router"
import { Box, Heading } from "grommet"
import Button from "src/components/common/Button"
import SurveyCard from "../common/Survey/SurveyCard"
import styled from "styled-components"
import { useUserContext } from "../AppContext"

interface IActivityPageProps {}

const ActivityPageContainer = styled(Box)`
    max-width: 50vw;
    min-width: 700px;
`

const ActivityPage: FC<IActivityPageProps> = () => {
    const router = useRouter()

    const userContext = useUserContext()

    const activities = userContext.activities

    const setActivity = (index) => {
        userContext.setUserData({
            ...userContext.userData,
            activityLevel: index,
        })
    }

    return (
        <ActivityPageContainer alignSelf="center">
            <Box direction="column" pad="large">
                <Heading
                    size="superlarge"
                    color="black"
                    margin="0"
                    textAlign="center"
                >
                    How active are you?
                </Heading>
            </Box>
            <Box direction="column">
                {activities.map((activity, index) => {
                    return (
                        <SurveyCard
                            onClick={() => {
                                // setSelectedActivity({
                                //     index: index,
                                // })

                                setActivity(index)
                            }}
                            isSelected={
                                userContext.userData.activityLevel === index
                            }
                        >
                            {activity.text}
                        </SurveyCard>
                    )
                })}

                <Box direction="column" margin={{ vertical: "medium" }}>
                    <Button
                        primary
                        disabled={
                            !userContext.userData.activityLevel &&
                            userContext.userData.activityLevel !== 0
                        }
                        label="Next Page"
                        size="medium"
                        fill={"horizontal"}
                        margin={{ bottom: "medium" }}
                        onClick={() => router.push("diets")}
                    />
                </Box>
            </Box>
        </ActivityPageContainer>
    )
}

export default ActivityPage

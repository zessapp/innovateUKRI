import React, { Fragment, FC, useState } from "react"
import router, { useRouter } from "next/router"
import { Box, Heading, TextInput } from "grommet"
import Button from "src/components/common/Button"
import SurveyCard from "../common/Survey/SurveyCard"
import styled from "styled-components"
import { useUserContext } from "../AppContext"

interface IAgePageProps {}

const AgePageContainer = styled(Box)`
    max-width: 50vw;
    min-width: 700px;
`

const AgePage: FC<IAgePageProps> = () => {
    const router = useRouter()

    const userContext = useUserContext()

    const age = userContext.userData.age

    const setAge = (newAge: number) => {
        userContext.setUserData({
            ...userContext.userData,
            age: newAge,
        })
    }

    return (
        <AgePageContainer alignSelf="center">
            <Box direction="column" pad="large">
                <Heading
                    size="superlarge"
                    color="black"
                    margin="0"
                    textAlign="center"
                >
                    How old are you?
                </Heading>
            </Box>
            <Box direction="column">
                <Box>
                    <TextInput
                        onChange={(e) => {
                            const parsedAge = parseInt(e.target.value) || null

                            console.log(parsedAge)

                            setAge(parsedAge)
                        }}
                        value={age || 0}
                    ></TextInput>
                </Box>

                <Box direction="column" margin={{ vertical: "medium" }}>
                    <Button
                        primary
                        disabled={!age}
                        label="Next Page"
                        size="medium"
                        fill={"horizontal"}
                        margin={{ bottom: "medium" }}
                        onClick={() => router.push("height")}
                    />
                </Box>
            </Box>
        </AgePageContainer>
    )
}

export default AgePage

import React, { Fragment, FC, useState } from "react"
import router, { useRouter } from "next/router"
import { Box, Heading } from "grommet"
import Button from "src/components/common/Button"
import SurveyCard from "../common/Survey/SurveyCard"
import styled from "styled-components"
import { useUserContext } from "../AppContext"

interface IDietsPageProps {}

interface ISelectedDiet {
    index: number
}

const DietsPageContainer = styled(Box)`
    max-width: 50vw;
    min-width: 700px;
`

// const diets = [
//     "Vegan",
//     "Vegetarian",
//     "Seafood",
//     "Seafood only",
//     "Dairy-vegetarian",
//     "Ovo-vegetarian",
//     "No diet",
// ]

const DietsPage: FC<IDietsPageProps> = () => {
    const router = useRouter()

    const [selectedDiet, setSelectedDiet] = useState<ISelectedDiet>({
        index: null,
    })

    const userContext = useUserContext()

    const diets = userContext.diets

    const setDiet = (index) => {
        userContext.setUserData({
            ...userContext.userData,
            diet: index,
        })
    }

    return (
        <DietsPageContainer alignSelf="center">
            <Box direction="column" pad="large">
                <Heading
                    size="superlarge"
                    color="black"
                    margin="0"
                    textAlign="center"
                >
                    Whats your diet?
                </Heading>
            </Box>
            <Box direction="column">
                {diets.map((diet, index) => {
                    return (
                        <SurveyCard
                            onClick={() => {
                                // setSelectedDiet({
                                //     index: index,
                                // })

                                setDiet(index)
                            }}
                            isSelected={userContext.userData.diet === index}
                        >
                            {diet}
                        </SurveyCard>
                    )
                })}

                <Box direction="column" margin={{ vertical: "medium" }}>
                    <Button
                        primary
                        disabled={
                            !userContext.userData.diet &&
                            userContext.userData.diet !== 0
                        }
                        label="Next Page"
                        size="medium"
                        fill={"horizontal"}
                        margin={{ bottom: "medium" }}
                        onClick={() => router.push("allergies")}
                    />
                </Box>
            </Box>
        </DietsPageContainer>
    )
}

export default DietsPage

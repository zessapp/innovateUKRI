import React, { Fragment, FC, useState } from "react"
import router, { useRouter } from "next/router"
import { Box, Heading } from "grommet"
import Button from "src/components/common/Button"
import SurveyCard from "../common/Survey/SurveyCard"
import styled from "styled-components"
import { useUserContext } from "../AppContext"

interface IDietsPageProps {}

type ISelectedAllergies = number[]

const DietsPageContainer = styled(Box)`
    max-width: 50vw;
    min-width: 700px;
`

const allergies = [
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
]

const toggleSelectedAllergy = (
    currentlySelectedAllergies: ISelectedAllergies,
    newAllergyIndex: number
) => {
    if (currentlySelectedAllergies.includes(newAllergyIndex)) {
        return currentlySelectedAllergies.filter((e) => e !== newAllergyIndex)
    } else {
        return [...currentlySelectedAllergies, newAllergyIndex]
    }
}

const getAllergiesByName = (allergiesWithIndex: number[]) => {
    return allergiesWithIndex.map((allergyIndex, index) => {
        return allergies[allergyIndex]
    })
}

const DietsPage: FC<IDietsPageProps> = () => {
    const router = useRouter()

    const [
        selectedAllergies,
        setSelectedAllergies,
    ] = useState<ISelectedAllergies>([])

    const userContext = useUserContext()

    const setAllergies = (newAllergies) => {
        userContext.setUserData({
            ...userContext.userData,
            allergies: newAllergies,
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
                    Do you have any allergies?
                </Heading>
            </Box>
            <Box direction="column">
                {allergies.map((allergy, index) => {
                    return (
                        <SurveyCard
                            onClick={() => {
                                const newAllergies = toggleSelectedAllergy(
                                    selectedAllergies,
                                    index
                                )
                                setSelectedAllergies(newAllergies)

                                setAllergies(newAllergies)
                            }}
                            isSelected={selectedAllergies.includes(index)}
                        >
                            {allergy === "Sulphur"
                                ? "Sulphur dioxide and sulphites"
                                : allergy}
                        </SurveyCard>
                    )
                })}

                <Box direction="column" margin={{ vertical: "medium" }}>
                    <Button
                        primary
                        // disabled={
                        //     !selectedDiet.index && selectedDiet.index >= 0
                        // }
                        label="Next Page"
                        size="medium"
                        fill={"horizontal"}
                        margin={{ bottom: "medium" }}
                        onClick={() => router.push("age")}
                    />
                </Box>
            </Box>
        </DietsPageContainer>
    )
}

export default DietsPage

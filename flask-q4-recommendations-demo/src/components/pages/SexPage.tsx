import React, { Fragment, FC, useState } from "react"
import router, { useRouter } from "next/router"
import { Box, Heading, Text, TextInput } from "grommet"
import Button from "src/components/common/Button"
import SurveyCard from "../common/Survey/SurveyCard"
import styled from "styled-components"
import { useUserContext } from "../AppContext"
import Pill from "../common/Pill"

interface ISexPageProps {}

const SexPageContainer = styled(Box)`
    max-width: 50vw;
    min-width: 700px;
`

enum Sex {
    MALE = "Male",
    FEMALE = "Female",
}

interface ImperialWeight {
    st: number
    lbs: number
}

// const sexLabels = [Sex.MALE, Sex.FEMALE]

const stAndLbstoLbs = (st: number, lbs: number) => {
    return st * 14 + lbs
}

const getImperialvalue = (value: number, measure: Sex) => {
    if (measure === Sex.FEMALE) {
        return value / 6.35029318
    } else {
        return value
    }
}

const getMetricValue = (value: number, measure: Sex) => {
    if (measure === Sex.MALE) {
        return value * 6.35029318
    } else {
        return value
    }
}

const getStFromKg = (weightKilograms: number) => {
    return Math.trunc(getImperialvalue(weightKilograms, Sex.FEMALE))
}

const getLbsFromKg = (weightKilograms: number) => {
    return Math.round(
        (getImperialvalue(weightKilograms, Sex.FEMALE) %
            getStFromKg(weightKilograms)) *
            14
    )
}

const SexPage: FC<ISexPageProps> = () => {
    const router = useRouter()

    const userContext = useUserContext()

    const [weightMeasure, setHeightMeasure] = useState(Sex.MALE)

    const sexLabels = userContext.sex.map((value) => {
        return value.text
    })

    const sex = userContext.userData.sex

    const setSex = (newSex: number) => {
        userContext.setUserData({
            ...userContext.userData,
            sex: newSex,
        })
    }

    return (
        <SexPageContainer alignSelf="center">
            <Box direction="column" pad="large">
                <Heading
                    size="superlarge"
                    color="black"
                    margin="0"
                    textAlign="center"
                >
                    What's your sex?
                </Heading>
            </Box>
            <Box direction="column">
                <Pill
                    labels={sexLabels}
                    callback={(label) => {
                        const index = sexLabels.findIndex(
                            (element) => element === label
                        )
                        setSex(index)
                    }}
                    alignSelf="center"
                />
                <Box direction="column" margin={{ vertical: "medium" }}>
                    <Button
                        primary
                        disabled={!sex && sex !== 0}
                        label="Next Page"
                        size="medium"
                        fill={"horizontal"}
                        margin={{ bottom: "medium" }}
                        onClick={() => router.push("user-summary")}
                    />
                </Box>
            </Box>
        </SexPageContainer>
    )
}

export default SexPage

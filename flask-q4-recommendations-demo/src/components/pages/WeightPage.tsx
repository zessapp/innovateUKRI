import React, { Fragment, FC, useState } from "react"
import router, { useRouter } from "next/router"
import { Box, Heading, Text, TextInput } from "grommet"
import Button from "src/components/common/Button"
import SurveyCard from "../common/Survey/SurveyCard"
import styled from "styled-components"
import { useUserContext } from "../AppContext"
import Pill from "../common/Pill"

interface IWeightPageProps {}

const WeightPageContainer = styled(Box)`
    max-width: 50vw;
    min-width: 700px;
`

enum Measures {
    IMPERIAL = "IMPERIAL",
    METRIC = "METRIC",
}

interface ImperialWeight {
    st: number
    lbs: number
}

const heightMeasures = [Measures.IMPERIAL, Measures.METRIC]

const stAndLbstoLbs = (st: number, lbs: number) => {
    return st * 14 + lbs
}

const getImperialvalue = (value: number, measure: Measures) => {
    if (measure === Measures.METRIC) {
        return value / 6.35029318
    } else {
        return value
    }
}

const getMetricValue = (value: number, measure: Measures) => {
    if (measure === Measures.IMPERIAL) {
        return value * 6.35029318
    } else {
        return value
    }
}

const getStFromKg = (weightKilograms: number) => {
    return Math.trunc(getImperialvalue(weightKilograms, Measures.METRIC))
}

const getLbsFromKg = (weightKilograms: number) => {
    return (
        Math.round(
            (getImperialvalue(weightKilograms, Measures.METRIC) %
                getStFromKg(weightKilograms)) *
                14
        ) || 0
    )
}

const WeightPage: FC<IWeightPageProps> = () => {
    const router = useRouter()

    const userContext = useUserContext()

    const [weightMeasure, setHeightMeasure] = useState(Measures.IMPERIAL)

    const weight = userContext.userData.weight

    const setWeight = (newWeight: string) => {
        userContext.setUserData({
            ...userContext.userData,
            weight: newWeight,
        })
    }

    const [imperialInput, setImperialInput] = useState<ImperialWeight>({
        st: 0,
        lbs: 0,
    })

    return (
        <WeightPageContainer alignSelf="center">
            <Box direction="column" pad="large">
                <Heading
                    size="superlarge"
                    color="black"
                    margin="0"
                    textAlign="center"
                >
                    What's your weight?
                </Heading>
            </Box>
            <Box direction="column">
                <Box>
                    <Pill
                        labels={heightMeasures}
                        callback={(label) => {
                            setHeightMeasure(label as Measures)
                        }}
                    />
                    {weightMeasure === Measures.IMPERIAL && (
                        <Box>
                            <TextInput
                                placeholder="0"
                                onChange={(e) => {
                                    const parsedWeight =
                                        parseFloat(e.target.value) || null

                                    setImperialInput({
                                        ...imperialInput,
                                        st: parsedWeight,
                                    })

                                    const totalLbs = stAndLbstoLbs(
                                        parsedWeight,
                                        imperialInput.lbs
                                    )

                                    const totalKilograms = getMetricValue(
                                        totalLbs,
                                        Measures.IMPERIAL
                                    )

                                    setWeight(totalKilograms.toString())
                                }}
                                value={getStFromKg(weight)}
                            ></TextInput>
                            <Text>st</Text>
                            <TextInput
                                placeholder="0"
                                onChange={(e) => {
                                    let parsedWeight =
                                        parseFloat(e.target.value) || null

                                    if (parsedWeight > 13) {
                                        parsedWeight = imperialInput.lbs
                                    }

                                    setImperialInput({
                                        ...imperialInput,
                                        lbs: parsedWeight,
                                    })

                                    const totalLbs = stAndLbstoLbs(
                                        imperialInput.st,
                                        parsedWeight
                                    )

                                    const totalKilograms = getMetricValue(
                                        totalLbs,
                                        Measures.IMPERIAL
                                    )

                                    setWeight(totalKilograms.toString())
                                }}
                                value={getLbsFromKg(weight)}
                            ></TextInput>
                            <Text>lbs</Text>
                        </Box>
                    )}
                    {weightMeasure === Measures.METRIC && (
                        <Box>
                            <TextInput
                                placeholder="0"
                                onChange={(e) => {
                                    const latestValue = e.target.value

                                    if (
                                        latestValue.match(/^\d+\.?\d{0,2}$/) ||
                                        !latestValue
                                    ) {
                                        setWeight(latestValue)
                                    }
                                }}
                                value={weight}
                            ></TextInput>
                            <Text>kg</Text>
                        </Box>
                    )}
                </Box>

                <Box direction="column" margin={{ vertical: "medium" }}>
                    <Button
                        primary
                        disabled={!weight}
                        label="Next Page"
                        size="medium"
                        fill={"horizontal"}
                        margin={{ bottom: "medium" }}
                        onClick={() => router.push("sex")}
                    />
                </Box>
            </Box>
        </WeightPageContainer>
    )
}

export default WeightPage

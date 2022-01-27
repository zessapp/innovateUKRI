import React, { Fragment, FC, useState } from "react"
import router, { useRouter } from "next/router"
import { Box, Heading, Text, TextInput } from "grommet"
import Button from "src/components/common/Button"
import SurveyCard from "../common/Survey/SurveyCard"
import styled from "styled-components"
import { useUserContext } from "../AppContext"
import Pill from "../common/Pill"

interface IHeightPageProps {}

const HeightPageContainer = styled(Box)`
    max-width: 50vw;
    min-width: 700px;
`

enum Measures {
    IMPERIAL = "IMPERIAL",
    METRIC = "METRIC",
}

interface ImperialHeight {
    ft: number
    inches: number
}

const heightMeasures = [Measures.IMPERIAL, Measures.METRIC]

const ftAndInchesToInches = (ft: number, inches: number) => {
    return ft * 12 + inches
}

const getImperialvalue = (value: number, measure: Measures) => {
    if (measure === Measures.METRIC) {
        return value / 2.54
    } else {
        return value
    }
}

const getMetricValue = (value: number, measure: Measures) => {
    if (measure === Measures.IMPERIAL) {
        return value * 2.54
    } else {
        return value
    }
}

const getFtFromCm = (heightCm: number) => {
    return Math.trunc(getImperialvalue(heightCm, Measures.METRIC) / 12)
}

const getInchesFromCm = (heightCm: number) => {
    return Math.round(getImperialvalue(heightCm, Measures.METRIC) % 12)
}

const HeightPage: FC<IHeightPageProps> = () => {
    const router = useRouter()

    const userContext = useUserContext()

    const [heightMeasure, setHeightMeasure] = useState(Measures.IMPERIAL)

    const height = userContext.userData.height

    const setHeight = (newHeight: string) => {
        userContext.setUserData({
            ...userContext.userData,
            height: newHeight,
        })
    }

    const [imperialInput, setImperialInput] = useState<ImperialHeight>({
        ft: 0,
        inches: 0,
    })

    return (
        <HeightPageContainer alignSelf="center">
            <Box direction="column" pad="large">
                <Heading
                    size="superlarge"
                    color="black"
                    margin="0"
                    textAlign="center"
                >
                    What's your height?
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
                    {heightMeasure === Measures.IMPERIAL && (
                        <Box>
                            <TextInput
                                placeholder="0"
                                onChange={(e) => {
                                    const parsedHeight =
                                        parseFloat(e.target.value) || null

                                    setImperialInput({
                                        ...imperialInput,
                                        ft: parsedHeight,
                                    })

                                    const totalInches = ftAndInchesToInches(
                                        parsedHeight,
                                        imperialInput.inches
                                    )

                                    const totalCm = getMetricValue(
                                        totalInches,
                                        Measures.IMPERIAL
                                    )

                                    setHeight(totalCm.toString())
                                }}
                                value={getFtFromCm(height)}
                            ></TextInput>
                            <Text>ft</Text>
                            <TextInput
                                placeholder="0"
                                onChange={(e) => {
                                    let parsedHeight =
                                        parseFloat(e.target.value) || null

                                    if (parsedHeight > 11) {
                                        parsedHeight = imperialInput.inches
                                    }

                                    setImperialInput({
                                        ...imperialInput,
                                        inches: parsedHeight,
                                    })

                                    const totalInches = ftAndInchesToInches(
                                        imperialInput.ft,
                                        parsedHeight
                                    )

                                    const totalCm = getMetricValue(
                                        totalInches,
                                        Measures.IMPERIAL
                                    )

                                    setHeight(totalCm.toString())
                                }}
                                value={getInchesFromCm(height)}
                            ></TextInput>
                            <Text>inches</Text>
                        </Box>
                    )}
                    {heightMeasure === Measures.METRIC && (
                        <Box>
                            <TextInput
                                placeholder="0"
                                onChange={(e) => {
                                    const latestValue = e.target.value

                                    if (
                                        latestValue.match(/^\d+\.?\d{0,2}$/) ||
                                        !latestValue
                                    ) {
                                        setHeight(latestValue)
                                    }
                                }}
                                value={height}
                            ></TextInput>
                            <Text>cm</Text>
                        </Box>
                    )}
                </Box>

                <Box direction="column" margin={{ vertical: "medium" }}>
                    <Button
                        primary
                        disabled={!height}
                        label="Next Page"
                        size="medium"
                        fill={"horizontal"}
                        margin={{ bottom: "medium" }}
                        onClick={() => router.push("weight")}
                    />
                </Box>
            </Box>
        </HeightPageContainer>
    )
}

export default HeightPage

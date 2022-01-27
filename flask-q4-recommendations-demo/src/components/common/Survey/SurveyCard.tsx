import styled from "styled-components"
import { Box, BoxTypes, Text } from "grommet"
import React, { useState } from "react"

const Container = styled(Box)`
    overflow: hidden;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.18);
    border-radius: 0.5rem;
`

interface ISurveyCard extends BoxTypes {
    isSelected: Boolean
}

const SurveyCard: React.FC<ISurveyCard> = (props) => {
    const greenBorder = props.isSelected
        ? "0.15rem solid #75A55B"
        : "0.15rem solid transparent"

    return (
        <Container
            pad={{ vertical: "large", horizontal: "medium" }}
            style={{ border: greenBorder, boxSizing: "border-box" }}
            background="white"
            margin="0 0 2rem 0"
            {...props}
        >
            <Text size="large" weight="bold">
                {props.children}
            </Text>
        </Container>
    )
}

export default SurveyCard

import React from "react"
import { useRouter } from "next/router"
import { Box, Text } from "grommet"
import styled from "styled-components"

const MealPlannerContainer = styled(Box)`
    color: #263423;
    padding: 2rem;
    justify-content: center;
    border-radius: 0.5rem;
`

const style_tap_to_plan = {
    fontSize: "1rem",
}

const PlannerMeal = (props) => {
    const router = useRouter()

    return (
        <Box>
            <Text weight="bold" margin={{ bottom: "medium" }}>
                {props.mealName} • {props.mealTime}{" "}
            </Text>
            <MealPlannerContainer
                alignContent="center"
                style={{ background: props.children ? "#FFFFFF" : "#C4D4E4" }}
            >
                {
                    <Text
                        style={style_tap_to_plan}
                        textAlign="center"
                        onClick={() => {
                            router.push(`meal-selection/${props.mealName}`)
                        }}
                    >
                        Tap to plan
                    </Text>
                }
                {props.children}
            </MealPlannerContainer>
        </Box>
    )
}

export default PlannerMeal

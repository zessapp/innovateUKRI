import React, { FC, useState } from "react"
import { useRouter } from "next/router"
import {
    Box,
    TextInput,
    Heading,
    Button,
    Text,
    Grid,
    Image,
    RangeInput,
} from "grommet"
import styled from "styled-components"
import Card from "src/components/common/Card"
import { IAppContext, IRecipe, useUserContext } from "../AppContext"

export const portionIncrement = 0.25

export const nutrientMapping = {
    portion_multiplier: "Portions",
    carbohydrate: "Carbohydrate (g)",
    energy: "Energy (kcals)",
    fat: "Fat (g)",
    fibre: "Fibre (g)",
    mufa: "Mufa (g)",
    name: "Name (g)",
    omega_3: "Omega 3 (g)",
    omega_6: "Omega 6 (g)",
    potassium: "Potassium (mg)",
    protein: "Protein (g)",
    pufa: "Pufa (g)",
    salt: "Salt (g)",
    saturate: "Saturate (g)",
    score: "Score",
    sodium: "Sodium (mg)",
    sugar: "Sugar (g)",
    trans_fat: "Trans Fat (g)",
}

const omittedKeys = [
    "url",
    "name",
    "ingredients",
    "pufa",
    "portion_multiplier",
    "max_portion_multiplier",
    "score",
]

export const keyOrder = [
    "energy",
    "carbohydrate",
    "protein",
    "fat",
    "sugar",
    "fibre",
    "saturate",
    "mufa",
    "pufa",
    "omega_3",
    "omega_6",
    "trans_fat",
    "potassium",
    "sodium",
    "salt",
    "portion_multiplier",
    "max_portion_multiplier",
    "name",
    "score",
]

const MealPlannerItemContainer = styled(Card)`
    background: white;
`

const MealPlannerDataBlock = styled(Box)``

const MealPlannerDataLabel = styled(Text)`
    font-weight: bold;
    font-size: 0.8rem;
    color: #6f6f6f;
`

const PortionSliderLabel = styled(Text)`
    display: block;
    flex: 1;
`
const PortionInput = styled(TextInput)`
    width: 5rem;
    text-align: center;
`
const PortionInputContainer = styled(Box)`
    text-align: center;
`

interface IMealPlannerItem {
    meal: IRecipe
    mealType: string
}

const MealPlannerItem: FC<IMealPlannerItem> = (props) => {
    const router = useRouter()

    const userContext = useUserContext()

    const [portions, setPortions] = useState(props.meal.portion_multiplier)

    const meal = props.meal

    return (
        <MealPlannerItemContainer margin={{ bottom: "medium" }} pad="medium">
            <Text size="xlarge" weight="bold" margin={{ vertical: "medium" }}>
                {meal.name}
            </Text>
            <Image
                src={meal.url || ""}
                margin={{ vertical: "medium" }}
                style={{
                    maxWidth: "33vw",
                    borderRadius: "0.3rem",
                }}
                alignSelf="center"
            />

            <Grid rows={["auto"]} columns={["1/2", "1/2"]} gap="small">
                {keyOrder.map((key) => {
                    if (!omittedKeys.includes(key)) {
                        return (
                            <MealPlannerDataBlock>
                                <MealPlannerDataLabel>
                                    {nutrientMapping[key]}
                                </MealPlannerDataLabel>
                                <Text>
                                    {parseFloat(
                                        (portions * meal[key]).toFixed(2)
                                    )}
                                </Text>
                            </MealPlannerDataBlock>
                        )
                    }
                })}
            </Grid>
            <Heading>Ingredients</Heading>
            <Text>{meal.ingredients.join(",")}</Text>
            <Heading
                size="large"
                color="black"
                textAlign="center"
                margin={{ top: "medium" }}
            >
                Portions
            </Heading>
            <PortionInputContainer alignContent="center">
                <PortionInput
                    placeholder="0"
                    onChange={(e) => {
                        const latestValue = parseFloat(e.target.value)
                        if(latestValue <= 50 && latestValue >= portionIncrement){
                            setPortions(latestValue)
                        }
                        
                    }}
                    value={portions}
                ></PortionInput>
            </PortionInputContainer>

            <Box>
                <Box direction="row" fill="horizontal">
                    <PortionSliderLabel alignSelf="start">
                        {portionIncrement}
                    </PortionSliderLabel>
                    <PortionSliderLabel alignSelf="end" textAlign="end">
                        {1 * meal.max_portion_multiplier}
                    </PortionSliderLabel>
                </Box>

                <RangeInput
                    min={portionIncrement}
                    max={1 * meal.max_portion_multiplier}
                    value={portions}
                    onChange={(e) => {
                        const latestValue = e.target.value || null

                        setPortions(parseFloat(latestValue))
                    }}
                    step={portionIncrement}
                />
            </Box>

            <Box direction="column" margin={{ vertical: "medium" }}>
                <Button
                    primary
                    label="Select"
                    size="medium"
                    fill={"horizontal"}
                    margin={{ bottom: "medium" }}
                    onClick={() => {
                        console.log("clicked", meal)
                        if (meal) {
                            userContext.setUserData({
                                ...userContext.userData,
                                mealPlanner: {
                                    ...userContext.userData.mealPlanner,
                                    [props.mealType]: {
                                        meal: [
                                            ...userContext.userData.mealPlanner[
                                                props.mealType
                                            ].meal,
                                            {
                                                ...meal,
                                                portion_selected: portions,
                                            },
                                        ],
                                    },
                                },
                            })
                            console.log("userContext", userContext)
                            router.push("/meal-planner")
                        }
                    }}
                />
            </Box>
        </MealPlannerItemContainer>
    )
}

export default MealPlannerItem

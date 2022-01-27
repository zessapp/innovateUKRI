import styled from "styled-components"
import { FC, useState } from "react"
import { Box, BoxTypes, Text } from "grommet"

const PillContainer = styled(Box)`
    border-radius: 2rem;
    width: fit-content;
    span:not(:last-child) {
        border-right: 1px solid #000;
    }
`

const PillLabel = styled(Text)`
    font-weight: 800;
    padding: 1rem 1rem 1rem 1rem;
`

type PillCallback = (label: string) => unknown

interface IPillProps extends BoxTypes {
    labels: string[]
    callback: PillCallback
    selection?: boolean
}

const Pill: FC<IPillProps> = (props) => {
    const [currentSelection, setCurrentSelection] = useState(null)
    return (
        <PillContainer
            direction="row"
            pad={{ horizontal: "0.5rem" }}
            margin={{ bottom: "medium" }}
            border={{ size: "0.25rem" }}
            alignSelf="end"
            {...props}
        >
            {props.labels.map((label, index) => {
                return (
                    <PillLabel
                        onClick={() => {
                            setCurrentSelection(index)
                            props.callback(label)
                        }}
                        style={{
                            color:
                                currentSelection === index
                                    ? "#26a956"
                                    : "#11190F",
                        }}
                    >
                        {label}
                    </PillLabel>
                )
            })}
        </PillContainer>
    )
}

export default Pill

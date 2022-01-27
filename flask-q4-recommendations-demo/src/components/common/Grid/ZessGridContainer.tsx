import { FC } from "react"
import { Box } from "grommet"
import { ZessGridBreakpointColumns } from "./ZessGridContext"
import styled from "styled-components"

interface IZessGridContainer extends React.ComponentProps<typeof Box> {
    positions: ZessGridBreakpointColumns
}

function getGridColumnValues(positions: ZessGridBreakpointColumns) {
    const gridColumnValues: {
        // eslint-disable-next-line no-unused-vars
        [keys in keyof ZessGridBreakpointColumns]: string
    } = {
        small: "",
        medium: "",
        large: "",
        xlarge: "",
    }

    Object.keys(positions).forEach((value: keyof ZessGridBreakpointColumns) => {
        gridColumnValues[
            value
        ] = `${positions[value].start} / ${positions[value].end}`
    })
    return gridColumnValues
}

const InnerContainer = styled<FC<IZessGridContainer>>(Box)`
    height: auto;
    grid-column: ${(props) => getGridColumnValues(props.positions).small};

    @media only screen and (min-width: ${(props) =>
            props.theme.global.breakpoints.small.value + 1}px) {
        grid-column: ${(props) => getGridColumnValues(props.positions).medium};
    }

    @media only screen and (min-width: ${(props) =>
            props.theme.global.breakpoints.medium.value + 1}px) {
        grid-column: ${(props) => getGridColumnValues(props.positions).large};
    }
`

const ZessGridContainer: FC<IZessGridContainer> = (props) => {
    // const size = useContext(ResponsiveContext)
    // const collumns = useContext(ZessGridContext)

    return (
        <InnerContainer responsive={false} {...props} height="fit-content">
            {props.children}
        </InnerContainer>
    )
}

export default ZessGridContainer

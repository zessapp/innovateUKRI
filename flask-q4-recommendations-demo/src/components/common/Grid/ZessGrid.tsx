import { Box, BoxTypes } from "grommet"
import { FC } from "react"
import { generateZessGridBreakpoints } from "src/utilities/theme"
import styled from "styled-components"
import { zessGridColumns } from "./ZessGridContext"

interface IZessGrid extends BoxTypes {}

const ZessLayoutGrid = styled(Box)`
    display: grid;
    grid-column-gap: 0px;
    grid-auto-rows: minmax(2rem, auto);
    width: 100vw;
    height: auto;

    ${(props) => {
        return generateZessGridBreakpoints<IZessGrid>(props, zessGridColumns)
    }}
`

const ZessGrid: FC<IZessGrid> = (props) => {
    return (
        <ZessLayoutGrid responsive={false} {...props}>
            {props.children}
        </ZessLayoutGrid>
    )
}

export default ZessGrid

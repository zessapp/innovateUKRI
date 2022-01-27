import { ComponentProps, FC } from "react"
import { Box } from "grommet"
import styled from "styled-components"
import {
    BreakpointObject,
    generateZessResponsiveGridBreakpoints,
} from "src/utilities/theme"

export type ResponsiveGridType = {
    rows: string[]
    columns: string[]
    areas: string
    gridGap?: string
    columnGap?: string
    rowGap?: string
}

export interface ResponsiveGridProps extends ComponentProps<typeof Box> {
    responsiveGrid: BreakpointObject<{
        small: ResponsiveGridType
        medium: ResponsiveGridType
        large: ResponsiveGridType
        xlarge: ResponsiveGridType
    }>
}

const ResponsiveGrid = styled<FC<ResponsiveGridProps>>(Box)`
    display: grid;
    width: 100%;
    height: auto;
    ${(props) => {
        return generateZessResponsiveGridBreakpoints(props)
    }}
`

const ZessResponsiveGrid: FC<ResponsiveGridProps> = (props) => {
    return (
        <ResponsiveGrid responsive={false} {...props}>
            {props.children}
        </ResponsiveGrid>
    )
}

export default ZessResponsiveGrid

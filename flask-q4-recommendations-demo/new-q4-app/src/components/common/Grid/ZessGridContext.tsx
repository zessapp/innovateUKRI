import { createContext, FC } from "react"
import { BoxTypes } from "grommet"

interface IZessGridContainer extends BoxTypes {}

export type ZessGridBreakpointType = {
    small:
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | number
    medium:
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | number
    large:
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22
        | 23
        | 24
        | 25
        | number
    xlarge:
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22
        | 23
        | 24
        | 25
        | number
}

export const zessGridColumns: ZessGridBreakpointType = {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 24,
}

export interface ZessGridPosition<T> {
    start: T
    end: T
}

export type ZessGridBreakpointColumns = {
    [P in keyof ZessGridBreakpointType]: ZessGridPosition<
        ZessGridBreakpointType[P]
    >
}

export const ZessGridContext = createContext<ZessGridBreakpointType>(
    zessGridColumns
)

const ZessGridProvider: FC<IZessGridContainer> = (props) => {
    return (
        <ZessGridContext.Provider
            value={{
                small: 16,
                medium: 20,
                large: 24,
                xlarge: 24,
            }}
        >
            {props.children}
        </ZessGridContext.Provider>
    )
}

export default ZessGridProvider

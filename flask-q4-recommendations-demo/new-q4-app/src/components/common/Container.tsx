import { Box, BoxProps } from "grommet"
import styled from "styled-components"
import { getEdgeStyleValue } from "../../utilities/theme"

const MainContainer = styled(Box)`
    ${(props) =>
        `@media (max-width: ${
            1600 + 2 * getEdgeStyleValue(props.theme.global.edgeSize.medium)
        }px) {
            padding: 0 48px;
        }`}
    min-height: fit-content;
`

const Container: React.FC<BoxProps> = (props) => (
    <MainContainer
        width={{ max: props.width ? props.width : "1600px" }}
        alignSelf="center"
        fill={true}
        {...props}
    >
        {props.children}
    </MainContainer>
)

export default Container

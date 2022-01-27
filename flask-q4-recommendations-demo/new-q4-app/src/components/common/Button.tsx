import {
    Button as GrommetButton,
    ButtonType as GrommetButtonType,
    ResponsiveContext,
} from "grommet"
import { FC, useContext } from "react"
import styled from "styled-components"

const StyledButton = styled(GrommetButton)`
    transition: all 0.5s;
    width: 100%;
    -webkit-align-self: auto;
    -ms-flex-item-align: auto;
    align-self: auto;

    ${(props) => `
        @media (min-width: ${props.theme.global.breakpoints.small.value}px) {
            -webkit-align-self: ${
                props.alignSelf === "center" ? "center" : "auto"
            };
            -ms-flex-item-align: ${
                props.alignSelf === "center" ? "center" : "auto"
            };
            align-self: ${props.alignSelf === "center" ? "center" : "auto"};
        }
`}

    &:hover {
        transition: all 0.1s;
    }
`

interface IButton extends GrommetButtonType {
    fillMobile?: boolean
}

const Button: FC<IButton> = (props) => {
    const fillMobile = !!(props.fillMobile === undefined || props.fillMobile)
    const size = useContext(ResponsiveContext)

    return (
        <StyledButton
            size="medium"
            hoverIndicator={false}
            style={{
                width:
                    (fillMobile && size === "small") || props.fill
                        ? props.fill
                            ? "initial"
                            : "100%"
                        : "fit-content",
            }}
            {...props}
        />
    )
}

export default Button

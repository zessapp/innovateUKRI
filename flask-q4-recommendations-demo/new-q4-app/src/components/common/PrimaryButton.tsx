import { Button } from "grommet"
import styled from "styled-components"

const CtaButton = styled(Button)`
    webkit-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.16);
    /*background-image: linear-gradient(to right, #43C272 0%, #26A956 100%);*/
    transition: all 0.5s;
    width: "100%";
    min-width: none;
    -webkit-align-self: auto;
    -ms-flex-item-align: auto;
    align-self: auto;

    ${(props) => `
        @media (min-width: ${props.theme.global.breakpoints.small.value}px) {
            width: ${props.fill === "horizontal" ? "100%" : "fit-content"};
            min-width: ${props.fill === "horizontal" ? "auto" : "328px"};
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
        transition: all 0.5s;
        webkit-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.25);
        -moz-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.25);
        box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.25);
        /*background-position: right center;
    background-image: linear-gradient(to right, #3AA562 0%, #1E8845 100%);*/
    }
`

interface IPrimaryButtonProps extends React.FC {
    newProp: string
}

const PrimaryButton: typeof Button | IPrimaryButtonProps = (props) => {
    return <CtaButton size="medium" hoverIndicator={false} {...props} />
}

export default PrimaryButton

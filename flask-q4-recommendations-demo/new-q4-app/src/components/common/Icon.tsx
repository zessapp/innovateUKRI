import { Box, BoxTypes } from "grommet"
import React from "react"
import styled from "styled-components"
import { Icons } from "../../utilities/theme"
import { attachEventProps } from "@aws-amplify/ui-react/lib-esm/react-component-lib/utils"

const StyledIcon = styled(Box)`
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
`

interface IIcon extends BoxTypes {
    icon: string
}

const Icon: React.FC<IIcon> = (props) => (
    <StyledIcon
        background={props.color ? props.color : "black"}
        height={props.height ? props.height : "10px"}
        width={props.width ? props.width : "10px"}
        style={{
            maskImage: `url(${Icons[props.icon]})`,
            WebkitMaskImage: `url(${Icons[props.icon]})`,
            ...props.style,
        }}
    ></StyledIcon>
)

export default Icon

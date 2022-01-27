import { Box, Image, ImageProps } from "grommet"
import styled from "styled-components"
import zessLogoWhite from "public/assets/images/zesslogo-white.svg"
import zessLogoLime from "public/assets/images/zesslogo-lime.svg"
import zessLogoGreen from "public/assets/images/zesslogo-green.svg"

const LogoImage = styled(Image)`
    width: 5rem;
    cursor: pointer;
`
export enum zessLogoStyles {
    WHITE,
    LIME,
    GREEN,
}

function getZessLogo(logoStyle?: zessLogoStyles) {
    switch (logoStyle) {
        case zessLogoStyles.WHITE:
            // code block
            return zessLogoWhite
        case zessLogoStyles.LIME:
            // code block
            return zessLogoLime
        case zessLogoStyles.GREEN:
            // code block
            return zessLogoGreen
        default:
            return zessLogoWhite
    }
}

interface ILogo extends ImageProps {
    zessLogo: zessLogoStyles
}

const Logo: React.FC<ILogo> = (props) => {
    return <LogoImage src={getZessLogo(props.zessLogo)} margin={{}} />
}

export default Logo

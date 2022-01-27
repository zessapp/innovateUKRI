import { Header as GrommetHeader, Image, BoxTypes, Box } from "grommet"
import zessLogoWhite from "public/assets/images/zesslogo-white.svg"
import zessLogoLime from "public/assets/images/zesslogo-lime.svg"
import zessLogoGreen from "public/assets/images/zesslogo-green.svg"
import zessLogoYellow from "public/assets/images/zesslogo-yellow.svg"
import styled from "styled-components"
import { FC, useContext } from "react"
import { LayoutContext } from "./GrommetLayout"
import Link from "next/link"

export const headerHeight = {
    small: "6.25vw",
    large: "6.25vw",
}

export enum HeaderStyleValues {
    tansparent,
    solid,
}

export enum zessLogoStyles {
    WHITE,
    LIME,
    GREEN,
    YELLOW,
}

interface IHeaderProps extends BoxTypes {
    headerStyle?: HeaderStyleValues
}

const HeaderContainer = styled<FC<IHeaderProps>>(GrommetHeader)`
    position: ${(props) =>
        props.headerStyle === HeaderStyleValues.tansparent
            ? "absolute"
            : "initial"};
    width: 100%;
    min-height: 88px;
    max-height: 240px;
    grid-area: header;
    z-index: 20;
`

const InnerContainer = styled(Box)`
    background: transparent;
    width: 100%;
    padding: 1rem 2rem;
`
const Logo = styled(Image)`
    height: 1.1rem;
    cursor: pointer;
`

function getZessLogo(logoStyle?: zessLogoStyles) {
    switch (logoStyle) {
        case zessLogoStyles.WHITE:
            return zessLogoWhite
        case zessLogoStyles.LIME:
            return zessLogoLime
        case zessLogoStyles.GREEN:
            return zessLogoGreen
        case zessLogoStyles.YELLOW:
            return zessLogoYellow
        default:
            return zessLogoWhite
    }
}

const Header: FC<IHeaderProps> = (props) => {
    const layout = useContext(LayoutContext)

    return (
        <HeaderContainer
            headerStyle={layout.headerStyle}
            pad={{ vertical: "0px", horizontal: "0px" }}
            justify="center"
        >
            <InnerContainer
                alignSelf="center"
                gridArea="header"
                direction="row"
            >
                <Link href="/">
                    <Logo
                        src={getZessLogo(layout.zessLogo)}
                        margin={{}}
                        alignSelf="center"
                    />
                </Link>
                <Box align="end" justify="end" flex={true}>
                    {layout.headerContent}
                </Box>
            </InnerContainer>
        </HeaderContainer>
    )
}

Header.defaultProps = {
    headerStyle: HeaderStyleValues.solid,
    justify: "center",
}

export default Header

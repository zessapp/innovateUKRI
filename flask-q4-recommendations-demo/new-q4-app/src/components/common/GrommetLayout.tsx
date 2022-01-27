import { Grommet, Box } from "grommet"
import theme, { colours } from "../../../config/theme"
import Layout from "./Layout"
import AppLayout from "../pages/app/AppLayout"
import { HeaderStyleValues, zessLogoStyles } from "./Header"
import {
    createContext,
    ReactElement,
    ReactNode,
    ComponentType,
    FC,
} from "react"
import CookieBanner from "./CookieBanner"
import ZessGridContext from "./Grid/ZessGridContext"
import { createGlobalStyle } from "styled-components"

export enum LayoutStyle {
    AppLayout,
    Layout,
}

interface IGrommetLayoutProps {
    headerStyle?: HeaderStyleValues
    headerContent?: ReactElement
    zessLogo?: zessLogoStyles
    layoutStyle?: LayoutStyle
    background?: string
}

function renderLayout(children: ReactNode, layout?: LayoutStyle) {
    let SelectedLayout: ComponentType

    switch (layout) {
        case LayoutStyle.AppLayout:
            SelectedLayout = AppLayout
            break
        case LayoutStyle.Layout:
            SelectedLayout = Layout
            break
        default:
            SelectedLayout = Layout
            break
    }

    return <SelectedLayout>{children}</SelectedLayout>
}

// This is the default values when creating the context
export const LayoutContext = createContext<IGrommetLayoutProps>({
    headerStyle: HeaderStyleValues.solid,
})

export const GlobalBackgroundStyle = createGlobalStyle<{
    backgroundColor: string
}>`
  body {
    background-color: ${(props) => props.backgroundColor};
  }
`

const GrommetLayout: FC<IGrommetLayoutProps> = (props) => {
    return (
        <Grommet
            theme={theme}
            background={props.background || "zessWhite"}
            style={{ position: "relative", zIndex: 0 }}
            full={true}
        >
            <GlobalBackgroundStyle
                backgroundColor={colours[props.background]}
            />
            <Box fill={true}>
                <CookieBanner />
                <ZessGridContext>
                    <LayoutContext.Provider
                        value={{
                            headerStyle: props.headerStyle,
                            headerContent: props.headerContent,
                            zessLogo: props.zessLogo,
                            background: props.background,
                        }}
                    >
                        {renderLayout(props.children, props.layoutStyle)}
                    </LayoutContext.Provider>
                </ZessGridContext>
            </Box>
        </Grommet>
    )
}

export default GrommetLayout

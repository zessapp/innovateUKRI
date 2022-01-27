import { Grid, Box, ResponsiveContext, Anchor } from "grommet"
import Header, { headerHeight } from "../../common/Header"
import { useContext, Fragment } from "react"
import ZessFooter from "../../common/ZessFooter"
import styled from "styled-components"
import Logo, { zessLogoStyles } from "../../common/Logo"
import SidebarContent from "./SidebarContent"
import Icon from "../../common/Icon"

const Sidebar = styled(Box)`
    /*width:20vw;*/
    align-content: flex-start;
`

const AppLayout: React.FC = (props) => {
    const currentHeaderHeight =
        useContext(ResponsiveContext) === "small"
            ? headerHeight.small
            : headerHeight.large
    return (
        <Grid
            rows={["flex"]}
            columns={["auto", "flex"]}
            gap="none"
            areas={[
                { name: "sidebar", start: [0, 0], end: [0, 0] },
                { name: "main", start: [1, 0], end: [1, 0] },
            ]}
            style={{ minHeight: "max-content", flex: 1 }}
        >
            <Sidebar gridArea="sidebar" border="right" background="deepGreen2">
                <Box pad={{ vertical: "large", left: "2rem", right: "4rem" }}>
                    <Box alignContent="start">
                        <Logo zessLogo={zessLogoStyles.WHITE} />
                    </Box>
                    <Box margin={{ top: "3rem" }} height="100%">
                        <SidebarContent />
                    </Box>
                </Box>
                <Box flex="grow" direction="row">
                    <Box
                        pad={{ vertical: "1.25rem" }}
                        alignSelf="end"
                        direction="row"
                        width="100%"
                        justify="center"
                        border={{ side: "top", color: "brandGrey5" }}
                    >
                        <Icon
                            color="white"
                            icon="settings"
                            height="1.4rem"
                            width="1.4rem"
                        />
                        <Anchor
                            label="Settings"
                            href="#"
                            size="medium"
                            color="white"
                            margin={{ left: "1rem" }}
                            style={{
                                position: "relative",
                                top: "0.17rem",
                                fontWeight: 500,
                            }}
                        />
                    </Box>
                </Box>
            </Sidebar>
            <Box
                gridArea="main"
                pad={{ vertical: "medium", horizontal: "4rem" }}
                fill={true}
                margin={{
                    top: "0",
                }}
                background="#FEFFFB"
            >
                {props.children}
            </Box>
        </Grid>
    )
}

export default AppLayout

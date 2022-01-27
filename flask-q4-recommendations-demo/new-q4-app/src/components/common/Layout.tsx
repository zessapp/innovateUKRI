import { Grid, Box, ResponsiveContext } from "grommet"
import Header, { headerHeight } from "./Header"
import { FC, useContext } from "react"
import ZessFooter from "./ZessFooter"

const Layout: FC = (props) => {
    const currentHeaderHeight =
        useContext(ResponsiveContext) === "small"
            ? headerHeight.small
            : headerHeight.large
    return (
        <Grid
            rows={["auto", "auto", "auto"]}
            columns={["auto", "flex"]}
            gap="none"
            areas={[
                { name: "header", start: [0, 0], end: [1, 0] },
                { name: "main", start: [0, 1], end: [1, 1] },
                { name: "footer", start: [0, 2], end: [1, 2] },
            ]}
        >
            <Header height={currentHeaderHeight} justify="start" />
            <Box
                gridArea="main"
                margin={{
                    top: "0",
                }}
            >
                {props.children}
            </Box>
            <Box
                gridArea="footer"
                margin={{
                    top: "0",
                }}
            >

            </Box>
        </Grid>
    )
}

export default Layout

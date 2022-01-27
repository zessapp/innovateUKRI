import { Box, BoxProps, Nav, Anchor } from "grommet"
import { FC } from "react"
import Icon from "../../common/Icon"
import Link from "next/link"

interface ISidebarContent extends BoxProps {}

interface SidebarLinks {
    name: string
    icon: string
    iconWidth: string
    iconHeight: string
    iconOffsetTop: string
    iconOffsetLeft: string
    anchorOffsetTop: string
    href: string
}

const navLinks: SidebarLinks[] = [
    {
        name: "Projects",
        icon: "home",
        iconWidth: "1.1rem",
        iconHeight: "1.1rem",
        iconOffsetTop: "0rem",
        iconOffsetLeft: "-0.3rem",
        anchorOffsetTop: "-0.15rem",
        href: "/",
    },
    {
        name: "Admin",
        icon: "settings",
        iconWidth: "1.1rem",
        iconHeight: "1.1rem",
        iconOffsetTop: "0rem",
        iconOffsetLeft: "-0.3rem",
        anchorOffsetTop: "-0.15rem",
        href: "/admin",
    },
]

// <Image src={Icons[link.icon]} style={{ fill: "red" }} />

/*
    TODO - Highlight the right menu items based on the route.
    We need to create a map between the route names and the links in the sidebar to set the correct ones to selected
*/

const SidebarContent: FC<ISidebarContent> = () => (
    <Nav direction="column" gap="1.75rem">
        {navLinks.map((link, index) => (
            <Box key={`sidebar-${index}`}>
                <Box direction="row" style={{ width: "7rem" }}>
                    <Box width="2rem" margin={{ right: "0rem" }}>
                        <Box height="auto" alignSelf="center">
                            <Icon
                                color="white"
                                icon={link.icon}
                                height={link.iconWidth}
                                width={link.iconHeight}
                                style={{
                                    position: "relative",
                                    top: link.iconOffsetTop,
                                    left: link.iconOffsetLeft,
                                }}
                            />
                        </Box>
                    </Box>
                    <Box
                        height="1.5rem"
                        justify="center"
                        direction="row"
                        alignSelf="center"
                        align="center"
                    >
                        <Link href={link.href}>
                            <Anchor
                                label={link.name}
                                size="medium"
                                color="white"
                                alignSelf="start"
                                style={{
                                    position: "relative",
                                    top: link.anchorOffsetTop,
                                    fontWeight: 500,
                                }}
                            />
                        </Link>
                    </Box>
                </Box>
            </Box>
        ))}
    </Nav>
)

export default SidebarContent

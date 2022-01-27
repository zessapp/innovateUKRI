import styled from "styled-components"
import { Box, Text, Anchor } from "grommet"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { colours } from "../../../config/theme"
import { useState, useEffect } from "react"
import { parseCookies, setCookie } from "nookies"

const CookieContainer = styled(Box)``

const CookieOuterContainer = styled(Box)`
    position: fixed;
    min-height: fit-content;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1000;
`

const cookieFlag = "cookiesAccepted"

const CookieBanner: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false)

    // If cookie not set, show the cookie banner
    useEffect(() => {
        if (!(cookieFlag in parseCookies())) {
            setShowBanner(true)
        }
    }, [])

    return (
        <CookieOuterContainer>
            {showBanner && (
                <CookieContainer
                    responsive={false}
                    pad="xsmall"
                    direction="row"
                    background={colours.brandGrey1}
                >
                    <Box
                        alignSelf="start"
                        style={{ alignSelf: "center", padding: "1rem" }}
                    >
                        <Text color="brandGrey5" size="xsmall">
                            We use cookies to personalise your experience, along
                            with analytics and advertising. Using Zess’s
                            services means you agree to our use of cookies as
                            described in our{" "}
                            <Link href="/cookie-policy" passHref>
                                <Anchor
                                    size="xxsmall"
                                    color={colours.brandGrey6}
                                >
                                    Cookie Policy
                                </Anchor>
                            </Link>
                            .
                        </Text>
                    </Box>
                    <Box
                        alignSelf="end"
                        pad="medium"
                        margin={{ left: "auto" }}
                        style={{ alignSelf: "center", padding: "1rem" }}
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                            onClick={() => {
                                // Set the accepted cookie
                                setCookie({}, cookieFlag, "true", {
                                    sameSite: "strict",
                                    secure: false,
                                })
                                setShowBanner(false)
                            }}
                        />
                    </Box>
                </CookieContainer>
            )}
        </CookieOuterContainer>
    )
}

export default CookieBanner

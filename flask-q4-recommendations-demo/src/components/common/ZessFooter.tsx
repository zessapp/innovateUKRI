import { Box, Text, Anchor } from "grommet"
import Container from "./Container"
import { colours } from "../../../config/theme"
import Link from "next/link"

const ZessFooter: React.FC = () => {
    return (
        <Box>
            <Container margin={{ vertical: "large" }}>
                <Text
                    alignSelf="center"
                    margin={{ bottom: "small" }}
                    textAlign="center"
                >
                    Zess, Unit B3, Basepoint Business Centre, Luton, LU2 8DL
                </Text>
                <Anchor
                    alignSelf="center"
                    href="mailto:info@zess.co"
                    color="zessYellow"
                    margin={{ bottom: "small" }}
                >
                    info@zess.co
                </Anchor>
                <Text alignSelf="center" textAlign="center">
                    <Link href="/privacy-policy" passHref>
                        <Anchor color={colours.brandGrey5}>
                            Privacy Policy
                        </Anchor>
                    </Link>
                    <br />
                    Copyright© Zess 2020
                </Text>
            </Container>
        </Box>
    )
}

export default ZessFooter

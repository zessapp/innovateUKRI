import { Box, Heading } from "grommet"
import { FC } from "react"
import Button from "../common/Button"
import AppPageHeader from "./app/AppPageHeader"
import { useRouter } from "next/router"
import Image from "next/image"
import styled from "styled-components"

// import ZessTile from "public/assets/images/zess-tile.png"

interface IIndexProps {}

const HeroImage = styled(Image)`
    display: none;
`

const Index: FC<IIndexProps> = () => {
    const router = useRouter()

    return (
        <Box direction="column" pad="large">
            <Heading
                size="superlarge"
                color="black"
                margin={{ vertical: "medium" }}
                textAlign="center"
            >
                Eat Smarter, Live Better
            </Heading>
            <Box style={{ height: "70vh" }}>
                <HeroImage
                    src="/assets/images/zess-tile.png"
                    width={1430}
                    height={2144}
                    objectFit="none"
                    objectPosition="top"
                />
            </Box>

            <Box direction="column" margin={{ vertical: "medium" }}>
                <Button
                    primary
                    label="Get Started"
                    size="medium"
                    fill={"horizontal"}
                    margin={{ bottom: "medium" }}
                    onClick={() => router.push("activity")}
                />
            </Box>
        </Box>
    )
}

export default Index

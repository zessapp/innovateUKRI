import { Box, Heading, Anchor } from "grommet"
import { useRouter } from "next/router"
import Button from "../../common/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FC } from "react"

interface IAppPageHeaderProps {
    heading: string
    button?: {
        title: string
        href: string
    }
    backButton?: {
        title: string
        href: string
    }
}

const AppPageHeader: FC<IAppPageHeaderProps> = (props) => {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(props.button.href)
    }

    const handleBack = (e) => {
        e.preventDefault()
        router.push(props.backButton.href)
    }

    return (
        <Box>
            {props.backButton && (
                <Box>
                    <Anchor
                        icon={<FontAwesomeIcon icon={faChevronLeft} />}
                        onClick={handleBack}
                        color="brandGrey3"
                        size="medium"
                        label={props.backButton.title}
                        margin={{ top: "small" }}
                    ></Anchor>
                </Box>
            )}
            <Box direction="row" margin={{ vertical: "medium" }}>
                <Heading size="superlarge" color="black" margin="0">
                    {props.heading}
                </Heading>
                <Box flex={{ grow: 1 }} align="end" justify="center">
                    {props.button && (
                        <Button
                            onClick={handleClick}
                            label={props.button.title}
                            primary={true}
                            size="small"
                            style={{ fontWeight: 500 }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default AppPageHeader

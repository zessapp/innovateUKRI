import { Box, Heading } from "grommet"
import { FC } from "react"

import FlagIssueForm from "./FlagIssueForm"

interface IFlagIssueModalContentProps {}

const FlagIssueModalContent: FC<IFlagIssueModalContentProps> = () => {
    return (
        <>
            <Box direction="row" flex="grow">
                <Heading size="xxlarge" style={{ flex: 1 }}>
                    Flag Issue
                </Heading>
            </Box>
            <FlagIssueForm />
        </>
    )
}

export default FlagIssueModalContent

import { Box } from "grommet"
import { FC } from "react"
import ReactNlpAnnotate from "./ReactNlpAnnotate"

interface IProjectsProps {}

const NerAnnotationTaskModule: FC<IProjectsProps> = () => {
    return (
        <Box
            direction="row"
            background="brandGrey7"
            pad="medium"
            round="0.5rem"
            flex="grow"
        >
            {/* <UniversalDataAnnotationTask /> */}
            <ReactNlpAnnotate />
        </Box>
    )
}

export default NerAnnotationTaskModule

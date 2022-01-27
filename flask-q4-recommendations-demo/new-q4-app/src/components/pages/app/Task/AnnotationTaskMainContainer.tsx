import { Box } from "grommet"
import { FC, Fragment, useContext } from "react"
import NerAnnotationTaskModule from "./NerAnnotationTask"
import AnnotationTaskActions from "./AnnotationTaskActions"
import { ProjectMachineContext } from "src/machines/project"
import { AnnotationTaskType } from "src/API"
import AllergyAnnotationTool from "./AllergyAnnotation"

interface IProjectsProps {}

const AnnotationTaskMainContainer: FC<IProjectsProps> = () => {
    const machineContext = useContext(ProjectMachineContext)
    const project = machineContext.machine.context?.project
    const taskType = project.task_type

    let TaskComponent

    if (taskType === AnnotationTaskType.NER) {
        TaskComponent = NerAnnotationTaskModule
    } else if (taskType === AnnotationTaskType.ALLERGIES) {
        TaskComponent = AllergyAnnotationTool
    }

    return (
        <Box
            direction="row"
            background="brandGrey7"
            pad="medium"
            round="0.5rem"
        >
            <TaskComponent />
            <AnnotationTaskActions />
        </Box>
    )
}

export default AnnotationTaskMainContainer

import { Box } from "grommet"
import { FC, useContext } from "react"
import Button from "../../../common/Button"
import { ModalMachineContext } from "src/machines/modalMachine"
import { ProjectMachineContext } from "src/machines/project"
import { AnnotationTaskStatus, ModelNerAnnotationTaskConnection } from "src/API"
import styled from "styled-components"
import { TaskTypeToTaskKeyMapping } from "src/machines/project/utils"

interface IProjectsProps {}

const ActionButton = styled(Button)`
    width: 8rem !important;
`

const AnnotationTaskActions: FC<IProjectsProps> = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, modalSend, service] = useContext(ModalMachineContext)

    const machineContext = useContext(ProjectMachineContext)
    const currentIndex = machineContext.machine.context.currentTaskIndex

    const project = machineContext.machine.context.project

    const taskCollectionKey = TaskTypeToTaskKeyMapping[
        project?.task_type
    ] as "ner_tasks"

    const tasks = machineContext.machine.context.project?.[taskCollectionKey]

    const currentTask = tasks.items[currentIndex]

    const hasAnnotations =
        Array.isArray(currentTask?.sample?.annotations) &&
        currentTask?.sample?.annotations.length !== 0

    return (
        <Box
            direction="column"
            pad="medium"
            round="0.5rem"
            margin={{ bottom: "medium" }}
            align="end"
        >
            <ActionButton
                primary
                label="Fail"
                size="medium"
                color="#C32424"
                fill={"horizontal"}
                onClick={() => {
                    modalSend("OPEN")
                }}
                margin={{ bottom: "medium" }}
            />
            <ActionButton
                primary
                label="Complete"
                size="medium"
                disabled={!hasAnnotations}
                fill={"horizontal"}
                onClick={() => {
                    console.log("Complete")
                    machineContext.send({
                        type: "UPDATE_TASK",
                        index: currentIndex,
                        input: {
                            task_id: currentTask.id,
                            project_id:
                                machineContext.machine.context.project.id,
                            type: AnnotationTaskStatus.DONE,
                        },
                    })
                }}
            />
        </Box>
    )
}

export default AnnotationTaskActions

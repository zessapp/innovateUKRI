import { Box, Text } from "grommet"
import { FC, useContext } from "react"
import { AnnotationTaskStatus } from "../../../../API"
import styled from "styled-components"
import { ProjectMachineContext } from "src/machines/project"
import { TaskTypeToTaskKeyMapping } from "src/machines/project/utils"

interface IProjectsProps {}

const TaskStatusLabel = styled(Text)``
const TaskStatusContainer = styled(Box)``

const statusDisplayMapping = {
    [AnnotationTaskStatus.TODO]: {
        displayName: "To-do",
        backgroundColor: "#E9EFF5",
        color: "#6B92BB",
    },
    [AnnotationTaskStatus.FAILED]: {
        displayName: "Failed",
        backgroundColor: "#F3D7D9",
        color: "#CF6F73",
    },
    [AnnotationTaskStatus.DONE]: {
        displayName: "Done",
        backgroundColor: "#EAF1E6",
        color: "#75A55B",
    },
}

const TaskStatus: FC<IProjectsProps> = () => {
    const machineContext = useContext(ProjectMachineContext)
    const currentIndex = machineContext.machine.context.currentTaskIndex

    const project = machineContext.machine.context.project

    console.log("THEY KEY project", project)

    const taskCollectionKey = TaskTypeToTaskKeyMapping[
        project?.task_type
    ] as "ner_tasks"

    const tasks = machineContext.machine.context.project?.[taskCollectionKey]

    console.log("THEY KEY TASKS", tasks)

    const currentTask = tasks.items[currentIndex]

    console.log("THEY CURRENT TASK", currentTask)

    const currentStatus = statusDisplayMapping[currentTask.status].displayName

    return (
        <Box direction="row">
            <TaskStatusContainer
                key={currentStatus}
                round="0.5rem"
                pad={{ vertical: "small", horizontal: "medium" }}
                background={
                    statusDisplayMapping[currentTask.status].backgroundColor
                }
            >
                <TaskStatusLabel
                    key={currentStatus}
                    size="small"
                    color={statusDisplayMapping[currentTask.status].color}
                    weight="bold"
                >
                    {statusDisplayMapping[currentTask.status].displayName}
                </TaskStatusLabel>
            </TaskStatusContainer>
        </Box>
    )
}

export default TaskStatus

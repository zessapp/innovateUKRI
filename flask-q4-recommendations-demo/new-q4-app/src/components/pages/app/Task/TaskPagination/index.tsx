import { Box } from "grommet"
import { FC, useContext } from "react"
import Button from "../../../../common/Button"
import styled from "styled-components"
import { ProjectMachineContext } from "src/machines/project"

interface IProjectsProps {}

const TaskPaginationContainer = styled(Box)``

const PaginationButton = styled(Button)`
    :disabled {
        color: black;
    }
`

const TaskPagination: FC<IProjectsProps> = () => {
    const machineContext = useContext(ProjectMachineContext)
    const currentIndex = machineContext.machine.context.currentTaskIndex

    const currentItem = currentIndex + 1

    const isLatestTask =
        machineContext.machine.context.project.tasks_completed + 1

    const totalTasks = machineContext.machine.context.project.total_tasks

    return (
        <TaskPaginationContainer
            direction="row"
            justify="end"
            margin={{ bottom: "medium" }}
        >
            <PaginationButton
                label="ᐊ"
                size="small"
                color="#F2F3F2"
                disabled={currentIndex === 0}
                onClick={() => {
                    machineContext.send({
                        type: "GO_TO_TASK",
                        index: currentIndex - 1,
                    })
                }}
            />
            <Box background="white" pad="small">
                {currentItem}/{totalTasks}
            </Box>

            <PaginationButton
                label="ᐅ"
                size="small"
                color="#F2F3F2"
                disabled={
                    currentItem === totalTasks || currentItem >= isLatestTask
                }
                onClick={() => {
                    machineContext.send({
                        type: "GO_TO_TASK",
                        index: currentIndex + 1,
                    })
                }}
            />
        </TaskPaginationContainer>
    )
}

export default TaskPagination

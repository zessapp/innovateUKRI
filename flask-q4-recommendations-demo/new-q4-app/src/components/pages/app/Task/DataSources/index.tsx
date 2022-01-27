import { Box, Text } from "grommet"
import { FC, useContext } from "react"
import Button from "../../../../common/Button"
import styled from "styled-components"
import { ProjectMachineContext } from "src/machines/project"

interface IProjectsProps {}

const DataSourcesContainer = styled(Box)``

const DataSource = styled(Button)`
    :disabled {
        color: black;
    }
`

const DataSources: FC<IProjectsProps> = () => {
    const machineContext = useContext(ProjectMachineContext)
    const project = machineContext.machine.context.project
    const currentIndex = machineContext.machine.context.currentTaskIndex

    const currentItem = currentIndex + 1

    const isLatestTask =
        machineContext.machine.context.project.tasks_completed + 1

    const totalTasks = machineContext.machine.context.project.total_tasks

    return (
        <DataSourcesContainer
            direction="column"
            justify="end"
            margin={{ bottom: "medium" }}
        >
            {project.data_sources?.items?.map((dataSource) => {
                return (
                    <Box>
                        <Text>{dataSource.data_source.name}</Text>
                    </Box>
                )
            })}
        </DataSourcesContainer>
    )
}

export default DataSources

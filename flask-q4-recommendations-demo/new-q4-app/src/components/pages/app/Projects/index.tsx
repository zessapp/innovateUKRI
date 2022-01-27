import { Box } from "grommet"
import { FC } from "react"
import AppPageHeader from "../AppPageHeader"
import ProjectsTable from "./ProjectsTable"
import { useMachine } from "@xstate/react"

import { projectsmachine, ProjectsMachineContext } from "src/machines/projects"

interface IProjectsProps {}

const Projects: FC<IProjectsProps> = () => {
    const [state] = useMachine(projectsmachine, { devTools: true })

    return (
        <ProjectsMachineContext.Provider value={state}>
            {state.matches("loaded") && (
                <Box direction="column">
                    <AppPageHeader heading="Projects" />
                    <Box direction="column" margin={{ vertical: "medium" }}>
                        <ProjectsTable />
                    </Box>
                </Box>
            )}
        </ProjectsMachineContext.Provider>
    )
}

export default Projects

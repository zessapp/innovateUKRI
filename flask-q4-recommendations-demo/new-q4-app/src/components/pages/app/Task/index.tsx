import { useMachine } from "@xstate/react"
import { Box } from "grommet"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"
import {
    projectMachine,
    ProjectMachineContext,
} from "../../../../machines/project"
import AppPageHeader from "../AppPageHeader"
import AnnotationTask from "./AnnotationTask"

interface IProjectsProps {}

const ProjectDetails: FC<IProjectsProps> = () => {
    const router = useRouter()
    const { id } = router.query

    const [state, send] = useMachine(projectMachine, { devTools: true })

    // Load the project data once the id param is available from the router query

    useEffect(() => {
        if (typeof id === "string") {
            send({
                type: "SET_ID",
                id: id,
            })
        }
    }, [router.query])

    return (
        <ProjectMachineContext.Provider
            value={{
                machine: state,
                send: send,
            }}
        >
            <Box direction="column">
                {state.matches("loaded.taskLoaded") && (
                    <>
                        <AppPageHeader
                            heading={state.context?.project?.title}
                        />
                        <AnnotationTask />
                    </>
                )}
            </Box>
        </ProjectMachineContext.Provider>
    )
}

export default ProjectDetails

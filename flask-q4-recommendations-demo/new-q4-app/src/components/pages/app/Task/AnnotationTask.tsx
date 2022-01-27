import { Box } from "grommet"
import { FC, createContext } from "react"
import Instruction from "./Instruction"
import AnnotationTaskMainContainer from "./AnnotationTaskMainContainer"
import FlagIssueModal from "./FlagIssue/FlagIssueModal"
import { useMachine } from "@xstate/react"
import { modalMachine, ModalMachineContext } from "src/machines/modalMachine"
import TaskStatus from "./TaskStatus"
import TaskPagination from "./TaskPagination"

interface IProjectsProps {}

export const FlagIssueModalContext = createContext<{
    showFlagIssueModal: boolean
    setFlagIssueModal: Function
    machine: typeof modalMachine
}>({
    showFlagIssueModal: false,
    setFlagIssueModal: () => {},
    machine: modalMachine,
})

const AnnotationTask: FC<IProjectsProps> = () => {
    const [state, send, service] = useMachine(modalMachine)
    const machine = [state, send, service]
    return (
        <ModalMachineContext.Provider value={machine}>
            <Box direction="column" margin={{ vertical: "medium" }}>
                <TaskStatus />
                <TaskPagination />
                <Instruction />
                <AnnotationTaskMainContainer />
                <FlagIssueModal />
            </Box>
        </ModalMachineContext.Provider>
    )
}

export default AnnotationTask

import { Anchor, Box, Text } from "grommet"
import { FC, useContext } from "react"
import Link from "next/link"
import styled from "styled-components"
import { ProjectMachineContext } from "src/machines/project"
import { TaskTypeToTaskKeyMapping } from "src/machines/project/utils"

interface IProjectsProps {}

const InstructionsLabel = styled(Text)`
    text-transform: capitalize;
`

const FullInstructions = styled(Box)``

const Instruction: FC<IProjectsProps> = () => {
    const machineContext = useContext(ProjectMachineContext)
    const currentIndex = machineContext.machine.context.currentTaskIndex

    const project = machineContext.machine.context.project

    const taskCollectionKey = TaskTypeToTaskKeyMapping[
        project?.task_type
    ] as "ner_tasks"

    const tasks = machineContext.machine.context.project?.[taskCollectionKey]

    const currentTask = tasks.items[currentIndex]

    return (
        <Box
            direction="row"
            background="brandGrey7"
            pad="large"
            round="0.5rem"
            margin={{ bottom: "medium" }}
        >
            <Box>
                <InstructionsLabel
                    size="small"
                    color="brandGrey4"
                    weight="bold"
                    margin={{ bottom: "xsmall" }}
                >
                    Instructions
                </InstructionsLabel>
                <Text size="xlarge">{currentTask.instruction.text}</Text>
            </Box>
            <FullInstructions align="end" justify="center" flex="grow">
                <Anchor
                    target="_blank"
                    title="See Full Instructions"
                    href={currentTask.instruction.full_instructions_url}
                >
                    See Full Instructions
                </Anchor>
            </FullInstructions>
        </Box>
    )
}

export default Instruction

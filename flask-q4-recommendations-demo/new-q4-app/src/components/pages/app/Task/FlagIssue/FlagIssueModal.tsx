import { Box, Layer } from "grommet"
import { FC, useContext } from "react"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FlagIssueModalContent from "./FlagIssueModelContent"
import { ModalMachineContext } from "src/machines/modalMachine"

const CloseIcon = styled(FontAwesomeIcon)`
    position: absolute;
    padding: 2rem;
    top: 0;
    right: 0;
`

interface IProjectsProps {}

const FlagIssueModal: FC<IProjectsProps> = () => {
    const [state, send] = useContext(ModalMachineContext)

    return (
        <Box>
            {state.value === "active" && (
                <Layer
                    onEsc={() => send("CLOSE")}
                    onClickOutside={() => send("CLOSE")}
                    animation="fadeIn"
                >
                    <Box width="70vw" pad="large">
                        <FlagIssueModalContent />
                    </Box>
                    <CloseIcon icon={faTimes} onClick={() => send("CLOSE")} />
                </Layer>
            )}
        </Box>
    )
}

export default FlagIssueModal

import { createContext } from "react"
import { createMachine } from "xstate"

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
export const modalMachine = createMachine({
    id: "modal",
    initial: "inactive",
    states: {
        inactive: { on: { OPEN: "active" } },
        active: { on: { CLOSE: "inactive" } },
    },
})

export const ModalMachineContext = createContext(null)

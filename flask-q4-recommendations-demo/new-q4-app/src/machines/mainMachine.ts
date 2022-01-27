import { createContext } from "react"
import { assign, createMachine, spawn } from "xstate"
import { createModel } from "xstate/lib/model"
import { projectsMachine } from "./projectsMachine"

/**
 * Create the main model where all the types are defined
 */
export const mainModel = createModel(
    {
        projects: null,
    },
    {
        // Event creators
        events: {
            START: () => ({}),
            STOP: () => ({}),
            CREATE_PROJECTS_MACHINE: () => ({}),
        },
    }
)

/**
 * The main machine is a parallel state machine where each top level state machine doesnt talk to each other
 */
export const mainMachine = createMachine(
    {
        id: "main",
        type: "parallel",
        context: mainModel.initialContext,
        states: {
            projects: {
                initial: "idle",
                states: {
                    idle: {
                        always: {
                            target: "running",
                            actions: "START_PROJECTS",
                        },
                    },
                    running: {
                        on: {
                            STOP: {
                                target: "idle",
                            },
                        },
                    },
                },
            },
        },
    },
    {
        actions: {
            START_PROJECTS: assign((context) => {
                if (!context.projects) {
                    return {
                        projects: spawn(projectsMachine, "projectsRef"),
                    }
                }
            }),
        },
    }
)

export const MainMachineContext = createContext<any>(null)

import { createMachine } from "xstate"
import { projectsModel } from "./model"
import { saveProjects } from "./actions"
import { getProjects } from "./services"
import { createContext } from "react"

// projects: [] as AnnotationProject[],
// currentProject: null,

export const projectsmachine = createMachine<typeof projectsModel>(
    {
        id: "projects",
        initial: "loading",
        context: projectsModel.initialContext,
        states: {
            loading: {
                invoke: {
                    id: "getProjects",
                    src: "getProjects",
                    onDone: {
                        target: "loaded",
                        actions: "saveProjects",
                    },
                    onError: {
                        target: "failed",
                    },
                },
            },
            failed: {
                on: { RETRY: "loading" },
            },
            loaded: {},
        },
    },
    {
        actions: {
            saveProjects: saveProjects,
        },
        services: {
            getProjects: getProjects,
        },
    }
)

export const ProjectsMachineContext = createContext(null)

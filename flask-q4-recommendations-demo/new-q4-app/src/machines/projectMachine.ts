import { API, graphqlOperation } from "aws-amplify"
import { AnnotationProject, GetAnnotationProjectQuery } from "src/API"
import { createMachine } from "xstate"
import { createModel } from "xstate/lib/model"
import { getAnnotationProject } from "../graphql/queries"

interface ProjectContext {
    project: AnnotationProject
    currentId: string
    currentTaskIndex: number
}

interface ProjectStateSchema {
    states: {
        loading: {}
        fetching: {}
        failed: {}
        loaded: {}
    }
}

export const projectModel = createModel<ProjectContext, any>(
    {
        project: null as AnnotationProject,
        currentId: null as string,
        currentTaskIndex: 0,
    },
    {
        // Event creators
        events: {
            SET_ID: (id: string) => ({ id }),
            SAVE_ID: (id: string) => ({ id }),
            RETRY: () => ({}),
            SAVE_PROJECT_DATA: (data: AnnotationProject) => ({ data }),
            FAIL_TASK: () => ({}),
            SKIP_TASK: () => ({}),
            COMPLETE_TASK: () => ({}),
            SET_TASK_COMPLETED: () => ({}),
            NEXT_TASK: () => ({}),
            SET_NEXT_TASK: () => ({}),
            PREVIOUS_TASK: () => ({}),
            SET_PREVIOUS_TASK: () => ({}),
        },
    }
)

const fetchProject = async (id: string) => {
    try {
        const response = (await API.graphql(
            graphqlOperation(getAnnotationProject, {
                id: id,
            })
        )) as any

        const data = response.data as GetAnnotationProjectQuery

        const project = data.getAnnotationProject as AnnotationProject

        return project
    } catch (e) {
        console.log("Failed to fetch the project", e)
    }
}

export const projectMachine = createMachine<any>(
    {
        id: "project",
        initial: "loading",
        // type: "",
        context: projectModel.initialContext,
        states: {
            loading: {
                on: {
                    SET_ID: {
                        target: "fetching",
                        actions: "SAVE_ID",
                        cond: {
                            name: "hasId",
                            predicate: (context: any, event: any) => {
                                return !!event.id
                            },
                            type: "xstate.guard",
                        },
                    },
                },
            },
            fetching: {
                invoke: {
                    id: "fetchProject",
                    src: (context: any) => fetchProject(context.currentId),
                    onDone: {
                        target: "loaded",
                        actions: "SAVE_PROJECTS_DATA",
                    },
                    onError: {
                        target: "failed",
                    },
                },
            },
            failed: {
                on: { RETRY: "fetching" },
            },
            loaded: {
                on: {
                    NEXT_TASK: {
                        target: undefined,
                        actions: "SET_NEXT_TASK",
                    },
                    PREVIOUS_TASK: {
                        target: undefined,
                        actions: "SET_PREVIOUS_TASK",
                    },
                    COMPLETE_TASK: {
                        target: undefined,
                        actions: ["SET_TASK_COMPLETED", "NEXT_TASK"],
                    },
                },
            },
        },
    },
    {
        /**
         * TODO - Start off with inline assigns to start with and then we can refactor into smaller function calls
         */
        actions: {
            SAVE_PROJECTS_DATA: projectModel.assign({
                project: (_, event) => event.data,
            }),
            SAVE_ID: projectModel.assign({
                currentId: (_, event) => event.id,
            }),
            SET_PREVIOUS_TASK: projectModel.assign({
                currentTaskIndex: (context) =>
                    context.currentTaskIndex > 0
                        ? context.currentTaskIndex - 1
                        : context.currentTaskIndex,
            }),
            SET_NEXT_TASK: projectModel.assign({
                currentTaskIndex: (context) =>
                    context.currentTaskIndex < context.project.total_tasks
                        ? context.currentTaskIndex + 1
                        : context.currentTaskIndex,
            }),
            SET_TASK_COMPLETED: projectModel.assign({
                // TODO - Set task as completed via backend
            }),
        },
    }
)

export const createProjectMachine = (id: string) => {
    return createMachine<any>(
        {
            id: "project",
            initial: "loading",
            context: {
                ...projectModel.initialContext,
                currentId: id,
            },
            states: {
                loading: {
                    always: "fetching",
                },
                fetching: {
                    invoke: {
                        id: "fetchProject",
                        src: (context: any) => fetchProject(context.currentId),
                        onDone: {
                            target: "loaded",
                            actions: "SAVE_PROJECTS_DATA",
                        },
                        onError: {
                            target: "failed",
                        },
                    },
                },
                failed: {
                    on: { RETRY: "fetching" },
                },
                loaded: {},
            },
        },
        {
            actions: {
                SAVE_PROJECTS_DATA: projectModel.assign(
                    {
                        project: (_, event) => event.data,
                    },
                    "SAVE_PROJECT_DATA"
                ),
                SAVE_ID: projectModel.assign(
                    {
                        currentId: (_, event) => event.id,
                    },
                    "SAVE_ID"
                ),
            },
        }
    )
}

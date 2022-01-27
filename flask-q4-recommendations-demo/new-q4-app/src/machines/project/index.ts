import { createContext } from "react"
import { createMachine, Interpreter, State } from "xstate"
import { GetEventObject } from "../types"
import {
    saveId,
    saveProject,
    saveTask,
    saveTaskOptimisticly,
    setCurrentTaskIndex,
    setTaskCompleted,
    setTaskFailed,
    updateNerAnnotations,
} from "./actions"
import {
    projectModel,
    ProjectContext,
    assertEventType,
    InferEvent,
} from "./model"
import { getProject, updateTask } from "./services"
import { TaskTypeToTaskKeyMapping } from "./utils"

/**
 * TODO - Task transition
 *
 * COMPLETE
 *
 * 1. We need to update the task as complete in the backend then move to the next task if there is one
 *
 * FAILURE
 *
 * 1. We need to update the task as failed in the backend then move to the next task if there is one.
 *
 * NEXT
 *
 * 1. For next task, complete or failed we need to check if we have reached the end
 * 2. If we have not reached the end, then we should check if the array has the item
 * 3. If the item does not exist then fetch it from the backend
 * 4. Once the tasks have been retrieved then move to the next task
 *
 * PREVIOUS
 *
 * 1. Move to the previous task if not currently the first task
 *
 */

/**
 * TODO - Completes
 *
 * 1.
 *
 */

// export const createProjectMachine = (id: string) => {}

export const projectMachine = createMachine<typeof projectModel>(
    {
        id: "project",
        initial: "loading",
        context: projectModel.initialContext,
        states: {
            loading: {
                on: {
                    SET_ID: {
                        target: "fetching",
                        actions: "saveId",
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
                    id: "getProject",
                    src: "getProject",
                    onDone: {
                        target: "loaded",
                        actions: "saveProject",
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
                id: "loaded",
                initial: "taskLoading",
                states: {
                    taskLoading: {
                        id: "taskLoading",
                        initial: "checking",
                        states: {
                            checking: {
                                always: [
                                    {
                                        target: "#taskLoading.fetching",
                                        cond: {
                                            name: "shouldFetch",
                                            type: "xstate.guard",
                                            predicate: (
                                                context: ProjectContext
                                            ) => {
                                                const project = context.project

                                                console.log(
                                                    "TaskTypeToTaskKeyMapping",
                                                    TaskTypeToTaskKeyMapping
                                                )

                                                const taskCollectionKey =
                                                    TaskTypeToTaskKeyMapping[
                                                        project?.task_type
                                                    ]

                                                console.log(
                                                    "taskCollectionKey",
                                                    taskCollectionKey
                                                )

                                                const lessTasksAreDownloadedThanTasksCompleted =
                                                    project?.[taskCollectionKey]
                                                        .items.length <=
                                                    project.tasks_completed

                                                const hasMoreTasks =
                                                    project?.[taskCollectionKey]
                                                        .items.length <
                                                    project.total_tasks

                                                const hasNextToken = !!project?.[
                                                    taskCollectionKey
                                                ].nextToken

                                                return (
                                                    lessTasksAreDownloadedThanTasksCompleted &&
                                                    hasMoreTasks &&
                                                    hasNextToken
                                                )
                                            },
                                        },
                                    },
                                    {
                                        target: "#loaded.taskLoaded",
                                        cond: {
                                            name: "isLoaded",
                                            type: "xstate.guard",
                                            predicate: (
                                                context: ProjectContext
                                            ) => {
                                                const project = context.project

                                                console.log(
                                                    "TaskTypeToTaskKeyMapping",
                                                    TaskTypeToTaskKeyMapping
                                                )

                                                const taskCollectionKey =
                                                    TaskTypeToTaskKeyMapping[
                                                        project?.task_type
                                                    ]

                                                console.log(
                                                    "taskCollectionKey",
                                                    taskCollectionKey
                                                )

                                                const moreTasksAreDownloadedThanTasksCompleted =
                                                    project?.[taskCollectionKey]
                                                        .items.length >
                                                    project.tasks_completed

                                                const hasMoreTasks =
                                                    project?.[taskCollectionKey]
                                                        .items.length <
                                                    project.total_tasks

                                                const hasNextToken = !!project?.[
                                                    taskCollectionKey
                                                ].nextToken

                                                return (
                                                    moreTasksAreDownloadedThanTasksCompleted ||
                                                    !hasMoreTasks ||
                                                    !hasNextToken
                                                )
                                            },
                                        },
                                    },
                                ],
                            },
                            fetching: {
                                invoke: {
                                    id: "getTasks",
                                    src: "getTasks",
                                    onDone: {
                                        target: "#taskLoading.checking",
                                        actions: [
                                            "saveTasks",
                                            "resetRequestCount",
                                        ],
                                    },
                                    onError: {
                                        target: "#taskLoading.retry",
                                        actions: "resetTaskStatus",
                                    },
                                },
                            },
                            retry: {
                                after: {
                                    2000: {
                                        target: "#loaded.taskLoading.checking",
                                        actions: ["incrementRequestCount"],
                                        cond: (context: ProjectContext) => {
                                            return context.taskRequestCount <= 3
                                        },
                                    },
                                },
                            },
                        },
                    },
                    /**
                     * TODO - Update the task optimisticaly and then update the backend
                     *
                     * 1. The local task is updated with the correct state
                     * 2. The backend is updated with the correct state
                     * 3. If the backend fails to update, revert the local change
                     * 4.
                     */
                    taskLoaded: {
                        id: "taskLoaded",
                        initial: "idle",
                        states: {
                            idle: {},
                            updating: {
                                invoke: {
                                    id: "updateTask",
                                    src: "updateTask",
                                    onDone: {
                                        target: "#taskLoaded.idle",
                                        actions: ["saveTask"],
                                    },
                                    onError: {
                                        target: "#taskLoaded.idle",
                                    },
                                },
                            },
                        },
                    },
                },
                on: {
                    GO_TO_TASK: {
                        target: "#taskLoading",
                        actions: "setCurrentTaskIndex",
                        cond: (
                            context: ProjectContext,
                            event: InferEvent<"GO_TO_TASK">
                        ) => {
                            assertEventType(event, "GO_TO_TASK")
                            // Allow annotators to move to the next uncompleted task

                            return (
                                context.project?.tasks_completed >=
                                    event.index && event.index >= 0
                            )
                        },
                    },
                    UPDATE_NER_ANNOTATION: {
                        target: undefined,
                        actions: "updateNerAnnotations",
                    },
                    UPDATE_TASK: {
                        target: "#taskLoaded.updating",
                        // actions: "saveTaskOptimisticly",
                    },
                },
            },
        },
    },
    {
        actions: {
            saveProject: saveProject,
            saveId: saveId,
            setTaskCompleted: setTaskCompleted,
            setTaskFailed: setTaskFailed,
            setCurrentTaskIndex: setCurrentTaskIndex,
            saveTask: saveTask,
            updateNerAnnotations: updateNerAnnotations,
        },
        services: {
            getProject: getProject,
            updateTask: updateTask,
        },
    }
)

interface IProjectMachineContext {
    machine: State<ProjectContext, GetEventObject<typeof projectModel>>
    // currentTaskIndex: number
    send: Interpreter<
        ProjectContext,
        any,
        GetEventObject<typeof projectModel>
    >["send"]
}

export const ProjectMachineContext = createContext<IProjectMachineContext>(null)

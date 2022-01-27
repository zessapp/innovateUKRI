import { API, graphqlOperation } from "aws-amplify"
import {
    AnnotationProject,
    GetAnnotationProjectQuery,
    NerAnnotationTask,
    UpdateNerAnnotationTaskInput,
    UpdateNerAnnotationTaskMutation,
    FinishNERTaskMutation,
    FinishTaskInput,
} from "src/API"
import { getAnnotationProject } from "src/graphql/queries"
import { updateNerAnnotationTask, finishNERTask } from "src/graphql/mutations"
import { assertEventType, ProjectContext } from "./model"
import { TaskTypeToTaskKeyMapping } from "./utils"

/** TODO - Use react query to cache data */
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

export const getProject = (context: ProjectContext) =>
    fetchProject(context.projectId)

const updateTaskService = async (
    index: number,
    input: Omit<FinishTaskInput, "sample">,
    currentTask: NerAnnotationTask
) => {
    try {
        const taskInput = {
            ...input,
            ...{
                sample: currentTask.sample,
            },
        }

        console.log("taskInput", taskInput)
        const response = (await API.graphql(
            graphqlOperation(finishNERTask, {
                task: taskInput,
            })
        )) as any

        const data = response.data as FinishNERTaskMutation

        const task = data.finishNERTask as NerAnnotationTask

        return {
            index,
            task: task,
        }
    } catch (e) {
        console.log("Failed to update the task", e)
    }
}

export const updateTask = (context: ProjectContext, event) => {
    const taskCollectionKey =
        TaskTypeToTaskKeyMapping[context?.project.task_type]
    const currentTask = context.project?.[taskCollectionKey]?.items[event.index]

    if (currentTask) {
        return updateTaskService(event.index, event.input, currentTask)
    } else {
        throw Error("Could not find the specified task")
    }
}

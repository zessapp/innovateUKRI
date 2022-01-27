import {
    AnnotationProject,
    AnnotationTaskStatus,
    NerAnnotation,
    NerAnnotationTask,
} from "src/API"
import { assertEventType, projectModel } from "./model"
import NerAnnotationService from "./NerAnnotation/NerAnnotationService"
import { TaskTypeToTaskKeyMapping } from "./utils"

function updateTaskCompletedCount(
    currentStatus: AnnotationTaskStatus,
    nextStatus: AnnotationTaskStatus,
    currentTaskCompletedCount: number
) {
    if (
        nextStatus === AnnotationTaskStatus.TODO &&
        currentStatus !== AnnotationTaskStatus.TODO
    ) {
        return currentTaskCompletedCount - 1
    } else if (
        nextStatus !== AnnotationTaskStatus.TODO &&
        currentStatus === AnnotationTaskStatus.TODO
    ) {
        return currentTaskCompletedCount + 1
    } else {
        return currentTaskCompletedCount
    }
}

function updateTask(
    project: AnnotationProject,
    taskIndex: number,
    updatedTask: NerAnnotationTask
) {
    // Create a copy of the project
    const newProject = { ...project }

    const taskCollectionKey = TaskTypeToTaskKeyMapping[newProject?.task_type]

    const currentTasks = newProject?.[taskCollectionKey].items

    if (Array.isArray(currentTasks)) {
        const originalTask = currentTasks[taskIndex]

        // Increment tasks completed
        newProject.tasks_completed = updateTaskCompletedCount(
            originalTask.status,
            updatedTask.status,
            newProject.tasks_completed
        )

        // Create a new Tasks array with the updated task
        const newTasksArray = [
            ...currentTasks.slice(0, taskIndex),
            updatedTask,
            ...currentTasks.slice(taskIndex + 1),
        ]

        // Update the task items with the new tasks array

        newProject[taskCollectionKey].items = newTasksArray

        return newProject
    }
}

/**
 * Action Functions
 */

export const saveProject = projectModel.assign({
    project: (_, event) => {
        assertEventType(event, "done.invoke.getProject")
        return event.data
    },
})

export const saveId = projectModel.assign({
    projectId: (_, event) => {
        assertEventType(event, "SET_ID")
        return event.id
    },
})

export const setCurrentTaskIndex = projectModel.assign({
    currentTaskIndex: (context, event) => {
        assertEventType(event, "GO_TO_TASK")
        return event.index
    },
})

export const saveTask = projectModel.assign({
    project: (context, event) => {
        assertEventType(event, "done.invoke.updateTask")
        const currentProject = context?.project
        const task = event.data.task as NerAnnotationTask

        return updateTask(currentProject, event.data.index, task)
    },
})

// TODO - Change event to updateNerAnnotations
export const updateNerAnnotations = projectModel.assign({
    project: (context, event) => {
        assertEventType(event, "UPDATE_NER_ANNOTATION")
        const currentProject = context?.project
        const index = event.index
        const annotations = event.annotations

        const taskCollectionKey = TaskTypeToTaskKeyMapping[
            currentProject.task_type
        ] as "ner_tasks"

        const tasks = currentProject?.[taskCollectionKey]

        const task = tasks.items[index]

        const nerAnnotationService = new NerAnnotationService(task)

        const newTask: NerAnnotationTask = {
            ...task,
            sample: {
                ...task.sample,
                annotations: nerAnnotationService.mapReactAnnotationsToNerAnnotations(
                    annotations
                ) as NerAnnotation[],
            },
        }

        return updateTask(currentProject, index, newTask)
    },
})

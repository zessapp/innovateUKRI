import { createModel } from "xstate/lib/model"
import {
    AnnotationProject,
    FinishTaskInput,
    NerAnnotationTask,
    UpdateNerAnnotationTaskInput,
} from "src/API"
import { EventObject } from "xstate"
import { IReactNerAnnotation } from "../types"

/**
 * The shape of the context of a machine
 */
export interface ProjectContext {
    project: AnnotationProject
    projectId: string
    taskRequestCount: number
    currentTaskIndex: number
}

/**
 * The type definitions of the events used by actions and services
 */
export type ProjectEvents = {
    events: {
        SET_ID: (id: string) => { id: string }
        RETRY: () => {}
        GO_TO_TASK: (index: number) => { index: number }
        UPDATE_TASK: (
            index: number,
            input: Omit<FinishTaskInput, "sample">
        ) => { index: number; input: Omit<FinishTaskInput, "sample"> }
        UPDATE_NER_ANNOTATION: (
            index: number,
            annotations: IReactNerAnnotation[]
        ) => { index: number; annotations: IReactNerAnnotation[] }
        "done.invoke.getProject": (
            data: AnnotationProject
        ) => { data: AnnotationProject }
        "done.invoke.updateTask": (data: {
            task: NerAnnotationTask
            index: number
        }) => {
            data: {
                task: NerAnnotationTask
                index: number
            }
        }
    }
}

/**
 * Definition of the project model that is used in the project machine
 */
export const projectModel = createModel<ProjectContext, ProjectEvents>(
    {
        project: null,
        projectId: null,
        taskRequestCount: 0,
        currentTaskIndex: 0,
    },
    {
        // Event creators
        events: {
            SET_ID: (id: string) => ({ id }),
            RETRY: () => ({}),
            GO_TO_TASK: (index: number) => ({ index }),
            UPDATE_TASK: (
                index: number,
                input: Omit<FinishTaskInput, "sample">
            ) => ({
                index,
                input,
            }),
            UPDATE_NER_ANNOTATION: (
                index: number,
                annotations: IReactNerAnnotation[]
            ) => ({ index, annotations }),
            "done.invoke.getProject": (data: AnnotationProject) => ({ data }),
            "done.invoke.updateTask": (data: {
                task: NerAnnotationTask
                index: number
            }) => ({
                data,
            }),
        },
    }
)

export type InferEvent<E extends keyof ProjectEvents["events"]> = EventObject &
    ReturnType<ProjectEvents["events"][E]>

/**
 *
 * @see https://github.com/davidkpiano/xstate/discussions/1591
 */
export function assertEventType<
    TE extends EventObject,
    TType extends TE["type"]
>(event: TE, eventType: TType): asserts event is TE & { type: TType } {
    if (event.type !== eventType) {
        throw new Error(
            `Invalid event: expected "${eventType}", got "${event.type}"`
        )
    }
}

// type test = ReturnType<typeof projectModel.events[keyof typeof projectModel.events]>

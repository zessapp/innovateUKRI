import { createModel } from "xstate/lib/model"
import { AnnotationProject } from "src/API"
import { EventObject } from "xstate"

/**
 * The shape of the context of a machine
 */
export interface ProjectsContext {
    projects: AnnotationProject[]
}

/**
 * The type definitions of the events used by actions and services
 */
export type ProjectsEvents = {
    events: {
        RETRY: () => {}
        // SAVE_PROJECTS_DATA: (
        //     data: AnnotationProject[]
        // ) => { data: AnnotationProject[] }
        // PROJECT_SELECTED: (id: string) => { id: string }
        "done.invoke.getProjects": (
            data: AnnotationProject[]
        ) => { data: AnnotationProject[] }
    }
}

/**
 * Definition of the project model that is used in the project machine
 */
export const projectsModel = createModel<ProjectsContext, ProjectsEvents>(
    {
        projects: null,
    },
    {
        // Event creators
        events: {
            RETRY: () => ({}),
            // SAVE_PROJECTS_DATA: (data: AnnotationProject[]) => ({ data }),
            // PROJECT_SELECTED: (id: string) => ({ id }),
            "done.invoke.getProjects": (data: AnnotationProject[]) => ({
                data,
            }),
        },
    }
)

export type InferEvent<E extends keyof ProjectsEvents["events"]> = EventObject &
    ReturnType<ProjectsEvents["events"][E]>

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

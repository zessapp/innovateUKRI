/**
 * TODO - Migrate a new project to the cloud
 *
 * 1. Create an annotator if not existing
 * 2. Create the project
 * 3. Create the tasks using Airtable data
 *
 * For the task creation we need a blueprint for a task that can be used to create more versions of the task
 *
 */

import Amplify from "aws-amplify"
import awsExports from "../../../src/aws-exports"
import { ITaskBlueprint } from "../taskBlueprints/BaseTaskBlueprint"

import {
    createNerAnnotationTask,
    createClassificationAnnotationTask,
    createAllergyAnnotationTask,
} from "../../../src/graphql/mutations"
import { BaseAnnotationAdminRepo } from "./BaseAnnotationAdminRepo"
import { CreateAnnotationTaskInputUnion } from "../../utils/types"
import { AnnotationTaskType } from "../../../src/API"

type AnnotationTaskQueryMapping = {
    [K in AnnotationTaskType]: {
        queryField: string
        query: string
    }
}

export class AnnotationTaskAdminRepo<
    T extends CreateAnnotationTaskInputUnion
> extends BaseAnnotationAdminRepo<T> {
    constructor(
        /**
         * The blueprint to use when creating new tasks
         */
        private _blueprint: ITaskBlueprint
    ) {
        super()
        Amplify.configure(awsExports)
    }

    /**
     * An object that stores the id of the task as a key and a value as the value
     */
    private stagedTasks: {
        [idKey: string]: Partial<CreateAnnotationTaskInputUnion>
    } = {}

    /**
     * A mapping of the graphQL queries for each type of annotation task
     */
    private queries: AnnotationTaskQueryMapping = {
        [AnnotationTaskType.NER]: {
            queryField: "CreateNerAnnotationTask",
            query: createNerAnnotationTask,
        },
        [AnnotationTaskType.CLASSIFICATION]: {
            queryField: "CreateClassificationAnnotationTask",
            query: createClassificationAnnotationTask,
        },
        [AnnotationTaskType.ALLERGIES]: {
            queryField: "CreateAllergyAnnotationTask",
            query: createAllergyAnnotationTask,
        },
    }

    validateExists(stageKey: string) {
        if (!stageKey) {
            throw Error(
                "Please ensure the task has a UUID v4 or a key is set via the param"
            )
        }
    }

    /**
     * Stage a task for future creation
     *
     * @param task - The task to be staged for future creation
     * @param key - A optional key used to refer to the task if you need to unstage it later
     */
    stageTask(task: Partial<T>, key?: string) {
        const stageKey = key || (task.id as string)

        if (stageKey) {
            this.validateExists(stageKey)

            this.stagedTasks[stageKey] = task
        }
    }

    /**
     * Unstage a task for future creation
     *
     * @param key - A optional key for the particular task to unstage
     */
    unstageTask(key: string) {
        this.validateExists(key)

        delete this.stagedTasks[key]
    }

    /**
     * Reset the stated tasks back to default
     */
    clearStagedTasks() {
        this.stagedTasks = {}
    }

    /**
     * Iterates through all of the tasks to upload them to amplify
     *
     */
    async createTasks() {
        try {
            await this.login()

            for (const taskKey in this.stagedTasks) {
                if (
                    Object.prototype.hasOwnProperty.call(
                        this.stagedTasks,
                        taskKey
                    )
                ) {
                    const task = this.stagedTasks[taskKey]

                    if ("id" in task && task.id) {
                        const finalTask = this._blueprint.createTask(
                            task.id,
                            task
                        ) as T
                        console.log("FINAL TASK", task)
                        console.log("FINAL TASK", finalTask)

                        const queryMapping = this.queries[
                            finalTask.type as AnnotationTaskType
                        ]

                        const createdTask = await this.create(
                            queryMapping.query,
                            finalTask,
                            queryMapping.queryField
                        )

                        console.log(
                            "Task Created",
                            JSON.stringify(createdTask, null, 4)
                        )
                    }
                }
            }

            this.clearStagedTasks()
        } catch (e) {
            console.log("Error creating task", e)
        }
    }

    deleteTasks() {}
}

#!/usr/bin/env ts-node-script
import { AnnotationTaskAdminRepo } from "../repos/annotationTaskAdminRepo"
import { blueprint, tasks } from "../data/allergenTasks"
import { AllergyTaskBlueprint } from "../taskBlueprints/AllergyTaskBlueprint"

export default async function createAnnotationProject() {
    console.log("***** WRITE ANNOTATION PROJECT START *******")

    try {
        const allergyBlueprint = new AllergyTaskBlueprint(blueprint)

        const repo = new AnnotationTaskAdminRepo(allergyBlueprint)

        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index]

            const id = task.id || ""

            console.log("TASK LOOP", task)
            console.log("TASK LOOP2 ", allergyBlueprint.createTask(id, task))

            repo.stageTask(allergyBlueprint.createTask(id, task))
        }

        const response = await repo.createTasks()

        console.log("CREATED TASKS", response)
    } catch (e) {
        console.log("Error creating annotation project", e)
    }

    console.log("***** WRITE ANNOTATION PROJECT END *******")
}

createAnnotationProject()

#!/usr/bin/env ts-node-script
import { AnnotationProjectAdminRepo } from "./testdata/repos/annotationProjectAdminRepo"
import {} from "./testdata/data/nerTasks"
import { AnnotationTaskType } from "../src/API"

export default async function createAnnotationProject() {
    console.log("***** WRITE ANNOTATION PROJECT START *******")

    try {
        const repo = new AnnotationProjectAdminRepo()

        const response = await repo.createProject({
            id: "df8e1b56-becb-484e-aca0-161d33c3691a",
            annotator_id: "cfe607fe-5dfe-4396-b8b2-5658fee372f8",
            assignee: "otherperson",
            title: "This is a random project",
            description: "This isa test description of something",
            tasks_completed: 0,
            total_tasks: 0,
            task_type: AnnotationTaskType.NER,
        })

        console.log(response)
    } catch (e) {
        console.log("Error creating annotation project", e)
    }

    console.log("***** WRITE ANNOTATION PROJECT END *******")
}

createAnnotationProject()

#!/usr/bin/env ts-node-script
import { AnnotationTagAdminRepo } from "./testdata/repos/annotatorAdminRepo"
import {} from "./testdata/data/nerTasks"

export default async function createAnnotator() {
    console.log("***** WRITE ANNOTATOR START *******")

    try {
        const repo = new AnnotationTagAdminRepo()

        const response = await repo.createAnnotator({
            id: "cfe607fe-5dfe-4396-b8b2-5658fee372f8",
            name: "Hiren U",
            email: "heeeeran@zess.co",
            username: "otherperson",
        })

        console.log(response)
    } catch (e) {
        console.log("Error creating annotator", e)
    }

    console.log("***** WRITE ANNOTATOR END *******")
}

createAnnotator()

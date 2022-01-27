#!/usr/bin/env ts-node-script
import { AnnotationTagAdminRepo } from "./testdata/repos/annotationTagAdminRepo"
import { tags } from "./testdata/data/nerTasks"

export default async function createAnnotationTag() {
    console.log("***** WRITE ANNOTATION PROJECT START *******")

    try {
        const repo = new AnnotationTagAdminRepo()

        const temp = tags[0]

        const response = repo.createTag(temp)

        console.log(response)
    } catch (e) {
        console.log("Error creating annotation tag", e)
    }

    console.log("***** WRITE ANNOTATION PROJECT END *******")
}

createAnnotationTag()

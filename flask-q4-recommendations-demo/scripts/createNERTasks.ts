#!/usr/bin/env ts-node-script
import Amplify, { API, graphqlOperation } from "aws-amplify"
import awsExports from "../src/aws-exports"
import { createNerAnnotationTask as createNerTask } from "../src/graphql/mutations"
import { v4 } from "uuid"
import {
    AnnotationTag,
    AnnotationTaskInstruction,
    AnnotationTaskIssue,
    AnnotationTaskStatus,
    AnnotationTaskType,
    CreateNerAnnotationTaskMutation,
    NerAnnotationSample,
    NerAnnotationTask,
} from "../src/API"
import { getLoginVars } from "./utils"

Amplify.configure(awsExports)

const parseData = (response: any) => {
    const data = response.data as CreateNerAnnotationTaskMutation
    return data.createNerAnnotationTask as NerAnnotationTask
}

export default async function createNerAnnotationTask(
    id: string,
    project_id: string,
    annotator_id: string,
    instruction: AnnotationTaskInstruction,
    sample: NerAnnotationSample,
    type: AnnotationTaskType,
    tags: AnnotationTag[],
    status: AnnotationTaskStatus,
    issue?: AnnotationTaskIssue,
    metadata: object = {}
) {
    console.log("***** WRITE ANNOTATION TASK START *******")

    // Create the annotation project
    const task: Partial<NerAnnotationTask> = {
        id: id || v4(),
        annotator_id,
        instruction,
        sample,
        type,
        tags,
        metadata: JSON.stringify(metadata),
        project_id,
        status,
        issue,
    }

    try {
        const [username, password] = getLoginVars()

        await API.Auth.signIn(username, password)
        // The GraphQl response
        const response = (await API.graphql(
            graphqlOperation(createNerTask, {
                input: task,
            })
        )) as any

        // The new annotation project
        const newTask = parseData(response)

        console.log("The new annotation task", JSON.stringify(newTask, null, 4))
    } catch (e) {
        console.log("Error creating annotation task", e)
    }

    console.log("***** WRITE ANNOTATION TASK END *******")
}

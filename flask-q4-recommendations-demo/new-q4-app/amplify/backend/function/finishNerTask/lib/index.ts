/* Amplify Params - DO NOT EDIT
	API_DATAANNOTATION_ANNOTATIONPROJECTTABLE_ARN
	API_DATAANNOTATION_ANNOTATIONPROJECTTABLE_NAME
	API_DATAANNOTATION_GRAPHQLAPIIDOUTPUT
	API_DATAANNOTATION_NERANNOTATIONTASKTABLE_ARN
	API_DATAANNOTATION_NERANNOTATIONTASKTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk")
// import AWS from "aws-sdk"

const region = process.env.REGION
const projectTableName =
    process.env.API_DATAANNOTATION_ANNOTATIONPROJECTTABLE_NAME
const taskTableName = process.env.API_DATAANNOTATION_NERANNOTATIONTASKTABLE_NAME

const client = new AWS.DynamoDB({
    region: region,
})

enum AnnotationTaskStatus {
    TODO = "TODO",
    FAILED = "FAILED",
    DONE = "DONE",
}

interface IAnnotationTag {
    id: string
    name: string
    description: string
}

interface INerAnnotation {
    text: string
    tag: IAnnotationTag
    start: number
    end: number
}

interface INerAnnotationSample {
    text: string
    annotations: INerAnnotation[]
}

interface INerTask {
    task_id: string
    project_id: string
    type: AnnotationTaskStatus
    sample: INerAnnotationSample
}

interface IEvent {
    arguments: {
        task: INerTask
    }
}

function getTaskArgument(event: IEvent) {
    const task = event?.arguments?.task

    if (!task) {
        throw Error("Please provide a task as an input")
    }

    if (typeof task.project_id !== "string") {
        throw Error("Please enter a valid project id")
    }

    if (typeof task.task_id !== "string") {
        throw Error("Please enter a valid task id")
    }

    return task
}

async function getCurrentTask(task: INerTask) {
    const currentTaskResponse = await client
        .getItem({
            Key: {
                id: {
                    S: task.task_id,
                },
            },
            TableName: taskTableName,
        })
        .promise()

    const currentTask = AWS.DynamoDB.Converter.unmarshall(
        currentTaskResponse.Item
    )

    return currentTask
}

function createUpdateProjectCountQuery(
    task: INerTask,
    shouldSubtract: boolean = false
) {
    return {
        Update: {
            Key: {
                id: {
                    S: task.project_id,
                },
            },
            TableName: projectTableName,
            UpdateExpression: `SET tasks_completed = tasks_completed ${
                shouldSubtract ? "-" : "+"
            } :n`,
            ExpressionAttributeValues: {
                ":n": {
                    N: "1",
                },
            },
        },
    }
}

function createTaskStatusQuery(task: INerTask) {
    return {
        Key: {
            id: {
                S: task.task_id,
            },
        },
        TableName: taskTableName,
        UpdateExpression: "SET #s = :t, #sa = :sa",
        ExpressionAttributeValues: {
            ":t": {
                S: task.type,
            },
            ":sa": {
                M: {
                    annotations: {
                        L: [
                            ...task.sample.annotations.map((annotation) => {
                                return {
                                    M: {
                                        text: {
                                            S: annotation.text,
                                        },
                                        start: {
                                            N: annotation.start.toString(),
                                        },
                                        end: {
                                            N: annotation.end.toString(),
                                        },
                                        tag: {
                                            M: {
                                                id: {
                                                    S:
                                                        annotation?.tag?.id ||
                                                        "",
                                                },
                                                name: {
                                                    S:
                                                        annotation?.tag?.name ||
                                                        "",
                                                },
                                                description: {
                                                    S:
                                                        annotation?.tag
                                                            ?.description || "",
                                                },
                                            },
                                        },
                                    },
                                }
                            }),
                        ],
                    },
                    text: { S: task.sample.text },
                },
            },
        },
        ExpressionAttributeNames: {
            "#s": "status",
            "#sa": "sample",
        },
        // ConditionExpression: "#s <> :t",
    }
}

function createUpdateTaskStatusQuery(task: INerTask) {
    console.log(
        "createTaskStatusQuery",
        JSON.stringify(
            {
                Update: createTaskStatusQuery(task),
            },
            null,
            4
        )
    )
    return {
        Update: createTaskStatusQuery(task),
    }
}

async function updateTaskStatusAndCount(
    task: INerTask,
    shouldSubtract?: boolean
) {
    const response = await client
        .transactWriteItems({
            TransactItems: [
                createUpdateProjectCountQuery(task, shouldSubtract),
                createUpdateTaskStatusQuery(task),
            ],
        })
        .promise()

    return response.$response.data
}

async function updateTaskStatus(task: INerTask) {
    const response = await client
        .updateItem(createTaskStatusQuery(task))
        .promise()

    return response.$response.data
}

async function updateTaskStatusTransaction(task: INerTask) {
    const currentTask = await getCurrentTask(task)

    const currentTaskType = currentTask?.status

    const currentTaskStatusIsTodo =
        currentTaskType === AnnotationTaskStatus.TODO

    const nextTaskStatusIsTodo = task.type === AnnotationTaskStatus.TODO

    if (currentTaskStatusIsTodo && !nextTaskStatusIsTodo) {
        await updateTaskStatusAndCount(task)
    } else if (!currentTaskStatusIsTodo && nextTaskStatusIsTodo) {
        await updateTaskStatusAndCount(task, true)
    } else {
        await updateTaskStatus(task)
    }

    return await getCurrentTask(task)
}

exports.handler = async (event: IEvent) => {
    const task = getTaskArgument(event)

    try {
        const response = await updateTaskStatusTransaction(task)

        return response
    } catch (error) {
        const message: string = error.message

        console.log("finishNerTask error", error)

        if (
            message.match(
                /ConditionalCheckFailed|The task is already in this status/g
            )
        ) {
            throw Error("The task is already in this state")
        }

        throw Error(
            `Sorry, Something went wrong: ${JSON.stringify(error.message)}`
        )
    }
}

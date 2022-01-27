import { FC, useContext, useState, Fragment, useReducer } from "react"
import { ProjectMachineContext } from "src/machines/project"
import {
    AllergyAnnotation,
    AllergyAnnotationTask,
    AnnotationTag,
    AnnotationTagWithEvidence,
    CreateEvidenceInput,
    Evidence,
} from "src/API"
import styled from "styled-components"
import { IReactNerAnnotation } from "src/machines/types"
import NerAnnotationService from "src/machines/project/NerAnnotation/NerAnnotationService"
import { TaskTypeToTaskKeyMapping } from "src/machines/project/utils"
import { Box, Anchor, Text } from "grommet"
import EvidenceForm from "./Evidence/EvidenceForm"
import { v4 } from "uuid"

const AllergyContainer = styled(Box)``

const Allergy = styled(Box)`
    min-height: auto;
`
const AllergySampleText = styled(Box)`
    min-height: auto;
`

const EvidenceSelection = styled(Box)``

export interface ILocalEvidence extends Partial<Evidence> {
    saved: boolean
}

interface IAnnotationEvidenceMap {
    [key: string]: ILocalEvidence[]
}

const getAnnotationsArray = (
    currentAnnotations: AnnotationTagWithEvidence[]
) => {
    return (
        (Array.isArray(currentAnnotations) &&
            currentAnnotations.length !== 0 &&
            currentAnnotations) ||
        []
    )
}

const getTagWithEvidence = (
    tagId: string,
    tagWithEvidence: AnnotationTagWithEvidence
) => {
    if (tagWithEvidence.id === tagId) {
        return tagWithEvidence
    }
}

const getEvidence = (
    tag: AnnotationTag,
    annotationsArray: AnnotationTagWithEvidence[]
): ILocalEvidence[] => {
    const annotationTagWithEvidence = annotationsArray.filter(
        (tagWithEvidence) => {
            return getTagWithEvidence(tag.id, tagWithEvidence)
        }
    )[0]

    const savedLocalEvidence: ILocalEvidence[] = annotationTagWithEvidence?.evidence?.items.map(
        (evidence) => {
            return {
                ...evidence,
                ...{ saved: true },
            }
        }
    )

    return savedLocalEvidence || []
}

const getAnnotationsMapFromTask = (currentTask: AllergyAnnotationTask) => {
    const annotationsObject: IAnnotationEvidenceMap = {}
    const currentAnnotations = currentTask.sample?.annotations
    const annotationsArray = getAnnotationsArray(currentAnnotations)

    currentTask.tags.forEach((tag) => {
        annotationsObject[tag.id] = getEvidence(tag, annotationsArray)
    })

    return annotationsObject
}

const AllergyAnnotationTool: FC = () => {
    const machineContext = useContext(ProjectMachineContext)
    const currentIndex = machineContext.machine.context.currentTaskIndex

    const project = machineContext.machine.context.project

    const taskCollectionKey = TaskTypeToTaskKeyMapping[
        project?.task_type
    ] as "allergy_tasks"

    const tasks = machineContext.machine.context.project?.[taskCollectionKey]

    const currentTask = tasks.items[currentIndex]

    const annotationsState = getAnnotationsMapFromTask(currentTask)

    const [annotations, setAnnotations] = useState(annotationsState)

    const updateItem = (tagId: string, evidence: ILocalEvidence) => {
        const tempEvidence = [...annotations[tagId]]
        const updatedEvidence = tempEvidence.map((currentEvidence) => {
            if (currentEvidence.id === evidence.id) {
                return { ...currentEvidence, ...evidence, saved: false }
            } else {
                return {
                    ...currentEvidence,
                }
            }
        })

        setAnnotations({
            ...annotations,
            [tagId]: updatedEvidence,
        })
    }

    const saveItem = (tagId: string, evidence: ILocalEvidence) => {
        const tempEvidence = [...annotations[tagId]]

        // TODO - Do an API call via the machine to save the Evidence, then sync to local
        const updatedEvidence = tempEvidence.map((currentEvidence) => {
            if (currentEvidence.id === evidence.id) {
                return { ...currentEvidence, ...evidence, saved: true }
            } else {
                return {
                    ...currentEvidence,
                    ...evidence,
                }
            }
        })

        setAnnotations({
            ...annotations,
            [tagId]: updatedEvidence,
        })
    }

    const removeItem = (tagId: string, index) => {
        const currentAnnotations = [...annotations[tagId]]
        currentAnnotations.splice(index, 1)

        setAnnotations({
            ...annotations,
            [tagId]: currentAnnotations,
        })
    }

    // function reducer(state, action) {
    //     switch (action.type) {
    //         case "toggle":
    //             return { shouldShow: !state.shouldShow }
    //         default:
    //             throw new Error()
    //     }
    // }

    // const [currentTaskState, setCurrentTaskState] = useReducer(
    //     reducer,
    //     defaultState
    // )

    return (
        <AllergyContainer flex={{ grow: 1, shrink: 1 }}>
            {/* {JSON.stringify(annotations, null, 4)} */}
            <AllergySampleText
                pad="medium"
                background="white"
                margin={{ bottom: "medium" }}
            >
                <Text size="medium" weight={500} color="brandGrey3">
                    Ingredient
                </Text>
                <Text size="xlarge">{currentTask.sample.text}</Text>
            </AllergySampleText>
            {currentTask.tags.map((tag) => {
                return (
                    <Allergy background="white" margin={{ bottom: "small" }}>
                        <Box pad="medium">
                            <Text
                                size="large"
                                weight="bold"
                                margin={{ bottom: "small" }}
                            >
                                {tag.name}
                            </Text>
                            <EvidenceSelection>
                                <Box>
                                    {annotations[tag.id].map(
                                        (evidence, index) => {
                                            return (
                                                <Box>
                                                    <EvidenceForm
                                                        title={
                                                            evidence.title ||
                                                            `Evidence ${index}`
                                                        }
                                                        evidence={evidence}
                                                        deleteEvidence={() => {
                                                            removeItem(
                                                                tag.id,
                                                                index
                                                            )
                                                        }}
                                                        saveEvidence={(
                                                            updatedEvidence: ILocalEvidence
                                                        ) => {
                                                            saveItem(
                                                                tag.id,
                                                                updatedEvidence
                                                            )
                                                        }}
                                                        updateEvidence={(
                                                            updatedEvidence: ILocalEvidence
                                                        ) => {
                                                            updateItem(
                                                                tag.id,
                                                                updatedEvidence
                                                            )
                                                        }}
                                                    />
                                                </Box>
                                            )
                                        }
                                    )}
                                </Box>
                                <Anchor
                                    onClick={() => {
                                        const currentEvidence = [
                                            ...annotations[tag.id],
                                        ]

                                        currentEvidence.push({
                                            id: v4(),
                                            title: `Evidence ${
                                                currentEvidence.length + 1
                                            }`,
                                            saved: false,
                                        })

                                        setAnnotations({
                                            ...annotations,
                                            [tag.id]: currentEvidence,
                                        })
                                    }}
                                >
                                    Add Evidence
                                </Anchor>
                            </EvidenceSelection>
                        </Box>
                    </Allergy>
                )
            })}
        </AllergyContainer>
    )
}

export default AllergyAnnotationTool

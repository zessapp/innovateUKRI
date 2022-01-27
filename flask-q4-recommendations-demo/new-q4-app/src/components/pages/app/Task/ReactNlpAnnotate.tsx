import { FC, useContext } from "react"
import NLPAnnotator from "react-nlp-annotate"
import dynamic from "next/dynamic"
import { ProjectMachineContext } from "src/machines/project"
import { AnnotationTag } from "src/API"
import styled from "styled-components"
import { IReactNerAnnotation } from "src/machines/types"
import NerAnnotationService from "src/machines/project/NerAnnotation/NerAnnotationService"
import { TaskTypeToTaskKeyMapping } from "src/machines/project/utils"

const labels = [
    {
        id: "gryffindor",
        displayName: "Gryffindor",
        description: "Daring, strong nerve and chivalry.",
    },
    {
        id: "slytherin",
        displayName: "Slytherin",
        description: "Cunning and ambitious. Possibly dark wizard.",
    },
]

function Loading() {
    return <div>Loading</div>
}

const NLPAnnotatorEditor = dynamic(() => import("react-nlp-annotate"), {
    ssr: false,
    loading: Loading,
}) as typeof NLPAnnotator

const NlpEditor = styled(NLPAnnotatorEditor)``

interface IReactNlp {
    id: string
    displayName: string
    description: string
}

function mapZessTagToReatNlpLabels(tags: AnnotationTag[]): IReactNlp[] {
    return tags.map((item) => {
        return {
            id: item.id,
            description: item.description,
            displayName: item.name,
        }
    })
}

const ReactNlpAnnotate: FC = () => {
    const machineContext = useContext(ProjectMachineContext)
    const currentIndex = machineContext.machine.context.currentTaskIndex

    const project = machineContext.machine.context.project

    const taskCollectionKey = TaskTypeToTaskKeyMapping[
        project?.task_type
    ] as "ner_tasks"

    const tasks = machineContext.machine.context.project?.[taskCollectionKey]

    const currentTask = tasks?.items[currentIndex]

    const tags = currentTask?.tags

    const currentAnnotations = currentTask?.sample.annotations

    const nerAnnotationService = new NerAnnotationService(currentTask)
    const defaultAnnotations =
        currentAnnotations && currentAnnotations.length !== 0
            ? nerAnnotationService.mapNerAnnotationsToReactAnnotations(
                  currentAnnotations
              )
            : null

    return (
        <NlpEditor
            key={currentIndex}
            hotkeysEnabled={false}
            type="label-sequence"
            initialSequence={defaultAnnotations}
            labels={mapZessTagToReatNlpLabels(tags)}
            multipleLabels={false}
            document={currentTask.sample.text}
            onChange={(output: IReactNerAnnotation[]) => {
                machineContext.send({
                    type: "UPDATE_NER_ANNOTATION",
                    index: currentIndex,
                    annotations: output,
                })
                console.log("Output is...", output)
            }}
            // this is just for label-relationships
            entityLabels={labels}
            relationshipLabels={labels}
        />
    )
}

export default ReactNlpAnnotate

import {
    AnnotationTag,
    NerAnnotation,
    NerAnnotationInput,
    NerAnnotationTask,
} from "src/API"
import { IReactNerAnnotation } from "../../types"

export default class NerAnnotationService {
    constructor(private task: NerAnnotationTask) {}

    getInitialTokenIndexes(): [number, number] {
        const startIndex = 0
        const endIndex = this.task.sample?.text.length || 0

        return [startIndex, endIndex]
    }

    getTag(annotation: IReactNerAnnotation) {
        const currentTag = this.task?.tags.find((value) => {
            return value.id === annotation.label
        })

        return currentTag
    }

    checkHasTag(currentTag: AnnotationTag) {
        if (!currentTag) {
            throw Error(
                `Can't find the tag that has been used to label the sample ${JSON.stringify(
                    this.task.sample
                )}`
            )
        }
    }

    createNerAnnotation(
        annotation: IReactNerAnnotation,
        startIndex: number,
        endIndex: number,
        currentTag: AnnotationTag
    ): NerAnnotationInput {
        return {
            text: annotation.text,
            tag: currentTag,
            start: startIndex,
            end: endIndex,
        }
    }

    updateIndexes(
        annotation: IReactNerAnnotation,
        annotations: IReactNerAnnotation[],
        currentIndex: number,
        startIndex: number,
        endIndex: number
    ) {
        if (currentIndex === 0) {
            endIndex = annotation.text.length - 1
        } else {
            startIndex += annotations[currentIndex - 1].text.length
            endIndex = startIndex + annotation.text.length - 1
        }

        return [startIndex, endIndex]
    }

    mapReactAnnotationsToNerAnnotations(
        annotations: IReactNerAnnotation[]
    ): NerAnnotationInput[] {
        let [startIndex, endIndex] = this.getInitialTokenIndexes()

        return annotations.map((annotation, index, annotations) => {
            const currentTag = this.getTag(annotation)

            // this.checkHasTag(currentTag)

            const [newStartIndex, newEndIndex] = this.updateIndexes(
                annotation,
                annotations,
                index,
                startIndex,
                endIndex
            )

            startIndex = newStartIndex
            endIndex = newEndIndex

            return this.createNerAnnotation(
                annotation,
                startIndex,
                endIndex,
                currentTag
            )
        })
    }

    mapNerAnnotationsToReactAnnotations(
        annotations: NerAnnotationInput[]
    ): IReactNerAnnotation[] {
        return annotations.map((annotation) => {
            return {
                text: annotation.text,
                label: annotation.tag?.id,
                textId: null,
            }
        })
    }
}

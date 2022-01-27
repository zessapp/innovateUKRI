import { IAnnotation } from "./Annotation"
import { AnnotationTaskType, IAnnotationTask } from "./AnnotationTask"

export interface INerAnnotation extends IAnnotation {
    text: string
}

export interface INerAnnotationTask extends IAnnotationTask {
    type: AnnotationTaskType.NER_TAGGING
    tasks: INerAnnotation[]
}

import { IAnnotation } from "./Annotation"

export enum AnnotationTaskType {
    CATEGORY_LABELING = "CATEGORY_LABELING",
    NER_TAGGING = "NER_TAGGING",
}

export interface IAnnotationTask {
    title: string
    description: string
    tasks: IAnnotation[]
    type: AnnotationTaskType
}

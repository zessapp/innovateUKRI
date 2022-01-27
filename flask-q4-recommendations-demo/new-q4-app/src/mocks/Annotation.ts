export enum AnnotationStatus {
    TO_DO = "TO_DO",
    CANT_ANNOTATE = "CANT_ANNOTATE",
    COMPLETE = "COMPLETE",
}

export interface IAnnotation {
    accessed_at: number
    modified_at: number
    modified_by: string
    status: AnnotationStatus
}

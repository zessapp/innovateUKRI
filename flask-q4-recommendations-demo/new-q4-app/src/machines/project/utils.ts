import { AnnotationTaskType } from "src/API"

export const TaskTypeToTaskKeyMapping = {
    [AnnotationTaskType.NER]: "ner_tasks",
    [AnnotationTaskType.CLASSIFICATION]: "classification_tasks",
    [AnnotationTaskType.ALLERGIES]: "allergy_tasks",
}

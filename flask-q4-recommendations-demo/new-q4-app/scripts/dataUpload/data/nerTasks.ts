import {
    AnnotationTag,
    AnnotationTaskStatus,
    NerAnnotationTask,
    Annotator,
    AnnotationTaskType,
    CreateAnnotatorInput,
} from "../../../src/API"
import { WithoutTypename } from "../../utils/types"
import { INerTaskBlueprint as INerTaskBlueprintVars } from "../taskBlueprints/NerTaskBlueprint"

export const blueprint: INerTaskBlueprintVars = {
    annotator_id: "f2a4e711-20d8-4467-8869-28de82996e2b",
    instruction: {
        full_instructions_url: "https://example.com",
        text:
            "Please highlight the ingredient information in this recipe sentence",
    },
    project_id: "c633b0c6-359d-49b7-8108-a653b1b01a15",
    sample: {
        text: "",
        annotations: [],
    },
    status: AnnotationTaskStatus.TODO,
    tags: [
        {
            id: "raw",
            description: "Raw Food",
            name: "RAW",
        },
        {
            id: "prep",
            description: "Prepared Food",
            name: "PREP",
        },
        {
            id: "not-ing",
            description: "Not Ingredient",
            name: "NOT_ING",
        },
    ],
    type: AnnotationTaskType.NER,
    metadata: "{}",
}

export const tasks: Partial<WithoutTypename<NerAnnotationTask>>[] = [
    {
        id: "957278a0-1974-49ff-8505-f797c7c66843",
        sample: {
            text: "1 tbsp salt",
            annotations: [],
        },
    },
]

export const annotator: WithoutTypename<CreateAnnotatorInput> = {
    id: "522866b0-8b81-4fa5-93c3-85a9e7a7aa80",
    name: "Hiren Umradia",
    email: "hiren@zess.co",
    username: "hirenumradia",
}

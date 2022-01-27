import {
    AllergyAnnotationSample,
    AllergyAnnotationTask,
    ClassificationAnnotationSample,
    ClassificationAnnotationTask,
    CreateAllergyAnnotationTaskInput,
    CreateClassificationAnnotationTaskInput,
    CreateNerAnnotationTaskInput,
    NerAnnotationSample,
    NerAnnotationTask,
} from "../../src/API"

type OmitDistributive<T, K extends PropertyKey> = T extends any
    ? T extends object
        ? // eslint-disable-next-line no-use-before-define
          Id<OmitRecursively<T, K>>
        : T
    : never
type Id<T> = {} & { [P in keyof T]: T[P] } // Cosmetic use only makes the tooltips expad the type can be removed
type OmitRecursively<T extends any, K extends PropertyKey> = Omit<
    { [P in keyof T]: OmitDistributive<T[P], K> },
    K
>

export type WithoutTypename<T> = OmitRecursively<T, "__typename">

export type AnnotationTaskUnion =
    | ClassificationAnnotationTask
    | NerAnnotationTask
    | AllergyAnnotationTask

export type PartialAnnotationTaskInputUnion =
    | Partial<CreateNerAnnotationTaskInput>
    | Partial<CreateClassificationAnnotationTaskInput>
    | Partial<CreateAllergyAnnotationTaskInput>

export type AnnotationSampleUnion =
    | NerAnnotationSample
    | ClassificationAnnotationSample
    | AllergyAnnotationSample

export type CreateAnnotationTaskInputUnion =
    | CreateNerAnnotationTaskInput
    | CreateClassificationAnnotationTaskInput
    | CreateAllergyAnnotationTaskInput

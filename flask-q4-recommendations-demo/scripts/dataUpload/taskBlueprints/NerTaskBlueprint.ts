import {
    AnnotationTag,
    AnnotationTaskInstruction,
    AnnotationTaskIssue,
    AnnotationTaskStatus,
    AnnotationTaskType,
    CreateNerAnnotationTaskInput,
    NerAnnotationSample,
    NerAnnotationTask,
} from "../../../src/API"
import { WithoutTypename } from "../../utils/types"
import { BaseTaskBlueprint } from "./BaseTaskBlueprint"

export interface INerTaskBlueprint
    extends WithoutTypename<CreateNerAnnotationTaskInput> {
    createTask(
        id: string,
        taskProps: Partial<CreateNerAnnotationTaskInput>
    ): WithoutTypename<NerAnnotationTask>
}

export class NerTaskBlueprint
    extends BaseTaskBlueprint
    implements INerTaskBlueprint {
    constructor(
        _id: string,
        _project_id: string,
        _annotator_id: string,
        _instruction: WithoutTypename<AnnotationTaskInstruction>,
        _type: AnnotationTaskType,
        private _tags: WithoutTypename<AnnotationTag[]>,
        _status: AnnotationTaskStatus,
        private _sample?: WithoutTypename<NerAnnotationSample>,
        _metadata?: string,
        _allergyAnnotationTaskIssueId?: string
    ) {
        super(
            _id,
            _project_id,
            _annotator_id,
            _instruction,
            _type,
            _status,
            _metadata,
            _allergyAnnotationTaskIssueId
        )
    }

    get tags() {
        return this._tags
    }

    set tags(tags: WithoutTypename<AnnotationTag[]>) {
        this.tags = tags
    }

    get sample() {
        return this._sample
    }

    set sample(sample: WithoutTypename<NerAnnotationSample>) {
        this._sample = sample
    }

    createTask(
        id: string,
        taskProps: Partial<CreateNerAnnotationTaskInput>
    ): WithoutTypename<NerAnnotationTask> {
        const finalTask: any = {
            ...this.toJSON(),
            ...taskProps,
            id: id,
        }

        this.validateIds(finalTask)

        return finalTask as WithoutTypename<NerAnnotationTask>
    }
}

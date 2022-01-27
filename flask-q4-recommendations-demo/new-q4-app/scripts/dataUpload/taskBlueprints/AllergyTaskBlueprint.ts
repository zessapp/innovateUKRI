import {
    AnnotationTag,
    AnnotationTaskInstruction,
    AnnotationTaskIssue,
    AnnotationTaskStatus,
    AnnotationTaskType,
    CreateAllergyAnnotationTaskInput,
    AllergyAnnotationSample,
    AllergyAnnotationTask,
} from "../../../src/API"
import { WithoutTypename } from "../../utils/types"
import { BaseTaskBlueprint } from "./BaseTaskBlueprint"

export interface IAllergyTaskBlueprint
    extends WithoutTypename<CreateAllergyAnnotationTaskInput> {
    createTask(
        id: string,
        taskProps: Partial<CreateAllergyAnnotationTaskInput>
    ): WithoutTypename<AllergyAnnotationTask>
}

export class AllergyTaskBlueprint
    extends BaseTaskBlueprint
    implements IAllergyTaskBlueprint {
    constructor(private _task: CreateAllergyAnnotationTaskInput) {
        super(
            _task.id || "1234-1234-1234-1234",
            _task.project_id,
            _task.annotator_id,
            _task.instruction,
            _task.type,
            _task.status,
            _task.metadata || "{}"
        )
    }

    get tags() {
        return this._task.tags
    }

    set tags(tags: WithoutTypename<AnnotationTag[]>) {
        this.tags = tags
    }

    get sample() {
        return this._task.sample
    }

    set sample(sample: WithoutTypename<AllergyAnnotationSample>) {
        this._task.sample = sample
    }

    createTask(
        id: string,
        taskProps: Partial<CreateAllergyAnnotationTaskInput>
    ): WithoutTypename<AllergyAnnotationTask> {
        console.log("BEFORE", this.toJSON())
        const finalTask: any = {
            ...this.toJSON(),
            ...taskProps,
            id: id,
        }

        console.log("AFTER", taskProps)

        this.validateIds(finalTask)

        return finalTask as WithoutTypename<AllergyAnnotationTask>
    }

    protected toJSON(): WithoutTypename<CreateAllergyAnnotationTaskInput> {
        return {
            id: this.id,
            project_id: this.project_id,
            annotator_id: this.annotator_id,
            instruction: this.instruction,
            type: this.type,
            status: this.status,
            metadata: this.metadata,
            sample: this.sample,
            tags: this.tags,
            allergyAnnotationTaskIssueId: this.allergyAnnotationTaskIssueId,
        }
    }
}

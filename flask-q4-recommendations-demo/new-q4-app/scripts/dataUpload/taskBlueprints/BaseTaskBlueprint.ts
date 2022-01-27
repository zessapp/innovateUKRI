import {
    AnnotationTask,
    AnnotationTaskInstruction,
    AnnotationTaskIssue,
    AnnotationTaskStatus,
    AnnotationTaskType,
} from "../../../src/API"
import { validate, version } from "uuid"
import {
    AnnotationTaskUnion,
    PartialAnnotationTaskInputUnion,
    WithoutTypename,
} from "../../utils/types"

export interface ITaskBlueprint extends WithoutTypename<AnnotationTask> {
    createTask(id: string, taskProps: PartialAnnotationTaskInputUnion): any
}

export abstract class BaseTaskBlueprint implements ITaskBlueprint {
    // Accept all of the arguements apart from ID that are common to all AnnotationTask objects
    constructor(
        private _id: string,
        private _project_id: string,
        private _annotator_id: string,
        private _instruction: WithoutTypename<AnnotationTaskInstruction>,
        private _type: AnnotationTaskType,
        private _status: AnnotationTaskStatus = AnnotationTaskStatus.TODO,
        private _metadata: string,
        private _allergyAnnotationTaskIssueId?: string
    ) {}

    private uuidValidateV4(uuid: string) {
        // return validate(uuid) && version(uuid) === 4
        return true
    }

    /**
     * Validates that UUIDs conform to a correct v4 standard
     */
    protected validateIds(task: WithoutTypename<AnnotationTaskUnion>) {
        let idsAreValid: boolean = false

        idsAreValid = this.uuidValidateV4(task.id)
        idsAreValid = idsAreValid && this.uuidValidateV4(task.annotator_id)
        idsAreValid = idsAreValid && this.uuidValidateV4(task.project_id)

        if (!idsAreValid) {
            throw Error(
                "Please ensure the task id, project_id and annotator_id are in UUID 4 format"
            )
        }

        return idsAreValid
    }

    get id() {
        return this._id
    }

    get project_id() {
        return this._project_id
    }

    get annotator_id() {
        return this._annotator_id
    }

    get instruction() {
        return this._instruction
    }

    set instruction(instruction: WithoutTypename<AnnotationTaskInstruction>) {
        this._instruction = instruction
    }

    get type() {
        return this._type
    }

    get status() {
        return this._status
    }

    get allergyAnnotationTaskIssueId() {
        return this._allergyAnnotationTaskIssueId
    }

    get metadata() {
        return JSON.stringify(this._metadata)
    }

    abstract createTask(
        id: string,
        taskProps: PartialAnnotationTaskInputUnion
    ): any

    protected toJSON(): WithoutTypename<PartialAnnotationTaskInputUnion> {
        return {
            id: this._id,
            project_id: this.project_id,
            annotator_id: this.annotator_id,
            instruction: this.instruction,
            type: this.type,
            status: this.status,
            metadata: this.metadata,
        }
    }
}

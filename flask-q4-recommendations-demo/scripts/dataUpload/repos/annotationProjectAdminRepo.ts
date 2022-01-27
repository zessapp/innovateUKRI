import { CreateAnnotationProjectInput } from "../../../src/API"
import { createAnnotationProject } from "../../../src/graphql/mutations"
import { WithoutTypename } from "../../utils/types"
import { BaseAnnotationAdminRepo } from "./BaseAnnotationAdminRepo"

export class AnnotationProjectAdminRepo extends BaseAnnotationAdminRepo<
    WithoutTypename<CreateAnnotationProjectInput>
> {
    constructor() {
        super()
    }

    async createProject(
        project: WithoutTypename<CreateAnnotationProjectInput>
    ) {
        try {
            await this.login()

            const createdProject = await this.create(
                createAnnotationProject,
                project,
                "createAnnotationProject"
            )

            console.log(
                "Project Created",
                JSON.stringify(createdProject, null, 4)
            )

            return createdProject
        } catch (e) {
            console.log("Error creating project", e)
        }
    }
}

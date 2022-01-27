import { CreateAnnotatorInput } from "../../../src/API"
import { createAnnotator } from "../../../src/graphql/mutations"
import { WithoutTypename } from "../../utils/types"
import { BaseAnnotationAdminRepo } from "./BaseAnnotationAdminRepo"

export class AnnotationTagAdminRepo extends BaseAnnotationAdminRepo<
    WithoutTypename<CreateAnnotatorInput>
> {
    constructor() {
        super()
    }

    async createAnnotator(annotator: WithoutTypename<CreateAnnotatorInput>) {
        try {
            await this.login()

            const createdAnnotator = await this.create(
                createAnnotator,
                annotator,
                "CreateAnnotator"
            )

            console.log(
                "Annotator Created",
                JSON.stringify(createdAnnotator, null, 4)
            )
        } catch (e) {
            console.log("Error creating annotator", e)
        }
    }
}

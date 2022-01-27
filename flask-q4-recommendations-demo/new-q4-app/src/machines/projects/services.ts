import { API, graphqlOperation } from "aws-amplify"
import { AnnotationProject, ListAnnotationProjectsQuery } from "src/API"
import { listAnnotationProjects } from "../../graphql/queries"

export const getProjects = async () => {
    try {
        const response = (await API.graphql(
            graphqlOperation(listAnnotationProjects)
        )) as any

        console.log("list projects response", response)

        const data = response.data as ListAnnotationProjectsQuery

        const projects: AnnotationProject[] = data.listAnnotationProjects.items

        return projects
    } catch (e) {
        console.log("fetching projects error", e)
        throw e
    }
}

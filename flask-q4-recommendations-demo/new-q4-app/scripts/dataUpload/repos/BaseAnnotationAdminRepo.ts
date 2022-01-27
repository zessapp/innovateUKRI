import Amplify, { API, graphqlOperation } from "aws-amplify"
import { getLoginVars } from "../../utils"
import awsExports from "../../../src/aws-exports"

export class BaseAnnotationAdminRepo<T> {
    constructor() {
        Amplify.configure(awsExports)
    }

    /**
     * Login to the amplify endpoint using your admin credentials
     *
     * You must provide an environment names USERNAME and PASSWORD for this to work
     */
    protected async login() {
        const [username, password] = getLoginVars()

        await API.Auth.signIn(username, password)
    }

    /**
     * Parses the task creation data
     *
     * @param response - The graphql response from the amplify endpoint
     * @returns - The created task
     */
    private parseData = (response: any, queryName: string) => {
        const data = response.data
        return data[queryName]
    }

    /**
     *
     * @param mutationQuery - The graphql query to excecute
     * @param task - The task to upload
     * @returns - The created task
     */
    protected async create(mutationQuery: string, task: T, queryName: string) {
        try {
            const response = await API.graphql(
                graphqlOperation(mutationQuery, {
                    input: task,
                })
            )

            console.log("SOME RESPONSE", response)

            return this.parseData(response, queryName)
        } catch (e) {
            console.log("SOME ERROR", JSON.stringify(e))
        }
    }
}

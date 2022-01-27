import { Zess } from "zess-client"
import { NextRouter } from "next/router"

export const isUserIsLoggedIn = async (
    callback: Function,
    router: NextRouter
) => {
    const isLoggedIn = await Zess.Api.isLoggedIn()

    if (isLoggedIn) {
        return callback(isLoggedIn)
    } else {
        router.push("/app/login")
    }
}

export const logoutUser = async (callback: Function) => {
    await Zess.Api.signOut(callback)
}

export const graphQLQuery = (query: any, variables?: {}) => {
    Zess.Api.graphQLQuery(Zess.graphqlOperation(query), variables)
}

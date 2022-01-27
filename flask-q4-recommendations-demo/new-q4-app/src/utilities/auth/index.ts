import { Auth } from "aws-amplify"

async function getCognitoGroups() {
    return Auth.currentAuthenticatedUser().then((data) => {
        return data.signInUserSession.accessToken.payload[
            "cognito:groups"
        ] as Array<any>
    })
}

export async function isUserAdmin() {
    const groups = await getCognitoGroups()
    console.log("IS ADMIN", groups?.includes("admin"))
    return groups?.includes("admin")
}

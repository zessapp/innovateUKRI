export function getLoginVars() {
    const username = process.env.USERNAME
    const password = process.env.PASSWORD

    if (typeof username === "undefined" || typeof password === "undefined") {
        throw Error(
            "Please enter a username or password via Environment Variables USERNAME and PASSWORD"
        )
    }

    return [username, password]
}

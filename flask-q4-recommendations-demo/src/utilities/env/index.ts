export function getEnvironment(env) {
    switch (env) {
        case 'prod':
            return 'prod'
        case 'staging':
            return 'staging'
        case 'dev':
            return 'dev'
        default:
            return 'dev'
    }
}
// import Constants from 'expo-constants';
import dev from './dev'
import staging from './staging'
import prod from './production'

const ENV: { staging: IAppConfig, prod: IAppConfig, dev: IAppConfig } = {
  staging,
  prod,
  dev
}

export interface IEndpoint {
  protocol: string,
  hostname: string,
  port: number,
  context: string
}

export interface IAppConfig {
  Public: {
    Services: {
      endpoint: IEndpoint
    },
    Mobile: {
      endpoint: IEndpoint
    },
    Assets: {
      endpoint: IEndpoint
    }
  }
}

// TODO - Need to sort out deployment environment configs once the APIs are in production
export function getEnvVars(env?: string): IAppConfig {
  if (env === null || env === undefined || env === '' || env === 'default' || env === 'dev') return ENV.dev
  if (env.indexOf('staging') !== -1) return ENV.staging
  if (env.indexOf('prod') !== -1) return ENV.prod

  throw new Error(`Unable to determine config for env ${env}`)
}

export type environment = 'dev' | 'staging' | 'prod'

export function getEnvironment(env?: string): environment {
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

// TODO - Figure out how we unify config across all environments including react-native, web and node

// export function ReactNativeConfig() {
//   return getEnvVars(Constants.manifest.releaseChannel)
// }

export default getEnvVars(process.env.NODE_ENV)

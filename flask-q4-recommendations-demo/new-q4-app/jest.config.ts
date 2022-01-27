import type { Config } from "@jest/types"
import BaseConfig from "../../jest.config.base"
import PackageJson from "./package.json"

const ModuleConfig: Config.InitialOptions = {
    ...BaseConfig,
    name: PackageJson.name,
    displayName: PackageJson.name,
    testEnvironment: "jsdom",
    setupFiles: ["react-app-polyfill/jsdom"],
    setupFilesAfterEnv: ["./src/setupTests.js"],
}

export default ModuleConfig

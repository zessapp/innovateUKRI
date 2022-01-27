import { configureStore } from "@reduxjs/toolkit"
import { normalize, schema } from "normalizr"
import { useDispatch } from "react-redux"
import rootReducer from "../../reducers/rootReducer"

export const zessReduxStore = configureStore({
    reducer: rootReducer,
})

export function createZessReduxStore() {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof zessReduxStore.getState>
export type AppDispatch = typeof zessReduxStore.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

// TODO - Write the reducer and normalistion code

// Define a menu schema
const menu = new schema.Entity("menus")

export function normaliseMenuState(menuData: object) {
    try {
        const normalisedMenuData = normalize(menuData, menu)
        console.log("Normalised Menu Data", normalisedMenuData)
    } catch (e) {
        console.log("Failed to normalise state")
    }
}

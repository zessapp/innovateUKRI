import { combineReducers, Action } from "@reduxjs/toolkit"
import { ThunkAction } from "redux-thunk"
import registerInterestReducer from "./registerInterest"
import menusReducer from "./tasks"

const rootReducer = combineReducers({
    registerInterest: registerInterestReducer,
    menus: menusReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default rootReducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "./rootReducer"
import { Zess, Query, Mutation } from "zess-client"
import { Menu } from "zess-client/src/models"
import {
    // DeleteMenuMutation,
    ListMenusQuery,
    // CreateMenuMutation,
    // UpdateMenuMutation,
    GetMenuQuery,
} from "zess-client/lib/API"

// TODO - Research how we make the models consistent end-to-end

interface IMenusState {
    nextToken?: string
    data: ListMenusQuery["listMenus"]
}

const initialState: any = {
    data: [],
}

// TODO - Handle pagination
// The slice creates the actions and assigns the reducer
const menusSlice = createSlice({
    name: "menus",
    initialState: initialState,
    reducers: {
        listMenusReducer: (
            state,
            action: PayloadAction<Zess.ZessGraphQLResponse<any>>
        ) => {
            state.data = [...action.payload.data.listMenus.items]
        },
        deleteMenuReducer: (
            state,
            action: PayloadAction<Zess.ZessGraphQLResponse<any>>
        ) => {
            let i = state.data.length
            while (i--) {
                if (state.data[i].id === action.payload.data.deleteMenu.id) {
                    state.data.splice(i, 1)
                }
            }
        },
        createMenuReducer: (
            state,
            action: PayloadAction<Zess.ZessGraphQLResponse<any>>
        ) => {
            state.data = [...state.data, action.payload.data.createMenu]
        },
        updateMenuReducer: (
            state,
            action: PayloadAction<Zess.ZessGraphQLResponse<any>>
        ) => {
            state.data = [...state.data, action.payload.data.updateMenu]
        },
        getMenuReducer: (
            state,
            action: PayloadAction<Zess.ZessGraphQLResponse<any>>
        ) => {
            state.data = [...state.data, action.payload.data.getMenu]
        },
    },
})

// Export the actions
export const {
    getMenuReducer,
    listMenusReducer,
    deleteMenuReducer,
    createMenuReducer,
    updateMenuReducer,
} = menusSlice.actions

// export the reducer from the slice
export default menusSlice.reducer

// export the type of the state
export type MenusState = ReturnType<typeof menusSlice.reducer>

// Thunks have to be defined seperately from slices when using Redux Toolkit
export const getMenu = (id: string): AppThunk => async (dispatch) => {
    try {
        // const response = await Zess.Api.get<GetMenuQuery>(Query.getMenu, id)
        // dispatch(getMenuReducer(response))
        // return response

        return true
    } catch (error) {
        console.log("Error loading menus", error)
    }
}

// Thunks have to be defined seperately from slices when using Redux Toolkit
export const listMenus = (nextToken?: string): AppThunk => async (dispatch) => {
    try {
        // const response = await Zess.Api.list<ListMenusQuery>(
        //     Query.listMenus,
        //     nextToken
        // )
        // dispatch(listMenusReducer(response))
    } catch (error) {
        console.log("Error loading menus", error)
    }
}

export const deleteMenu = (id: string): AppThunk => async (dispatch) => {
    try {
        // const response = await Zess.Api.delete<DeleteMenuMutation>(
        //     Mutation.deleteMenu,
        //     id
        // )
        // dispatch(deleteMenuReducer(response))
    } catch (error) {
        console.log("Error deleting menu", error)
    }
}

export const createMenu = (menu: Omit<Menu, "id">): AppThunk => async (
    dispatch
) => {
    try {
        // const response = await Zess.Api.create<
        //     CreateMenuMutation,
        //     Omit<Menu, "id">
        // >(Mutation.createMenu, menu)
        // dispatch(createMenuReducer(response))
    } catch (error) {
        console.log("Error creating menu", error)
    }
}

export const updateMenu = (menu: Menu): AppThunk => async (dispatch) => {
    try {
        // const response = await Zess.Api.update<UpdateMenuMutation, Menu>(
        //     Mutation.updateMenu,
        //     menu
        // )
        // dispatch(updateMenuReducer(response))
    } catch (error) {
        console.log("Error creating menu", error)
    }
}

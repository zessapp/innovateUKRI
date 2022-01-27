import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "./rootReducer"
// import { Zess, Mutation } from "zess-client"
import { Zess, Mutation, GraphQLTypes } from "zess-client"
import { GRAPHQL_AUTH_MODE } from "zess-client/lib/api/Zess"
// import { CreateTempInterestMutation } from "zess-client/lib/API"
// import { AppThunk } from "./rootReducer"

interface IRegisterInterestState {
    hasRegistered: boolean
    isModalOpen: boolean
    email: string
    name: string
    registerInterest: any
}

const initialState: IRegisterInterestState = {
    hasRegistered: false,
    isModalOpen: false,
    email: null,
    name: null,
    registerInterest: null,
}

// The slice creates the actions and assigns the reducer
const registerInterestSlice = createSlice({
    name: "registerInterest",
    initialState: initialState,
    reducers: {
        hasRegistered: (state, action: PayloadAction<boolean>) => {
            state.hasRegistered = action.payload
        },
        showModal: (state, action: PayloadAction<boolean>) => {
            state.isModalOpen = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        registerInterest: (state, action: PayloadAction) => {
            state.registerInterest = action.payload
        },
    },
})

// Export the actions
export const {
    hasRegistered,
    showModal,
    registerInterest,
    setEmail,
} = registerInterestSlice.actions

// export the reducer from the slice
export default registerInterestSlice.reducer

export type RegisterInterestState = ReturnType<
    typeof registerInterestSlice.reducer
>

// TODO - Complete this with Amplify
export const submitRegisterInterest = (
    name: string,
    email: string,
    dietaryNeeds: string
): AppThunk => async (dispatch, state) => {
    try {
        const response = await Zess.Api.create<
            GraphQLTypes.PreRegistration,
            GraphQLTypes.PreRegisterMutationVariables
        >(
            Mutation.preRegister,
            {
                preReg: {
                    email: email,
                    name: name,
                    dietaryNeeds: dietaryNeeds,
                },
            },
            null,
            GRAPHQL_AUTH_MODE.AWS_IAM
        )

        if ("data" in response && "preRegister" in response.data) {
            dispatch(hasRegistered(true))
        }

        return response
    } catch (error) {
        console.log("Error registering interest", error)
    }
}

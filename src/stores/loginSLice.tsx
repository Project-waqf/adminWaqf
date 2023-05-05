import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginType } from "../utils/types/DataType";
export interface User { 
    email: string
    password: string
}

interface AuthState {
    isAuthenticated: boolean
    user?: LoginType
}

const initialState: AuthState = {
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginSuccess(state, action: PayloadAction<LoginType>){
            state.isAuthenticated = true
            state.user = action.payload
        },
        logout(state){
            state.isAuthenticated = false
            state.user = undefined
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions
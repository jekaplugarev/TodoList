import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {setIsLoggedIn} from '../features/Login/auth-reducer'
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils'
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = appSlice.reducer
export const {setAppError, setAppStatus, setInitialized} = appSlice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: true}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setInitialized({isInitialized: true}))
        })
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
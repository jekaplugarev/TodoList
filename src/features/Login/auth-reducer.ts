import {authAPI, LoginParamsType} from '../../api/todolists-api'
import {setAppStatus} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {AppThunkType} from '../../app/store';
import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {Dispatch} from 'redux';

const initialState: InitialStateType = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = authSlice.reducer
export const {setIsLoggedIn} = authSlice.actions

// thunks
export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                const action = setIsLoggedIn({value: true})
                dispatch(action)
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = (): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                const action = setIsLoggedIn({value: false})
                dispatch(action)
                dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

type InitialStateType = {
    isLoggedIn: boolean
}
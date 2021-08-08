export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export type ActionAppType = SetAppStatusActionsType | SetAppErrorActionsType

export const appReducer = (state: InitialStateType = initialState, action: ActionAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)

export const setAppErrorAC = (error: null | string) => ({
    type: 'APP/SET-ERROR',
    error
} as const)

export type SetAppStatusActionsType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionsType = ReturnType<typeof setAppErrorAC>
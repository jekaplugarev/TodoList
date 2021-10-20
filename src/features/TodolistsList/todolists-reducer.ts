import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatus} from '../../app/app-reducer'
import {fetchTasksTC} from './tasks-reducer';
import {AppThunkType} from '../../app/store';
import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolist(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitle(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolists(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        clearTodosData() {
            return []
        },
    }
})

export const todolistsReducer = todolistsSlice.reducer
export const {
    removeTodolist,
    addTodolist,
    changeTodolistTitle,
    changeTodolistFilter,
    changeTodolistEntityStatus,
    setTodolists,
    clearTodosData
} = todolistsSlice.actions

// thunks
export const fetchTodolistsTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolists({todolists: res.data}))
                dispatch(setAppStatus({status: 'succeeded'}))
                return res.data
            })
            .then((todos) => {
                todos.forEach((tl) => {
                    dispatch(fetchTasksTC(tl.id))
                })
            })
    }
}
export const removeTodolistTC = (todolistId: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(setAppStatus({status: 'loading'}))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(changeTodolistEntityStatus({id: todolistId, status: 'loading'}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolist({id: todolistId}))
                //скажем глобально приложению, что асинхронная операция завершена
                dispatch(setAppStatus({status: 'succeeded'}))
            })
    }
}
export const addTodolistTC = (title: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolist({todolist: res.data.data.item}))
                dispatch(setAppStatus({status: 'succeeded'}))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitle({id, title}))
            })
    }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

import {FilterType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterType
    todoListID: string
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}

export type ActionType = RemoveTodoListAT | ChangeTodoListTitleAT | AddTodoListAT | ChangeTodoListFilterAT

export const todoListID_1 = v1()
export const todoListID_2 = v1()

const initialState: Array<TodoListType> = [
    // {id: todoListID_1, title: 'What to learn', filter: 'all'},
    // {id: todoListID_2, title: 'What to buy', filter: 'all'},
]

export const todoListsReducer = (state = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListID,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        default:
            return state
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID
    }
}

export const addTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todoListID: v1()
    }
}

export const changeTodoListFilterAC = (filter: FilterType, todoListID: string): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todoListID
    }
}

export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todoListID
    }
}
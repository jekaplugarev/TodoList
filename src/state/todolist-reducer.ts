import {TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: string
    todoListID: string
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}

export type ActionType = RemoveTodoListAT | ChangeTodoListTitleAT | AddTodoListAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all'
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID
    }
}

export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title
    }
}

export const ChangeTodoListFilterAC = (filter: string, todoListID: string): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todoListID
    }
}

export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todoListID
    }
}
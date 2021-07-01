import React from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterType = 'all' | 'completed' | 'active'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(
        state => state.todoLists
    )
    const tasks = useSelector<AppRootStateType, TasksStateType>(
        state => state.tasks
    )
    const dispatch = useDispatch()

    function removeTask(taskId: string, todoListID: string) {
        dispatch(removeTaskAC(taskId, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskId: string, checked: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskId, checked, todoListID))
    }

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskId, title, todoListID))
    }

    function changeFilter(filter: FilterType, todoListID: string) {
        dispatch(changeTodoListFilterAC(filter, todoListID))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = removeTodoListAC(todoListID)
        dispatch(action)
    }

    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatch(action)
    }

    function getFilteredTasks(tl: TodoListType) {
        if (tl.filter === 'completed') {
            return tasks[tl.id].filter(task => task.isDone)
        } else if (tl.filter === 'active') {
            return tasks[tl.id].filter(task => !task.isDone)
        }
        return tasks[tl.id]
    }

    const todoListComponents = todoLists.map(tl => {
        const taskForTodoList = getFilteredTasks(tl)

        return (
            <Grid item key={tl.id} style={{width: '30%', minWidth: '300px'}}>
                <Paper elevation={5} style={{margin: '0 20px 20px 20px', padding: '20px', borderRadius: '10px'}}>
                    <Todolist
                        todoListID={tl.id}
                        filter={tl.filter}
                        titleTodoList={tl.title}
                        tasks={taskForTodoList}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        TodoLists
                    </Typography>
                    <Button
                        color={'inherit'}
                        variant={'outlined'}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <div className="container">
                <div className="addTodoList">
                    <div className="addItem">
                        <AddItemForm addItem={addTodoList} label={'Add TodoList...'}/>
                    </div>
                </div>
                <div className="todoLists">
                    {todoListComponents}
                </div>
            </div>
        </div>
    )
}
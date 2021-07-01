import React, {useReducer} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

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

export function AppWithReducer() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Sneakers', isDone: false},
        ],
    })

    function removeTask(taskId: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskId, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskId: string, checked: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, checked, todoListID))
    }

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListID))
    }

    function changeFilter(filter: FilterType, todoListID: string) {
        dispatchToTodoLists(changeTodoListFilterAC(filter, todoListID))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodoLists(changeTodoListTitleAC(title, todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = removeTodoListAC(todoListID) // необходимо иначе ошибка при map, т.к. разные v1()
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }

    function addTodoList(title: string) {
        let action = addTodoListAC(title) // необходимо иначе ошибка при map, т.к. разные v1()
        dispatchToTasks(action)
        dispatchToTodoLists(action)
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
import React, {useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

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
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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

    function removeTask(id: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(task => task.id !== id)
        setTasks({...tasks})
    }

    function changeFilter(filter: FilterType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title, //title: title
            isDone: false
        }
        const copyTasks = {...tasks}
        copyTasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyTasks)
    }

    function changeTaskStatus(taskId: string, checked: boolean, todoListID: string) { //Принимаем checked из значения состояния чекбокса
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(task => task.id === taskId ? {...task, isDone: checked} : task)
        setTasks(copyTasks)
    }

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(task => task.id === taskId ? {...task, title} : task)
        setTasks(copyTasks)
    }

    function getFilteredTasks(tl: TodoListType) {
        if (tl.filter === 'completed') {
            return tasks[tl.id].filter(task => task.isDone)
        } else if (tl.filter === 'active') {
            return tasks[tl.id].filter(task => !task.isDone)
        }
        return tasks[tl.id]
    }

    function removeTodoList(todoListID: string) {
        setTodoLists((todoLists.filter(tl => tl.id !== todoListID)))
        const copyTasks = {...tasks}
        delete copyTasks[todoListID]
        setTasks(copyTasks)
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
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
                {/*<Container maxWidth={'sm'}>*/}
                {/*<Grid container justify={'center'}>*/}
                <div className="addTodoList">
                    <div className="addItem">
                        <AddItemForm addItem={addTodoList} label={'Add TodoList...'}/>
                    </div>
                </div>
                {/*</Grid>*/}
                {/*<Grid container justify={'center'} xs={12}>*/}
                <div className="todoLists">
                    {todoListComponents}
                </div>
                {/*</Grid>*/}
                {/*</Container>*/}
            </div>
        </div>
    )
}
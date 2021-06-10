import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from './App';
import {Button, Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from './EditableSpan';
import {AddItemForm} from './AddItemForm';
import {HighlightOff} from '@material-ui/icons';

type PropsType = {
    todoListID: string
    titleTodoList: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, checked: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {
    const onClickSetAllFilter = () => {
        props.changeFilter('all', props.todoListID)
    }
    const onClickSetActiveFilter = () => {
        props.changeFilter('active', props.todoListID)
    }
    const onClickSetCompletedFilter = () => {
        props.changeFilter('completed', props.todoListID)
    }
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title: string) => props.addTask(title, props.todoListID) //callback функция из App по созданию таски
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    const tasksElements = props.tasks.map(task => { //Для каждого объекта массива tasks
            const removeTask = () => props.removeTask(task.id, props.todoListID)
            const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, event.currentTarget.checked, props.todoListID)
            }
            const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListID)

            return (
                <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                    <Checkbox
                        color={'primary'}
                        checked={task.isDone}
                        className="checkbox"
                        onChange={changeTaskStatus}
                    />
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    checked={task.isDone}*/}
                    {/*    className="checkbox"*/}
                    {/*    onChange={changeTaskStatus} //На событие onChange через пропсы передаем функцию с промапленой task.id и значением состояния чекбокса*/}
                    {/*/>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton onClick={removeTask} size={'medium'}>
                        <HighlightOff fontSize={'default'}/>
                    </IconButton>
                    {/*<button onClick={removeTask} className="btnDel">*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"*/}
                    {/*         className="bi bi-x" viewBox="0 0 16 16">*/}
                    {/*        <path*/}
                    {/*            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>*/}
                    {/*    </svg>*/}
                    {/*</button>*/}
                </li>)
        }
    )

    return (
        <div className="container">
            <div className="header">
                <h3 className="titleTodoList">
                    <EditableSpan title={props.titleTodoList} changeTitle={changeTodoListTitle}/>
                </h3>
                <IconButton onClick={removeTodoList} size={'medium'}>
                    <HighlightOff fontSize={'default'}/>
                </IconButton>
                {/*<button className="btnDel">*/}
                {/*    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"*/}
                {/*         className="bi bi-x" viewBox="0 0 16 16">*/}
                {/*        <path*/}
                {/*            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>*/}
                {/*    </svg>*/}
                {/*</button>*/}
            </div>
            <AddItemForm addItem={addTask} label={'Task...'}/>
            <ul className="tasks">
                {tasksElements}
            </ul>
            <div className="filter">
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickSetAllFilter}
                    style={{marginRight: '10px'}}
                    // className={props.filter === 'all' ? 'activeFilter' : 'btnFilter'}
                >All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickSetActiveFilter}
                    style={{marginRight: '10px'}}
                    // className={props.filter === 'active' ? 'activeFilter' : 'btnFilter'}
                >Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickSetCompletedFilter}
                    // className={props.filter === 'completed' ? 'activeFilter' : 'btnFilter'}
                >Completed
                </Button>
            </div>
        </div>
    )
}

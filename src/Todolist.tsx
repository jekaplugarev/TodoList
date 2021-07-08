import React, {useCallback} from 'react';
import {FilterType, TaskType} from './App';
import {Button, IconButton} from '@material-ui/core'
import {EditableSpan} from './EditableSpan';
import {AddItemForm} from './AddItemForm';
import {HighlightOff} from '@material-ui/icons';
import {Task} from './Task';

type TodolistPropsType = {
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

export const Todolist = React.memo((props: TodolistPropsType) => {

    const onClickSetAllFilter = useCallback(() => {
        props.changeFilter('all', props.todoListID)
    }, [props])
    const onClickSetActiveFilter = useCallback(() => {
        props.changeFilter('active', props.todoListID)
    }, [props])
    const onClickSetCompletedFilter = useCallback(() => {
        props.changeFilter('completed', props.todoListID)
    }, [props])
    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.todoListID)
    }, [props])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [props])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }, [props])

    let tasksForTodoList = props.tasks

    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(task => !task.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(task => task.isDone)
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todoListID), [props])
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean, todoListID: string) => {
        props.changeTaskStatus(taskId, newIsDoneValue, todoListID)
    }, [props])
    const changeTaskTitle = useCallback((taskId: string, newValue: string, todoListID: string) => {
        props.changeTaskTitle(taskId, newValue, todoListID)
    }, [props])

    const tasksElements = tasksForTodoList.map(task => {
            return <Task
                key={task.id}
                task={task}
                todoListID={props.todoListID}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}/>
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
                >All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickSetActiveFilter}
                    style={{marginRight: '10px'}}
                >Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickSetCompletedFilter}
                >Completed
                </Button>
            </div>
        </div>
    )
})

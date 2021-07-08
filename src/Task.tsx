import {TaskType} from './App';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {HighlightOff} from '@material-ui/icons';
import React, {ChangeEvent, useCallback} from 'react';

type TaskPropsType = {
    task: TaskType
    todoListID: string
    removeTask: (taskId: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, checked: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const removeTask = () => props.removeTask(props.task.id, props.todoListID)
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, event.currentTarget.checked, props.todoListID)
    }
    const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.task.id, title, props.todoListID), [props])

    return (
        <li key={props.task.id} className={props.task.isDone ? 'isDone' : ''}>
            <Checkbox
                color={'primary'}
                checked={props.task.isDone}
                className="checkbox"
                onChange={changeTaskStatus}
            />
            <EditableSpan
                title={props.task.title}
                changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask} size={'medium'}>
                <HighlightOff fontSize={'default'}/>
            </IconButton>
        </li>)
})
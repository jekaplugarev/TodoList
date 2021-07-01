import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from './App';
import {Button, Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from './EditableSpan';
import {AddItemForm} from './AddItemForm';
import {HighlightOff} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodoListType} from './AppWithRedux';

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
//     const todo = useSelector<AppRootStateType,TodoListType>(
//         state => state.todoLists.filter(
//             t => t.id === props.todoListID
//         )[0]
//     )
//     const task = useSelector<AppRootStateType,Array<TaskType>>(
//         state => state.tasks[props.todoListID]
// )
//     const dispatch = useDispatch()

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
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    const tasksElements = props.tasks.map(task => {
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
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton onClick={removeTask} size={'medium'}>
                        <HighlightOff fontSize={'default'}/>
                    </IconButton>
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
}

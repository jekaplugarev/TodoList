import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from './App';

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
}

export function Todolist(props: PropsType) {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onClickAddTask = () => {
        const validatedInputValue = inputValue.trim() //Убирает пробелы по бокам
        if (validatedInputValue) { //Если строка не пустая
            props.addTask(validatedInputValue, props.todoListID)
        } else {
            setError(true)
        }
        setInputValue('') //Чистит инпут после добавления таски
    }
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setError(false) //Если печатает то убирает ошибку
    }
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickAddTask()
        }
    }
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
    const errorMessage = error ? <div style={{color: 'red'}}>Title is required !</div> : null //Если есть ошибка то выволим сообщение иначе ничего

    return <div className="container">
        <div className="header">
            <h3 className="titleTodoList">{props.titleTodoList}</h3>
            <button onClick={removeTodoList} className="btnDel">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                     className="bi bi-x" viewBox="0 0 16 16">
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
        <div className="wrapper">
            <div className="inputTask">
                <input
                    value={inputValue}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? 'error' : 'input'}
                />
                <button onClick={onClickAddTask} className="btnAddTask">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </button>
            </div>
            {errorMessage}
        </div>
        <ul className="tasks">
            {
                props.tasks.map(task => { //Для каждого объекта массива tasks
                        const removeTask = () => props.removeTask(task.id, props.todoListID)
                        const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, event.currentTarget.checked, props.todoListID)
                        }

                        return (
                            <li key={task.id} style={{listStyleType: 'none'}}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    className="checkbox"
                                    onChange={changeTaskStatus} //На событие onChange через пропсы передаем функцию с промапленой task.id и значением состояния чекбокса
                                />
                                <span
                                    className={task.isDone ? 'isDone' : ''}>
                                    {task.title}
                                </span>
                                <button onClick={removeTask} className="btnDel">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                         className="bi bi-x" viewBox="0 0 16 16">
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </button>
                            </li>)
                    }
                )
            }
        </ul>
        <div className="filter">
            <button
                onClick={onClickSetAllFilter}
                className={props.filter === 'all' ? 'activeFilter' : 'btnFilter'}>All
            </button>
            <button
                onClick={onClickSetActiveFilter}
                className={props.filter === 'active' ? 'activeFilter' : 'btnFilter'}>Active
            </button>
            <button
                onClick={onClickSetCompletedFilter}
                className={props.filter === 'completed' ? 'activeFilter' : 'btnFilter'}>Completed
            </button>
        </div>
    </div>
}

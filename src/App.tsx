import React, {useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid';

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

function App() {
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

    const todoListComponents = todoLists.map(tl => {
        const taskForTodoList = getFilteredTasks(tl)

        return (
            <Todolist
                key={tl.id}
                todoListID={tl.id}
                filter={tl.filter}
                titleTodoList={tl.title}
                tasks={taskForTodoList}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
        </div>
    )
}

export default App
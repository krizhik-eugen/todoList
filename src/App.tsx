import React, {useState} from 'react'
import './App.css'
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {
    // BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},],
        [todoListID_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Water", isDone: false}
        ]
    })

    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})

    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t) //в найденой по ИД таске делается копия таски с перезаписью isDone, а остальные t возвращаются
        setTasks({...tasks})
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title: title} : t) //в найденой по ИД таске делается копия таски с перезаписью title, а остальные t возвращаются
        setTasks({...tasks})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))  // та же суть, что и в предыдущей функциии
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))// та же суть, что и в предыдущей функциии
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        const copyTasks = {...tasks}
        delete copyTasks[todoListID]
        setTasks(copyTasks)
    }
    const addTodoList = (title: string) => {
        const todoListID = v1();
        const newTodoList: TodoListType = {id: todoListID, title: title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [todoListID]: []})
    }

    // UI:
    const getTasksForRender = (todoList: TodoListType): Array<TaskType> => { //после : описан тип данных, которые возвращает функция
        switch (todoList.filter) {
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone) //возвращает выполненные таски
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone) // возвращает невыполненные такси
            default:
                return tasks[todoList.id] //возвращает остальные таски
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={getTasksForRender(tl)}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
import React, {useReducer, useState} from 'react'
import './App.css'
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = () => {
    // BLL:
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(filter, todoListID))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }
    const removeTodoList = (todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))
    }
    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
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
            <Grid item>
                <Paper style={{padding: '10px'}} elevation={5}>
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
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                      style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
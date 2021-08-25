import { v1 } from "uuid";
import {TasksStateType} from "../App";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todoListID: string
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todoListID: string
}

export type ActionsType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT

let initialState:TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todoListID] = copyState[action.todoListID].filter((t => t.id !== action.taskID))
            return copyState;
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todoListID]: [{
                    id: v1(),
                    title: action.title,
                    isDone: false
                }, ...state[action.todoListID]]
            };
        }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => (t.id === action.taskID) ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => (t.id === action.taskID) ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListID]: []
            }
        case 'REMOVE-TODOLIST': {
            // let {[action.todoListID]: [], ...newState} = state и сделать return  newState - деструктуризация
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskAT => {
    return ({type: 'REMOVE-TASK', taskID: taskID, todoListID: todolistId})
}
export const addTaskAC = (title: string, todoListID: string): AddTaskAT => ({
    type: 'ADD-TASK',
    title,
    todoListID
})
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskID,
        isDone,
        todoListID
    }
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleAT => {
    return ({
        type: 'CHANGE-TASK-TITLE',
        taskID,
        title,
        todoListID
    })
}


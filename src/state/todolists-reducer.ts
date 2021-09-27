import {Dispatch} from 'redux';
import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {AppRootStateType} from "./store";
import {useEffect} from "react";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todo: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                ...action.todo,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todo: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todo}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodoListsAC = (todos: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLISTS',
        todos
    } as const
}

export type SetTodolistsActionType = ReturnType<typeof setTodoListsAC>

// type SetTodoListsType = {
//     type: 'SET-TODOLISTS'
//     todos: Array<TodolistDomainType>
// }

export const setTodolistsTC =() => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let promise = todolistsAPI.getTodolists()
    promise.then((res) => {
        let todos = res.data
        dispatch(setTodoListsAC(todos))
    })
}

export const deleteTodolistTC = (todoId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todoId)
        .then(()=> {
        dispatch(removeTodolistAC(todoId))
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(()=>{
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

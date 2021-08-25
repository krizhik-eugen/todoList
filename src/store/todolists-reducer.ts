import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
}
export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todoListID: string
}

export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

let initialState:Array<TodoListType> = []

export const todoListsReducer = (state = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID);
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {id: action.todoListID, title: action.title, filter: 'all'};
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', todoListID: todolistId})

export const addTodolistAC = (title: string): AddTodoListAT => {

    return {type: 'ADD-TODOLIST', title: title, todoListID: v1()}
}

export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title: title, todoListID: todoListID})

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter: filter, todoListID: todoListID})


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

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID);
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {id: action.todoListID, title: action.title, filter: 'all'};
            return [...todoLists, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        default:
            return todoLists;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', todoListID: todolistId})

export const addTodolistAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: title, todoListID: v1()}
}

export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title: title, todoListID: todoListID})

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter: filter, todoListID: todoListID})


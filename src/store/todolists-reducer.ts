import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
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

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID);
        case 'ADD-TODOLIST':
            const todoListID = v1();
            const newTodoList: TodoListType = {id: todoListID, title: action.title, filter: 'all'};
            return [...todoLists, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
        default:
            return todoLists;
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', todoListID: todolistId})

export const AddTodolistAC = (title: string): AddTodoListAT => ({type: 'ADD-TODOLIST', title: title})

export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title: title, todoListID: todoListID})

export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter: filter, todoListID: todoListID})


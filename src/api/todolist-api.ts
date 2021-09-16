import axios from 'axios'

export default {
    title: 'API'
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '29594cf8-7a2a-4c99-90e3-aafc284f801d'
    }
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
/*type CreateTodolistResponseType = {
    resultCode
    data: {
        item: TodolistResponseType
    }
    fieldsErrors: string[]
    messages: string[]
}*/
/*type DeleteTodolistResponseType = {
    data: {}
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type UpdateTodolistTitleResponseType = {
    data: {}
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}*/
type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export const todolistAPI = {
    GetTodos() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    CreateTodos(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    DeleteTodos(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    UpdateTodoTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

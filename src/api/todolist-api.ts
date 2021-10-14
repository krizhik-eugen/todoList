import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '29594cf8-7a2a-4c99-90e3-aafc284f801d'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodoType>>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
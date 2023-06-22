import axios from 'axios';

const settings = {withCredentials: true}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {}
})

type TodoListType = {
  id: string,
  title: string,
  addedDate: Date,
  order: number
}

type ResponseType<T = {}> = {
  resultCode: number
  message: string[],
  data: T
}


export const todolistAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>('todo-lists');
  },
  createTodoList(title: string) {
    return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title})
  },
  deleteTodloList(todoId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoId}`)
  },
  updateTodoList(todoId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
  },
}


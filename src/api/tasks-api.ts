import axios from 'axios';
const settings = {withCredentials: true}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})

type TasksType = {
  id: string,
  title: string,
  addedDate: Date,
  order: number
  l: number
}

type ResponseType<U = {}> = {
  resultCode: number
  messages:string[]
  data: U
}

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<TasksType[]>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string){
    return instance.post<ResponseType<TasksType[]>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}` )
  },
  updateTaskTitle(todolistId: string, taskId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
  }
}


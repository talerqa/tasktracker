import axios from 'axios';

const settings = {withCredentials: true}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})

export type TaskType = {
  id: string
  order: number
  description: string
  status: TaskStatus
  title: string
  priority: TaskPriorities
  startDate: string
  deadline: string
  todoListId: string
  addedDate: string
}

export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4
}

type ResponseType<U = {}> = {
  resultCode: number
  messages: string[]
  data: U
}

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<TaskType[]>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string){
    return instance.post<ResponseType<TaskType[]>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}` )
  },
  updateTaskTitle(todolistId: string, taskId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
  }
}


import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type FActionType = ReturnType<typeof removeTaskAC>
export type SActionType = ReturnType<typeof addTaskAC>
export type TActionType = ReturnType<typeof changeTaskStatusAC>


type ActionsType = FActionType | SActionType | TActionType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
      }
    }
    case 'ADD-TASK':
      let id = v1()
      let newTask = {id, title: action.payload.title, isDone: false}
      return {
        ...state,
        [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
      }

    case 'CHANGE-STATUS-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId]
          .map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)
      }
    }

    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistID]: []
      }
    }

    case 'REMOVE-TODOLIST': {
      delete state[action.id]
      return {
        ...state
      }
    }

    default:
      throw new Error('I don\'t understand this type')
  }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      taskId,
      todolistId
    }
  } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      title,
      todolistId
    }
  } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return {
    type: 'CHANGE-STATUS-TASK',
    payload: {
      taskId,
      isDone,
      todolistId
    }
  } as const
}

//TITLE ДОПИСАТЬ
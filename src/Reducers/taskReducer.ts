import {TasksStateType} from '../App';

type CommonACType = AddTaskACType | RemoveTaskAC
type AddTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskAC = ReturnType<typeof removeTaskAC>

export const taskReducer = (state: TasksStateType, action: CommonACType) => {
  switch (action.type) {
    case 'ADD-TASK' : {
      return {[action.payload.todolistId]: [], ...state}
    }

    case 'REMOVE-TASK': {
      // let todolist = state[action.payload.todolistId]
      // state[action.payload.todolistId] = todolist.filter(task => task.id !== action.payload.id)
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.id)
      }
    }

    default :
      return state
  }
}


//Добавляем таски

export const addTaskAC = (todolistId: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todolistId,
    }
  } as const
}

//Удаляем таски
export const removeTaskAC = (id: string, todolistId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id,
      todolistId
    }
  } as const
}
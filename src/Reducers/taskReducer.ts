import {TasksStateType} from '../App';
import {TaskType} from '../Todolist';

export const taskReducer = (state: TasksStateType, action: CommonACType) => {
  switch (action.type) {
    case 'ADD-TASK' : {
      return {[action.payload.todolistId]: [], ...state}
    }
    default :
      return state
  }
}

type CommonACType = AddTaskACType

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todolistId,
    }
  } as const
}
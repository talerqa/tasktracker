import {FilterValuesType, TodolistType} from '../App';

export const todolistsReducer = (state: TodolistType[], action: CommonTypeAC) => {
  switch (action.type) {
    case 'CHANGE-FILTER': {
      return state.map(todoList => todoList.id === action.payload.todolistId ? {
        ...todoList,
        filter: action.payload.value
      } : todoList)
    }
    case 'REMOVE-TODOLIST' : {
      return state.filter(todolist => todolist.id !== action.payload.todolistId)
    }
    case 'ADD-TODOLIST' : {
      let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
      return [ newTodolist, ...state]
    }
    default:
      return state
  }
}

type CommonTypeAC = ChangeFilterValueTypeACType | RemoveTodoListACType | AddTodolistACType

type ChangeFilterValueTypeACType = ReturnType<typeof changeFilterValueAC>
export const changeFilterValueAC = (value: FilterValuesType, todolistId: string) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      value,
      todolistId
    }
  } as const
}

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      todolistId,
    }
  } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, todolistId: string)  => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title,
      todolistId
    }
  } as const
}
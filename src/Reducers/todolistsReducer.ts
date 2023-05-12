import {FilterValuesType, TodolistType} from '../App';

export type CommonTypeAC = ChangeFilterValueTypeACType | RemoveTodoListACType | AddTodolistACType | ChangeTodolistTitleACType

export type ChangeFilterValueTypeACType = ReturnType<typeof changeFilterValueAC>
type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const todolistsReducer = (state: TodolistType[], action: CommonTypeAC): TodolistType[]  => {
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
      return [newTodolist, ...state]
    }

    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(todolist => todolist.id === action.payload.id ? {...todolist, title: action.payload.title} : todolist)
    }
    default:
      return state
  }
}


export const changeFilterValueAC = (value: FilterValuesType, todolistId: string) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      value,
      todolistId
    }
  } as const
}


export const removeTodoListAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      todolistId,
    }
  } as const
}


export const addTodolistAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title,
      todolistId
    }
  } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id,
      title
    }
  } as const
}
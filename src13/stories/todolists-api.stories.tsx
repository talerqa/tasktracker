import React, {useEffect, useState} from 'react'

import {todolistAPI} from '../api/todolist-api';

export default {
  title: 'API'
}


export const GetTodolists = () => {

  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const promise = todolistAPI.getTodoLists()
    promise.then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const title = 'REACT'

    const promise = todolistAPI.createTodoList(title)
    promise.then((res) => {
        setState(res.data)
      })

  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const todoId: string = '7a74c7ce-7153-491a-8883-c37fe22fbde4'

    const promise = todolistAPI.deleteTodloList(todoId)
    promise.then((res) => {
      setState(res.data)
    })


  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const todoId: string = '8fd3de56-e261-4571-8420-fe65bf01b942'
    const title = 'REACT'

    const promise = todolistAPI.updateTodoList(todoId, title)
    promise.then((res) => {
      setState(res.data)
    })

  }, [])

  return <div>{JSON.stringify(state)}</div>
}


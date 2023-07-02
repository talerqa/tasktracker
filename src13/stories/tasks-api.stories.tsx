import React, {useEffect, useState} from 'react'

import {tasksApi} from '../../src/api/tasks-api'

export default {
  title: 'API'
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)

  //const todolistId = 'ac07b531-f013-48fc-a22b-7e26896ec336'
  //const todolistId = 'd58f3170-ed61-4e1d-afbf-14daeba816c6'
  const todolistId = '56a96a21-ebe2-4138-beee-537d14367a3d'


  useEffect(() => {
    const promise = tasksApi.getTasks(todolistId)
    promise.then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const title = 'TASK-TASK'
    // const todolistId = 'ac07b531-f013-48fc-a22b-7e26896ec336'
   // const todolistId = 'd58f3170-ed61-4e1d-afbf-14daeba816c6'
    const todolistId = '56a96a21-ebe2-4138-beee-537d14367a3d'

    const promise = tasksApi.createTask(todolistId, title)
    promise.then((res) => {
      setState(res.data)
    })

  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId: string = 'ac07b531-f013-48fc-a22b-7e26896ec336'
    const todoId: string = 'd4a7607d-8404-46af-816b-e275adf21766'

    const promise = tasksApi.deleteTask(todolistId, todoId)
    promise.then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const todoId: string = '8be0b7c5-fe4b-4fdd-8260-fee77d2995b8'
    const todolistId = 'fad02c8f-adaa-4b80-aa85-a69d4b144507'
    const title = 'REACT01'

    const promise = tasksApi.updateTaskTitle(todolistId, todoId, title)
    promise.then((res) => {
      setState(res.data)
    })

  }, [])

  return <div>{JSON.stringify(state)}</div>
}


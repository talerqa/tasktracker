import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

export type CurrentValueOfButtonType = 'all' | 'active' | 'completed'

function App() {

  const [tasks, setTasks] = useState<Array<TasksType>>([
    {id: v1(), title: 'HTML&CSS', isDone: false},
    {id: v1(), title: 'JS/ES6&TS', isDone: true},
    {id: v1(), title: 'REACT/REDUX', isDone: false},
    {id: v1(), title: 'JSX', isDone: true},
    {id: v1(), title: 'REACT/REDUX', isDone: false},
  ])

  const [title, setTitle] = useState('')

  const [filter, setFilter] = useState<CurrentValueOfButtonType>('all')

  const removeTask = (id: string) => {
    setTasks(tasks.filter(f => f.id !== id))
  }

  let newArrayFiltered = tasks
  if (filter === 'active') {
    newArrayFiltered = tasks.filter(f => !f.isDone)
  }
  if (filter === 'completed') {
    newArrayFiltered = tasks.filter(f => f.isDone)
  }

  const filteredArray = (filter: CurrentValueOfButtonType) => {
    setFilter(filter)
  }

  const addTask = () => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false
    }
    setTasks([newTask, ...tasks])
  }


  return (
    <div className="App">
      <TodoList
        title={newArrayFiltered}
        removeTask={removeTask}
        filteredArray={filteredArray}
        addTask={addTask}
        setTitle={setTitle}
        input={title}
      />
    </div>
  );
}

export default App;

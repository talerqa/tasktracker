import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
//v1 -- каждый раз новый при запуске прилоежния, умирает, когда мы закрываем
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
  const todolistTitle: string = 'What to learn';
  const [tasks, setTasks] = useState<Array<TaskType>>(
    [//setTasks получаем из внешнего мира, мы нигде ее не объявили. setState это функция
      //task = переменная. изначальное состояние
      //setTasks = новое состояние?
      {id: v1(), title: 'HTML&CSS', isDone: false},
      {id: v1(), title: 'JS/ES6&TS', isDone: true},
      {id: v1(), title: 'REACT/REDUX', isDone: false},
      {id: v1(), title: 'JSX', isDone: true},
      {id: v1(), title: 'REACT/REDUX', isDone: false},
    ])
  const removeTask = (taskId: string) => {
    // Возвращает новый массив
    setTasks(tasks.filter(t => t.id !== taskId));
  }

  const addTask = (title: string) => {
    const newTaskType: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    }
    setTasks([newTaskType, ...tasks])
    // newTaskType добавляется в новый массив tasks при помощи спред оператора ...task мы добавляем нашу новую таску в имеющийся массив. setTask - обновляется стейт
  }

  const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
    setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
  }

  const changeFilter = (nextfilter: FilterValueType) => {
    setFilter(nextfilter)
  }

  const [filter, setFilter] = useState<FilterValueType>('all');

  const getTasksForMe = (tasksList: Array<TaskType>, filterValue: FilterValueType) => {
    switch (filterValue) {
      case 'active':
        return tasks.filter(t => !t.isDone) // Противоположное true = false
      case 'completed':
        return tasks.filter(t => t.isDone)// т.к. Filter то приходит true
      default:
        return tasks
    }
  }

  const tasksWhatIWantToSee = getTasksForMe(tasks, filter);
  return (
    <div className="App">
      <TodoList
        title={todolistTitle}
        tasks={tasksWhatIWantToSee}
        filter={filter}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

//CRUD
//Create
//Read (filter, search, sort)
//Update
//Delete

export default App;

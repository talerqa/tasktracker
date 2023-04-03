import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import exp from 'constants';

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
  const todolistTitle: string = 'What to learn';
  const [tasks, setTasks] = useState<Array<TaskType>>(
    [//setTasks получаем из внешнего мира, мы нигде ее не объявили. setState это функция
      //task = переменная. изначальное состояние
      //setTasks = новое состояние?
      {id: 1, title: 'HTML&CSS', isDone: false},
      {id: 2, title: 'JS/ES6&TS', isDone: true},
      {id: 3, title: 'REACT/REDUX', isDone: false},
      {id: 4, title: 'JSX', isDone: true},
      {id: 5, title: 'REACT/REDUX', isDone: false},
    ])
  const removeTask = (taskId: number) => {
    // Возвращает новый массив
    setTasks(tasks.filter(t => t.id !== taskId));
  }

  const changeFilter = (nextfilter: FilterValueType) => {
    setFilter(nextfilter)
  }

  const [filter, setFilter] = useState<FilterValueType>('all');

  const getTasksForMe = (tasksList: Array<TaskType>, filterValue: FilterValueType) => {
    switch (filterValue) {
      case 'active':
        return tasks.filter(t => t.isDone === false)
      case 'completed':
        return tasks.filter(t => t.isDone === true)
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
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;

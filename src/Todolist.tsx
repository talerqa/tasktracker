import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
/*import todoList from '../srcViktor/TodoList';*/

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  todoListId: string
  tasks: Array<TaskType>
  removeTask: (todoListId: string, taskId: string) => void
  changeFilter: (todoListId: string, value: FilterValuesType) => void
  addTask: (todoListID: string, title: string) => void
  changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
  deleteTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(props.todoListId, title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  }

  const onAllClickHandler = () => props.changeFilter(props.todoListId, 'all');
  const onActiveClickHandler = () => props.changeFilter(props.todoListId, 'active');
  const onCompletedClickHandler = () => props.changeFilter(props.todoListId, 'completed');

  return <div>
    <h3>{props.title}
      <button onClick={()=> props.deleteTodoList(props.todoListId)}>x</button>
    </h3>

    <div>
      <input value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? 'error' : ''}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
    <ul>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(props.todoListId, t.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todoListId, t.id, e.currentTarget.checked);
          }

          return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button className={props.filter === 'all' ? 'active-filter' : ''}
              onClick={onAllClickHandler}>All
      </button>
      <button className={props.filter === 'active' ? 'active-filter' : ''}
              onClick={onActiveClickHandler}>Active
      </button>
      <button className={props.filter === 'completed' ? 'active-filter' : ''}
              onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>
}

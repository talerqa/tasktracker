import {CurrentValueOfButtonType, TasksType} from './App';
import React, {ChangeEvent, KeyboardEvent} from 'react';

type TodoListType = {
  title: TasksType[]
  removeTask: (id: string) => void
  filteredArray: (filter: CurrentValueOfButtonType) => void
  addTask: () => void
  setTitle: (value: string) => void
  input: string
}

const TodoList = (props: TodoListType) => {
  const addTaskHandler = () => {
    props.addTask()
    props.setTitle('')
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget) {
      props.setTitle(event.currentTarget.value)
    }
  }

  const EnterKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.addTask()
    }
  }

  return (
    <div className="todolist">
      <h3></h3>
      <div>
        <input
          value={props.input}
          onKeyPress={EnterKeyHandler}
          onChange={onChangeHandler}/>

        <button
          onClick={addTaskHandler}
        >+
        </button>
      </div>
      <ul>

        {props.title.map((t: any) => {
          return <li>
            {t.title}
            <input type="checkbox" checked={t.isDone}/>
            <button onClick={() => {
              props.removeTask(t.id)
            }
            }>x
            </button>
          </li>

        })}

      </ul>
      <div>
        <button onClick={() => {
          props.filteredArray('all')
        }}>All
        </button>
        <button onClick={() => {
          props.filteredArray('active')
        }}>Active
        </button>
        <button onClick={() => {
          props.filteredArray('completed')
        }}>Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList;
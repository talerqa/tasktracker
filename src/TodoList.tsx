import React, {FC, useRef} from 'react';
import {FilterValueType} from './App';


type TodoListPropsType = {
  title: string,
  tasks: TaskType[] // or Generic Array<TaskType>
  removeTask: (taskId: string) => void
  addTask: (title: string) => void
  changeFilter: (nextfilter: FilterValueType) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}

// props -- object
const TodoList: FC<TodoListPropsType> = (props) => {
  // FC = Functional Component/ Импортировать нужно
  // const TodoList = (props: TodoListPropsType) => {
  // prop.task.map() === СОЗДАЕТ НОВЫЙ МАССИВ ЕСЛИ МАПИТЬСЯ
  // Вынести в переменную можно, для облегчения JSX, который ниже
  // Мы код больше повторно испольховать не будем, поэтому можно не выносить
  const taskTitleInput = useRef<HTMLInputElement>(null)
  ///// Hook useRef

  const taskListElements = props.tasks.map((task: TaskType) => {
    return (
      <li>
        <input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        <button onClick={() => {
          props.removeTask(task.id)
        }}>x
        </button>
      </li>
    )
  });

  return (
    <div className="todolist">
      <h3>{props.title}</h3>
      <div>
        <input ref={taskTitleInput}/>
        <button onClick={() => {
          if (taskTitleInput.current) {
            props.addTask(taskTitleInput.current.value)
          }
        }}>+
        </button>
      </div>
      <ul>
        {taskListElements}
      </ul>
      <div>
        <button onClick={()=>props.changeFilter('all')}>All</button>
        <button onClick={()=>props.changeFilter('active')}>Active</button>
        <button onClick={()=>props.changeFilter('completed')}>Completed</button>
      </div>
    </div>
  )
}

export default TodoList;
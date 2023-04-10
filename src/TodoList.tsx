import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValueType} from './App';
import {keyboardKey} from '@testing-library/user-event';


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
  // const taskTitleInput = useRef<HTMLInputElement>(null);


  ///// Hook useRef - самый просто способо прочитать данные из инпута и их использовать. Минуск в том, что мы получаем доступ к инпуту, когда мы нажимаем добавить. Но нет ранней вадидации
  // const addTaskHandler = () => {
  //   if (taskTitleInput.current) {
  //     props.addTask(taskTitleInput.current.value)
  //     taskTitleInput.current.value = ''
  //   }
  // }

  const [title, setTitle] = useState<string>('');
  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  const addTaskHandler = () => {
    props.addTask(title)
    setTitle('')
  }


  const titleMaxLength = 25;
  const isTitleLength: boolean = title.length > titleMaxLength;
  const isAddBtnDisabled: boolean = !title.length // если нет длины. могли бы написать title.length === 0
   || title.length > titleMaxLength;
  const titleMaxLengthWarning = isTitleLength
  ? <div style={{color: 'red'}}>Title is too long</div>
  : null

  const HandlerCreator = (filter: FilterValueType) => {
    return () => props.changeFilter(filter)
  }
  const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !isAddBtnDisabled && addTaskHandler()

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
    <div className='todolist'>
      <h3>{props.title}</h3>
      <div>
        <input
          placeholder={'Please enter title'}
          value={title}
          onChange={setTitleHandler}
          onKeyDown={addTaskOnKeyPressHandler}
          //ref={taskTitleInput}
        />
        <button
          disabled={isAddBtnDisabled}
          onClick={addTaskHandler}
        > +
        </button>
        {titleMaxLengthWarning}
      </div>
      <ul>
        {taskListElements}
      </ul>
      <div>
        <button onClick={HandlerCreator('all')}>All</button>
        <button onClick={HandlerCreator('active')}>Active</button>
        <button onClick={HandlerCreator('completed')}>Completed</button>
      </div>
    </div>
  )
}

export default TodoList;
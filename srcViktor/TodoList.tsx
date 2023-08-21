import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";

type TodoListPropsType = {
  title: string;
  tasks: TaskType[]; // or Generic Array<TaskType>
  filter: FilterValueType;
  removeTask: (taskId: string) => void;
  addTask: (title: string) => void;
  changeFilter: (nextfilter: FilterValueType) => void;
  changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

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

  const [title, setTitle] = useState<string>("");

  const [error, setError] = useState<boolean>(false);

  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTitle(e.currentTarget.value);
  };

  const addTaskHandler = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      props.addTask(title);
    } else {
      setError(true);
    }
    setTitle("");
  };

  const titleMaxLength = 20;

  const isTitleLength: boolean = title.length > titleMaxLength;

  const isAddBtnDisabled: boolean =
    !title.length || // если нет длины. могли бы написать title.length === 0
    title.length > titleMaxLength;

  const titleMaxLengthWarning = isTitleLength ? <div style={{ color: "red" }}>Title is too long</div> : null;

  const userMessage = error ? <div style={{ color: "red" }}>Title is required</div> : null;

  const HandlerCreator = (filter: FilterValueType) => {
    return () => props.changeFilter(filter);
  };

  const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && !isAddBtnDisabled && addTaskHandler();

  const taskListElements = props.tasks.map((task: TaskType) => {
    const removeTask = () => {
      props.removeTask(task.id);
    };
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(task.id, e.currentTarget.checked);
    };
    const taskClasses = task.isDone ? "task-isDone task" : "task";
    return (
      <li>
        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus} />
        <span className={taskClasses}>{task.title}</span>
        <button onClick={removeTask}>x</button>
      </li>
    );
  });

  return (
    <div className="todolist">
      <h2>{props.title}</h2>
      <div>
        <input
          placeholder={"Please enter title"}
          value={title}
          onChange={setTitleHandler}
          onKeyDown={addTaskOnKeyPressHandler}
          className={error || isTitleLength ? "input-error" : undefined}
          //ref={taskTitleInput}
        />
        <button disabled={isAddBtnDisabled} onClick={addTaskHandler}>
          {" "}
          +
        </button>
        {titleMaxLengthWarning || userMessage}
      </div>
      <ul>{taskListElements}</ul>
      <div className={"filter-btn-wrapper"}>
        <button
          className={props.filter === "all" ? "filter-btn filter-btn-active" : "filter-btn"}
          onClick={HandlerCreator("all")}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "filter-btn filter-btn-active" : "filter-btn"}
          onClick={HandlerCreator("active")}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "filter-btn filter-btn-active" : "filter-btn"}
          onClick={HandlerCreator("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;

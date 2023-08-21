import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import Component from "./Component";

export type FilterValuesType = "all" | "active" | "completed";
type todolistsType = { id: string; title: string; filter: FilterValuesType };
type AssocTasksType = {
  [key: string]: TaskType[];
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<AssocTasksType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  // let [tasks, setTasks] = useState([
  //   {id: v1(), title: 'HTML&CSS', isDone: true},
  //   {id: v1(), title: 'JS', isDone: true},
  //   {id: v1(), title: 'ReactJS', isDone: false},
  //   {id: v1(), title: 'Rest API', isDone: false},
  //   {id: v1(), title: 'GraphQL', isDone: false},
  // ]);

  // let [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(todoListId: string, taskId: string) {
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter((el) => el.id !== taskId) });
  }

  function addTask(todoListID: string, title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    setTasks({ ...tasks, [todoListID]: [...tasks[todoListID], newTask] });
  }

  function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map((el) => (el.id === taskId ? { ...el, isDone: isDone } : el)),
    });
  }

  function changeFilter(todoListId: string, value: FilterValuesType) {
    //  setFilter(value);
    setTodolists(todolists.map((el) => (el.id === todoListId ? { ...el, filter: value } : el)));
  }

  function deleteTodoList(todoListId: string) {
    setTodolists(todolists.filter((el) => el.id !== todoListId && el));
    delete tasks[todoListId];
    console.log(tasks);
  }

  const title1 = "title";

  return (
    <div className="App">
      {todolists.map((el) => {
        let tasksForTodolist = tasks[el.id];

        if (el.filter === "active") {
          tasksForTodolist = tasks[el.id].filter((t) => !t.isDone);
        }
        if (el.filter === "completed") {
          tasksForTodolist = tasks[el.id].filter((t) => t.isDone);
        }
        return (
          <Todolist
            key={el.id}
            todoListId={el.id}
            title={el.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={el.filter}
            deleteTodoList={deleteTodoList}
          />
        );
      })}

      <Component tasks={todolists} title={title1} />
    </div>
  );
}

export default App;

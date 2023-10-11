import React, { FC, useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolists.slice";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.slice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle";
import { useSelector } from "react-redux";
import { selectTasks } from "features/TodolistsList/model/tasks/tasks.selectors";

type Props = {
  todolist: TodolistDomainType;
};

export const Todolist: FC<Props> = React.memo(function ({ todolist }) {
  const { addTask, fetchTasks } = useActions(tasksThunks);

  const tasks = useSelector(selectTasks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallBack = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap();
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} tasks={tasks[todolist.id]} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});

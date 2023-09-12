import React, { FC } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolists.slice";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.slice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle";
import { TaskType } from "features/TodolistsList/api/tasks.api";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist: FC<Props> = React.memo(function ({ todolist, tasks }) {
  const { addTask } = useActions(tasksThunks);

  const addTaskCallBack = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap();
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      {/*<DataAddTodolist />*/}
      <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} tasks={tasks} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});

const DataAddTodolist = () => {
  return <div></div>;
};

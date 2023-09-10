import React, { ChangeEvent, FC } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import s from "features/TodolistsList/ui/Todolist/Tasks/Task/Task.module.css";
import { TaskType } from "features/TodolistsList/api/tasks.api";

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task: FC<Props> = React.memo(({ task, todolistId }) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId: todolistId });

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({
      taskId: task.id,
      domainModel: { status: status },
      todolistId: todolistId,
    });
  };

  const changeTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId: todolistId });
  };

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});

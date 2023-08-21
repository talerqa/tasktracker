import React, { ChangeEvent, memo, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskType } from "./Todolist";
import { useDispatch } from "react-redux";
import { changeTaskTitleAC, removeTaskAC, changeTaskStatusAC } from "./state/tasks-reducer";

export type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};
export const TaskWithRedux = memo((props: TaskPropsType) => {
  console.log("Task");

  const dispatch = useDispatch();
  const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId));

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId));
  };

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    },
    [props.todolistId, props.task.id],
  );

  return (
    <div className={props.task.isDone ? "is-done" : ""}>
      <Checkbox checked={props.task.isDone} color="primary" onChange={onChangeHandler} />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});

import React, { ChangeEvent, memo, useCallback } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { Button, ButtonProps, Checkbox } from "@mui/material";
import { AppRootStateType } from "./state/store";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolists-reducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export const TodolistWithRedux = memo((props: PropsType) => {
  console.log("TODOLIST");
  let tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[props.id]);
  const dispatch = useDispatch();

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(title, props.id));
    },
    [props.id],
  );

  const removeTodolist = () => {
    let action = removeTodolistAC(props.id);
    dispatch(action);
  };
  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC(props.id, title));
  };

  const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.id, "all")), [props.id]);
  const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.id, "active")), [props.id]);
  const onCompletedClickHandler = useCallback(
    () => dispatch(changeTodolistFilterAC(props.id, "completed")),
    [props.id],
  );

  if (props.filter === "active") {
    tasks = tasks.filter((t) => t.isDone === false);
  }
  if (props.filter === "completed") {
    tasks = tasks.filter((t) => t.isDone === true);
  }

  return (
    <div>
      <h3>
        {" "}
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {tasks.map((t) => {
          const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
          };
          const onTitleChangeHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(t.id, newValue, props.id));
          };

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox checked={t.isDone} color="primary" onChange={onChangeHandler} />

              <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
              <IconButton onClick={onClickHandler}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        {/*<Button variant={props.filter === 'all' ? 'outlined' : 'text'}*/}
        {/*        onClick={onAllClickHandler}*/}
        {/*        color={'inherit'}*/}
        {/*>All*/}
        {/*</Button>*/}
        {/*<Button variant={props.filter === 'active' ? 'outlined' : 'text'}*/}
        {/*        onClick={onActiveClickHandler}*/}
        {/*        color={'primary'}>Active*/}
        {/*</Button>*/}
        {/*<Button variant={props.filter === 'completed' ? 'outlined' : 'text'}*/}
        {/*        onClick={onCompletedClickHandler}*/}
        {/*        color={'secondary'}>Completed*/}
        {/*</Button>*/}

        <ButtonWithMemo
          variant={props.filter === "completed" ? "outlined" : "text"}
          title={"Completed"}
          onClick={onCompletedClickHandler}
          color={"inherit"}
        />
        <ButtonWithMemo
          variant={props.filter === "active" ? "outlined" : "text"}
          title={"Active"}
          onClick={onActiveClickHandler}
          color={"primary"}
        />
        <ButtonWithMemo
          variant={props.filter === "all" ? "outlined" : "text"}
          title={"All"}
          onClick={onAllClickHandler}
          color={"secondary"}
        />
      </div>
    </div>
  );
});

type ButtonWithMemoPropsType = {
  title: string;
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  variant: "text" | "outlined" | "contained";
  onClick: () => void;
};

const ButtonWithMemo = (props: ButtonProps) => {
  return (
    <Button variant={props.variant} onClick={props.onClick} color={props.color}>
      {props.title}
    </Button>
  );
};

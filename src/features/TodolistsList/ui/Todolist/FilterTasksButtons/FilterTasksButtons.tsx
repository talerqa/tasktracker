import React, { FC } from "react";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useActions } from "common/hooks";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
} from "features/TodolistsList/model/todolists/todolists.slice";
import s from "./FilterTasksButtons.module.css";

type Props = {
  todolist: TodolistDomainType;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(238,124,167,0.76)",
    },
    info: {
      main: "rgba(118,220,162,0.73)",
    },
    secondary: {
      main: "rgba(126,55,189,0.85)",
    },
  },
});

export const FilterTasksButtons: FC<Props> = ({ todolist }) => {
  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeTodolistFilterHandler = (filter: FilterValuesType) =>
    changeTodolistFilter({
      filter,
      id: todolist.id,
    });

  return (
    <div className={s.buttons}>
      <ThemeProvider theme={theme}>
        <Button
          variant={todolist.filter === "all" ? "outlined" : "text"}
          onClick={() => changeTodolistFilterHandler("all")}
          color={"primary"}
        >
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "outlined" : "text"}
          onClick={() => changeTodolistFilterHandler("active")}
          color={"info"}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "completed" ? "outlined" : "text"}
          onClick={() => changeTodolistFilterHandler("completed")}
          color={"secondary"}
        >
          Completed
        </Button>
      </ThemeProvider>
    </div>
  );
};

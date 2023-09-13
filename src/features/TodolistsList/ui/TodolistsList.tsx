import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { todolistsThunks } from "features/TodolistsList/model/todolists/todolists.slice";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";

import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTasks } from "features/TodolistsList/model/tasks/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/model/todolists/todolists.selectors";
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.slice";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { addTodolist: addTodolistThunk, fetchTodolists } = useActions(todolistsThunks);
  const { fetchTasks } = useActions(tasksThunks);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchTodolists();
  }, [isLoggedIn]);

  useEffect(() => {
    todolists.forEach((todolist) => {
      fetchTasks(todolist.id);
    });
  }, [todolists]);

  const addTodolist = useCallback((title: string) => {
    return addTodolistThunk(title).unwrap();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3} style={{ justifyContent: "space-around" }}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={tl} tasks={allTodolistTasks} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

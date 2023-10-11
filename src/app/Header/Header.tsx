import React from "react";
import { AppBar, Button, LinearProgress, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAppStatus } from "app/app.selectors";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth.slice";
import { todolistsThunks } from "features/TodolistsList/model/todolists/todolists.slice";
import s from "./Header.module.css";
import img from "./../../common/img/logo.png";

export const Header = () => {
  const status = useSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { addTodolist: addTodolistThunk } = useActions(todolistsThunks);
  const { logout } = useActions(authThunks);

  const logoutHandler = () => logout();
  return (
    <div className={s.appBar}>
      <AppBar position="static" color="inherit" style={{ background: "#FFFFFF" }}>
        <Toolbar className={s.toolBar}>
          <a className={s.logoInfo} href="#">
            <img className={s.logo} src={img} alt="logo" />
            <Typography variant="h6" className={s.title} fontWeight="700">
              Task Tracker
            </Typography>
          </a>
          {isLoggedIn && (
            <Button
              style={{
                fontSize: "16px",
                backgroundColor: "#A2A2A223",
                border: "1px solid black",
                fontWeight: "600",
                color: "rgb(0, 0, 0)",
              }}
              variant="outlined"
              size="large"
              onClick={logoutHandler}
              className={s.button}
            >
              Log out
            </Button>
          )}
        </Toolbar>
        <div style={{ height: "5px", color: "grey.500" }}>
          {status === "loading" && <LinearProgress color="inherit" />}
        </div>
      </AppBar>
    </div>
  );
};

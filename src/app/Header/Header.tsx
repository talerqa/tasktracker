import React from "react";
import { Button, LinearProgress, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAppStatus } from "app/app.selectors";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth.slice";
import s from "./Header.module.css";
import img from "./../../common/img/logo.png";

export const Header = () => {
  const status = useSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { logout } = useActions(authThunks);

  const logoutHandler = () => logout();
  return (
    <div className={s.appBar}>
      <div className={s.appBarContainer}>
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
                textTransform: "none",
                fontSize: "16px",
                backgroundColor: "rgba(243,243,243,0.87)",
                boxShadow: "#000000 0 0 4px",
                border: "1px solid black",
                fontWeight: "700",
                color: "rgba(0,0,0,0.8)",
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
      </div>
      <div style={{ height: "3px" }}>
        {status === "loading" && <LinearProgress color="inherit" style={{ width: "100%" }} />}
      </div>
    </div>
  );
};

import React, { FC } from "react";
import { AppBar, Button, LinearProgress, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAppStatus } from "app/app.selectors";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth.slice";

type Props = {};

export const Header: FC<Props> = () => {
  const status = useSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { logout } = useActions(authThunks);

  const logoutHandler = () => logout();
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          {/*<IconButton edge="start" color="inherit" aria-label="menu">*/}
          {/*  <Menu />*/}
          {/*</IconButton>*/}
          <Typography variant="h6">My todolists</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        <div style={{ height: "5px" }}>{status === "loading" && <LinearProgress />}</div>
      </AppBar>
    </div>
  );
};

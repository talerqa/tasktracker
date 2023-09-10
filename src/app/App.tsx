import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CircularProgress, Container } from "@mui/material";
import { Login } from "features/auth/ui/login/login";
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsInitialized } from "app/app.selectors";
import { authThunks } from "features/auth/model/auth.slice";
import { Header } from "app/Header/Header";

function App() {
  const isInitialized = useSelector(selectIsInitialized);

  const { initializeApp, logout } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <HashRouter>
      <div>
        <ErrorSnackbar />
        <Header />
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </HashRouter>
  );
}

export default App;

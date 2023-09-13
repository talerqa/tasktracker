import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList";
import { Login } from "features/auth/ui/login/Login";
import { Container } from "@mui/material";
import { Error } from "app/Error/Error";

export const Routing = () => {
  return (
    <Container fixed style={{ margin: "0 auto" }}>
      <Routes>
        <Route path={"/error404"} element={<Error />} />
        <Route path="/" element={<TodolistsList />} />
        <Route path={"/login"} element={<Login />} />
        <Route path="*" element={<Navigate to={"/error404"} />} />
      </Routes>
    </Container>
  );
};

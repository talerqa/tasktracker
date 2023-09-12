import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsInitialized } from "app/app.selectors";
import { authThunks } from "features/auth/model/auth.slice";
import { Header } from "app/Header/Header";
import { Routing } from "app/Routing/Routing";

function App() {
  const isInitialized = useSelector(selectIsInitialized);
  const { initializeApp } = useActions(authThunks);

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
    <div>
      <ErrorSnackbar />
      <Header />
      <Routing />
    </div>
  );
}

export default App;

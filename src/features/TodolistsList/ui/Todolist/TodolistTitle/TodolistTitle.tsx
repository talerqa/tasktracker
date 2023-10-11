import React, { FC, useState } from "react";
import { EditableSpan } from "common/components";
import { Fade, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolists.slice";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { title, id, entityStatus } = todolist;
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const [showDateCreate, setShowDateCreate] = useState(false);

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ title, id });
  };
  const data = new Date(todolist.addedDate);
  let month = data.toString().split(" ")[1];
  let date = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
  const finishedData = date + " " + month + " " + data.getFullYear();

  const handleMouseOver = () => setShowDateCreate(true);
  const handleMouseLeave = () => setShowDateCreate(false);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>
          <InfoSharpIcon fontSize="small" />
        </IconButton>
        <div style={{ width: "90%", height: "35px", alignSelf: "center", margin: "0 auto", textAlign: "center" }}>
          {showDateCreate && (
            <Fade in={showDateCreate}>
              <p style={{ margin: "0", fontSize: "14px", fontWeight: "700" }}>Created {finishedData}</p>
            </Fade>
          )}
        </div>
        <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </div>
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "55px",
          paddingBottom: "10px",
        }}
      >
        <div style={{ margin: "0", fontSize: "22px", fontWeight: "700" }}>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </div>
      </div>
    </div>
  );
};

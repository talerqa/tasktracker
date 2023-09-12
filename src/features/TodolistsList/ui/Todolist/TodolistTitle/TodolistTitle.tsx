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
  let month = data.getMonth() < 9 ? `0${data.getMonth()}` : data.getMonth();
  let date = data.getDate() < 9 ? `0${data.getDate()}` : data.getDate();
  const finishedData = date + "/" + month + "/" + data.getFullYear();

  ///Сделать плавное появление о затухание
  let timer: any = null;
  const handleMouseOver = () => {
    //  clearTimeout(timer);
    setShowDateCreate(true);
  };

  const handleMouseLeave = () => {
    //  timer = setTimeout(() => {
    setShowDateCreate(false);
    //    }, 1000);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>
          <InfoSharpIcon fontSize="small" />
        </IconButton>
        <div style={{ width: "90%", height: "35px" }}>
          {showDateCreate && (
            <Fade in={showDateCreate}>
              <p>Created {finishedData}</p>
            </Fade>
          )}
        </div>

        <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </div>
    </div>
  );
};

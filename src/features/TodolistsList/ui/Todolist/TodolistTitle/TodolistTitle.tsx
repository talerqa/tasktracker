import React, { FC, KeyboardEvent, useState } from "react";
import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolists.reducer";
import { RejectValueType } from "common/utils/create-app-async-thunk";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { title, id, entityStatus } = todolist;
  let [error, setError] = useState<string | null>(null);
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    if (title.trim() !== "") {
      changeTodolistTitle({ title, id })
        .unwrap()
        .then(() => {})
        .catch((err: RejectValueType) => {
          if (err.data) {
            const messages = err.data.messages;
            setError(messages.length ? messages[0] : "Some error occurred");
          }
        });
    } else {
      setError("Title is required");
    }
  };
  //
  return (
    <>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
    </>
  );
};

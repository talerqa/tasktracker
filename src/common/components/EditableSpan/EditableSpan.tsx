import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { TextField } from "@mui/material";
import s from "./Editablespan.module.css";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo(function (props: Props) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditMode(false);
      props.onChange(title);
    }
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      value={title}
      color="secondary"
      onChange={changeTitle}
      onKeyDown={onKeyPressHandler}
      autoFocus
      onBlur={activateViewMode}
    />
  ) : (
    <p className={s.editableSpan} onDoubleClick={activateEditMode}>
      {props.value}
    </p>
  );
});

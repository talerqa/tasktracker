import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { TextField } from "@mui/material";

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
    if (e.charCode === 13) {
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
      onChange={changeTitle}
      onKeyPress={onKeyPressHandler}
      autoFocus
      onBlur={activateViewMode}
    />
  ) : (
    <p
      style={{ fontWeight: "inherit", justifySelf: "center", margin: "0", fontSize: "inherit" }}
      onDoubleClick={activateEditMode}
    >
      {props.value}
    </p>
  );
});

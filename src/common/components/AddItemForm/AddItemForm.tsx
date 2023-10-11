import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { RejectValueType } from "common/utils/create-app-async-thunk";
import s from "./AddItemForm.module.css";

type Props = {
  addItem: (title: string) => Promise<any>;
  disabled?: boolean;
};

export const AddItemForm = React.memo(function ({ addItem, disabled = false }: Props) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim())
        .then(() => {
          setTitle("");
        })
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

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  return (
    <div className={s.addItemBlock}>
      <div className={s.textFieldBlock}>
        <TextField
          variant="outlined"
          color="secondary"
          className={s.textField}
          disabled={disabled}
          error={!!error}
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          label="Title"
        />
        <span className={s.error}>{error}</span>
      </div>
      <div className={s.iconButtonBlock}>
        <IconButton color="default" onClick={addItemHandler} disabled={disabled} className={s.iconButton}>
          <ControlPointIcon fontSize="medium" />
        </IconButton>
      </div>
    </div>
  );
});

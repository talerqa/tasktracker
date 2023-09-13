import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { RejectValueType } from "common/utils/create-app-async-thunk";

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
    <div style={{ height: "56px", display: "flex", paddingBottom: "20px" }}>
      <TextField
        variant="outlined"
        style={{ width: "270px" }}
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
      />
      <div style={{ alignSelf: "center" }}>
        <IconButton color="primary" onClick={addItemHandler} disabled={disabled} style={{ margin: "0" }}>
          <AddBox fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
});

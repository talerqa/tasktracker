import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsItemForm = {
  todolistId: string
  addTask: (newTitle: string, todolistId: string ) => void
}

export const AddItemForm = (props: PropsItemForm) => {

  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addTask = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      props.addTask(newTitle, props.todolistId);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  }

  return (
    <div>
      <input value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? 'error' : ''}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};


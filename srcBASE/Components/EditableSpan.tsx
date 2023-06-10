import React, {ChangeEvent, useState} from 'react';

type EditableSpan = {
  oldTitle: string
  callBack: (updateTitle: string) => void
}

export const EditableSpan = (props: EditableSpan) => {

  let [updateTitle, setUpdateTitle] = useState(props.oldTitle)
  let [statusTitle, setStatusTitle] = useState(false)

  const changedTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.currentTarget.value)
  }

  const updateTask = () => {
    props.callBack(updateTitle)
    setStatusTitle(false)
  }

  const changeInput = () => {
    setStatusTitle(true)
  }

  const editHandler = () => {
    setStatusTitle(!statusTitle)
    if(statusTitle) updateTask()
  }

  return (

      statusTitle
      ? <input onChange={changedTitleTask} value={updateTitle} autoFocus onBlur={updateTask}/>
      : <span onClick={changeInput}>{updateTitle}</span>
);
};

import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';

type SuperCheckBoxType = {
  isDone: boolean,
  callBack: (changeEvent: boolean) => void
}

const SuperCheckbox = (props: SuperCheckBoxType) => {
  const {isDone, callBack} = props
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      callBack(e.currentTarget.checked)
    // props.changeTaskStatus(t.id, newIsDoneValue, props.id);
  }


  return (
    <div>
      <Checkbox
        checked={isDone}
        color="primary"
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default SuperCheckbox;
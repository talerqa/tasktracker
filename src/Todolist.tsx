import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './Components/AddItemForm';
import {EditableSpan} from './Components/EditableSpan';
import {Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    placeholder: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    filter: FilterValuesType;
    updateTaskTitle: (taskId: string, title: string, todolistId: string) => void;
    changeTitleTodoList: (id: string, title: string) => void;
};

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id);
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const callBackSuperInput = (title: string) => {
        props.addTask(title, props.id);
    };

    const updateTaskTitle = (taskId: string, title: string) => {
        props.updateTaskTitle(taskId, title, props.id);
    };

    const onChangeTitleTodoList = (title: string) => {
        props.changeTitleTodoList(props.id, title);
    };

    return (
      <div>
          <h3>
              <EditableSpan oldTitle={props.title} callBack={updateTitle => onChangeTitleTodoList(updateTitle)} />

              <IconButton aria-label="delete" size="small" onClick={removeTodolist}>
                  <DeleteIcon fontSize="small" />
              </IconButton>
          </h3>
          <AddItemForm callback={callBackSuperInput} placeholder={props.placeholder}/>
          <ul>
              {props.tasks.map(t => {
                  const onClickHandler = () => props.removeTask(t.id, props.id);
                  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                      let newIsDoneValue = e.currentTarget.checked;
                      props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                  };
                  return (
                    <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} aria-label="Checkbox demo" />
                        <EditableSpan oldTitle={t.title} callBack={title => updateTaskTitle(t.id, title)} />
                        <IconButton onClick={onClickHandler} aria-label="delete" size="small">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </li>
                  );
              })}
          </ul>
          <div>
              <Button variant={props.filter === 'all' ? 'contained' : 'outlined'} onClick={onAllClickHandler}>
                  All
              </Button>
              <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                      onClick={onActiveClickHandler}>Active
              </Button>
              <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                      onClick={onCompletedClickHandler}>Completed
              </Button>
          </div>
      </div>)
}



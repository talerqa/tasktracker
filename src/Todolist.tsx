import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import SuperInput from './Components/SuperInput';
import {EditableSpan} from './Components/EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTitleTodoList: (id: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const callBackSuperInput = ( title: string) =>{
        props.addTask(title, props.id)
    }

    const updateTaskTitle = (taskId: string, title: string) => {
        props.updateTaskTitle(taskId, title, props.id)
    }

    const onChangeTitleTodoList = (title: string) => {
        props.changeTitleTodoList(props.todoListId, title)
    }


    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={(updateTitle)=> onChangeTitleTodoList(updateTitle)}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <SuperInput callback={callBackSuperInput}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title} callBack={(title)=> updateTaskTitle(t.id, title)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}



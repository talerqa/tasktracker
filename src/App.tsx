import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './Components/AddItemForm';
import {ButtonAppBar} from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import {
  addTodolistAC,
  changeFilterValueAC,
  changeTodolistTitleAC,
  removeTodoListAC,
  todolistsReducer
} from './Reducers/todolistsReducer';
import {
  addTaskAC,
  addTaskEmptyAC,
  changeStatusAC,
  removeTaskAC,
  taskReducer,
  updateTaskTitleAC
} from './Reducers/taskReducer';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let placeholderTodoList = 'Add Todolist';
  let placeholderTask = 'Add Task';


  let [todolists, dispatchTodolist] = useReducer(todolistsReducer, [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ]);

  let [tasks, dispatchTask] = useReducer(taskReducer, {
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: v1(), title: 'SCSS', isDone: true},
      {id: v1(), title: 'Angular', isDone: false},
      {id: v1(), title: 'JS', isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'React Book', isDone: true}
    ]
  });


  function removeTask(id: string, todolistId: string) {
    dispatchTask(removeTaskAC(id, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    dispatchTask(addTaskAC(title, todolistId))
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatchTask(changeStatusAC(id, isDone, todolistId))
  }
  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchTodolist(changeFilterValueAC(value, todolistId))
  }
  function removeTodolist( todolistId: string) {
    dispatchTodolist(removeTodoListAC(todolistId))
    delete tasks[todolistId]
  }

  function addTodoList(title: string) {
    let todolistId = v1()
    dispatchTodolist(addTodolistAC(title, todolistId))
    dispatchTask(addTaskEmptyAC(todolistId))
  }

  function updateTaskTitle(id: string, title: string, todolistId: string) {
    dispatchTask(updateTaskTitleAC(id, title, todolistId))
  }

  function changeTitleTodoList(id: string, title: string) {
    dispatchTodolist(changeTodolistTitleAC(id, title))
  }

  return (
    <div className="App">

      <ButtonAppBar/>

      <Container fixed>
        <Grid container style={{padding: '10px'}}>
          <AddItemForm callback={addTodoList} placeholder={placeholderTodoList}/>
        </Grid>


        <Grid container spacing={3}>
          {todolists.map(tl => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === 'active') {
              tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
            }
            return <Grid item key={tl.id}>
              <Paper elevation={5} style={{padding: '10px'}}>
                <Todolist
                  id={tl.id}
                  placeholder={placeholderTask}
                  title={tl.title}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                  updateTaskTitle={updateTaskTitle}
                  changeTitleTodoList={changeTitleTodoList}
                />
              </Paper>
            </Grid>
          })
          }
        </Grid>


      </Container>
    </div>
    );
}

export default App;

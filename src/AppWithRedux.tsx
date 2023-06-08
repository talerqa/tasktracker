import React, {useCallback} from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistWithRedux} from './TodolistWithRedux';


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const AppWithRedux = () => {
  console.log('App')
  let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

  const dispatch = useDispatch()

  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId))
  }

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId));
  }, [dispatch])

  const changeStatus =useCallback( (id: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(id, isDone, todolistId))
  }, [dispatch])

  const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId));
  }, [dispatch])

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }, [dispatch])

  const removeTodolist = useCallback((id: string) => {
    let action = removeTodolistAC(id)
    dispatch(action)
  }, [dispatch])

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodolistTitleAC(id, title))
  }, [dispatch])

  const addTodolist = useCallback((title: string) => {
    let action = addTodolistAC(title)
    dispatch(action)
  }, [dispatch])

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              return <Grid key={tl.id} item>
                <Paper style={{padding: '10px'}}>
                  <TodolistWithRedux
                    id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
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

export default AppWithRedux;
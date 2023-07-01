import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string
  taskId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK',
  task: TaskType
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS',
  todolistId: string
  taskId: string
  status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
  todolistId: string
  taskId: string
  title: string
}

export type SetTaskType = ReturnType<typeof setTasksAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistActionType
  | SetTaskType

const initialState: TasksStateType = {
  /*"todolistId1": [
      { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ],
  "todolistId2": [
      { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {

    case 'SET-TODO-LISTS': {
      const copyState = {...state}
      action.todos.forEach((tl) => {
        copyState[tl.id] = []
      })
      return copyState
    }

    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter(t => t.id !== action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;

    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolist.id]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id];
      return copyState;
    }
    case 'SET-TASKS': {
      return {
        ...state,
        [action.todolistId]: action.tasks
      }
    }
    default:
      return state;
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
  return {type: 'SET-TASKS', tasks, todolistId} as const
}

export const getTasksThunkCreator = (todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.getTasks(todolistId)
    .then((res) => {
      dispatch(setTasksAC(res.data.items, todolistId))
    })
}

export const deleteTaskThunkCreator = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTask(todoId, taskId)
    .then((res) => {
      dispatch(removeTaskAC(taskId, todoId))
    })
}

export const addTaskThunkCreator = (todoId: string, title: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTask(todoId, title)
    .then((res) => {
      dispatch(addTaskAC(res.data.data.item))
    })
}

export const changeTaskStatusThunkCreator = (taskId: string, status: TaskStatuses, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const task = getState().tasks[todolistId].find(t => t.id === taskId)

  const model: UpdateTaskModelType = {
    title: task!.title,
    startDate: task!.startDate,
    priority: task!.priority,
    description: task!.description,
    deadline: task!.deadline,
    status
  }

  todolistsAPI.updateTask(todolistId,taskId,model)
    .then((res)=>{
      dispatch(changeTaskStatusAC(taskId,status, todolistId))
    })
}

export const updateTaskTitleThunkCreator = (taskId: string, title: string, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const task = getState().tasks[todolistId].find(t => t.id === taskId)

  const model: UpdateTaskModelType = {
    title,
    startDate: task!.startDate,
    priority: task!.priority,
    description: task!.description,
    deadline: task!.deadline,
    status: task!.status
  }

  todolistsAPI.updateTask(todolistId,taskId,model)
    .then((res)=>{
      dispatch(changeTaskTitleAC(taskId, title, todolistId))
    })
}

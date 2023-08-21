import { TasksStateType } from "../App";
import { v1 } from "uuid";

type CommonACType =
  | AddTaskEmptyACType
  | RemoveTaskACType
  | AddTaskACTypeACType
  | ChangeStatusTypeACType
  | UpdateTaskTitleACType;
type AddTaskEmptyACType = ReturnType<typeof addTaskEmptyAC>;
type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type AddTaskACTypeACType = ReturnType<typeof addTaskAC>;
type ChangeStatusTypeACType = ReturnType<typeof changeStatusAC>;
type UpdateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>;

export const taskReducer = (state: TasksStateType, action: CommonACType): TasksStateType => {
  switch (action.type) {
    case "ADD-TASK-EMPTY": {
      return { [action.payload.todolistId]: [], ...state };
    }
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((task) => task.id !== action.payload.id),
      };
    }
    case "ADD-TASK": {
      let task = { id: v1(), title: action.payload.title, isDone: false };
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId], task],
      };
    }
    case "CHANGE-STATUS-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
          task.id === action.payload.id ? { ...task, isDone: action.payload.isDone } : task,
        ),
      };
    }
    case "UPDATE-TITLE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
          task.id === action.payload.id ? { ...task, title: action.payload.title } : task,
        ),
      };
    }
    default:
      return state;
  }
};

//Добавляем пустую таску при добавлении Туду листа
export const addTaskEmptyAC = (todolistId: string) => {
  return {
    type: "ADD-TASK-EMPTY",
    payload: {
      todolistId,
    },
  } as const;
};

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      title,
      todolistId,
    },
  } as const;
};

//Удаляем таски
export const removeTaskAC = (id: string, todolistId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      id,
      todolistId,
    },
  } as const;
};

//Изменяем статус таски
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
  return {
    type: "CHANGE-STATUS-TASK",
    payload: {
      id,
      isDone,
      todolistId,
    },
  } as const;
};

//Измняем название таски
export const updateTaskTitleAC = (id: string, title: string, todolistId: string) => {
  return {
    type: "UPDATE-TITLE-TASK",
    payload: {
      id,
      title,
      todolistId,
    },
  } as const;
};

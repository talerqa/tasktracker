import { FilterValuesType } from "../App";

export const todolistsReducer = (state: any, action: CommonType) => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.payload.id);
    }

    case "ADD-TODOLIST": {
      let task = { id: action.payload.todolistId, title: action.payload.title, isDone: false };
      return [...state, task];
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((el) => (el.id === action.payload.todolistId ? { ...el, title: action.payload.title } : el));
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) => (el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el));
    }

    default:
      return state;
  }
};

type CommonType = RemoveTodolistType | AddTodolistType | ChangeTodolistType | ChangeFilterType;

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;

export const removeTodolistAC = (id: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      id,
    },
  } as const;
};

type AddTodolistType = ReturnType<typeof addTodolistAC>;

export const addTodolistAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      title,
      todolistId,
    },
  } as const;
};

type ChangeTodolistType = ReturnType<typeof changeTodolistTitleAC>;

export const changeTodolistTitleAC = (title: string, todolistId: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      title,
      todolistId,
    } as const,
  };
};

type ChangeFilterType = ReturnType<typeof changeFilterAC>;

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      id,
      filter,
    },
  } as const;
};

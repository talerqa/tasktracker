import { TaskType, todolistsAPI, TodolistType } from "../api/todolists-api";
import { Dispatch } from "redux";
import { TodoListDomainType } from "../../src13/state/todolists-reducer";
import { AppRootStateType } from "./store";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  todolist: TodolistType;
};
export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};
export type SetTodolistActionType = {
  type: "SET-TODO-LISTS";
  todos: TodolistType[];
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistActionType;

const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType,
): Array<TodolistDomainType> => {
  console.log(state);
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      const newTodoList: TodoListDomainType = { ...action.todolist, filter: "all" };
      return [newTodoList, ...state];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter;
      }
      return [...state];
    }

    case "SET-TODO-LISTS": {
      return action.todos.map((tl) => ({ ...tl, filter: "all" }));
    }

    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", todolist };
};
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title };
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter };
};
export const SetTodolistActionType = (todos: TodolistType[]): SetTodolistActionType => {
  return { type: "SET-TODO-LISTS", todos } as const;
};

export const getTodolistsThunkCreator = () => (dispatch: Dispatch) => {
  todolistsAPI.getTodolists().then((res) => {
    dispatch(SetTodolistActionType(res.data));
  });
};

export const removeTodolistThunkCreator = (todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTodolist(todolistId).then((res) => {
    dispatch(removeTodolistAC(todolistId));
  });
};

export const addTodolistThunkCreator = (title: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item));
  });
};

export const changeTodolistTitleThunkCreator =
  (todolistId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    // const todolist = getState().todolists.find(t => t.id === todolistId)
    //
    // const modelTodolist: TodolistType = {
    //   title,
    //   order: todolist!.order,
    //   addedDate: todolist!.addedDate,
    //   id: todolist!.id,
    // }

    todolistsAPI.updateTodolist(todolistId, title).then((res) => {
      dispatch(changeTodolistTitleAC(todolistId, title));
    });
  };

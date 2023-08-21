import { v1 } from "uuid";
import {
  addTodolistAC,
  changeFilterValueAC,
  changeTodolistTitleAC,
  removeTodoListAC,
  todolistsReducer,
} from "./todolistsReducer";
import { TodolistType } from "../App";

test("change filter todolist", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const initialState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
  const filter = "active";

  const endState = todolistsReducer(initialState, changeFilterValueAC(filter, todolistId1));
  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe(filter);
});

test("remove todolist", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const initialState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
  const endState = todolistsReducer(initialState, removeTodoListAC(todolistId1));
  expect(endState.length).toBe(1);
});

test("add todolist", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let todolistId3 = v1();

  const initialState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(initialState, addTodolistAC("New title", todolistId3));
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("New title");
});

test("change TodoList Title", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const initialState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(initialState, changeTodolistTitleAC(todolistId1, "New title"));
  expect(endState[0].title).toBe("New title");
});

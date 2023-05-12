import {v1} from 'uuid';
import {ChangeFilterValueTypeACType, CommonTypeAC, todolistsReducer} from './todolistsReducer';
import {TodolistType} from '../App';

test('change filter todolist', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ]
  const filter = 'active';
  const action: ChangeFilterValueTypeACType = {
    type: 'CHANGE-FILTER',
    payload: {
      value: filter,
      todolistId: todolistId1
    }
  };
  const endState = todolistsReducer(initialState, action);
  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe(filter);
});


test('remove todolist', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ]

  const action: CommonTypeAC = {
    type: 'REMOVE-TODOLIST',
    payload: {
      todolistId: todolistId1
    }
  };
  const endState = todolistsReducer(initialState, action);
  expect(endState.length).toBe(1);
});

test('add todolist', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let todolistId3 = v1();

  const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ]

  const action: CommonTypeAC = {
    type: 'ADD-TODOLIST',
    payload: {
      title: 'New title',
      todolistId: todolistId3
    }
  };
  const endState = todolistsReducer(initialState, action);
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe('New title');
});

test('change TodoList Title', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ]

  const action: CommonTypeAC = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      title: 'New title',
      id: todolistId1
    }
  };
  const endState = todolistsReducer(initialState, action);
  expect(endState[0].title).toBe('New title');
});
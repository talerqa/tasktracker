import {v1} from 'uuid';
import {ChangeFilterValueTypeACType, CommonTypeAC, todolistsReducer} from './todolistsReducer';
import {TodolistType} from '../App';



test('add todolist', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const initialState: TodolistType[] =       [
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

  expect(endState[0].filter).toBe(filter);
});
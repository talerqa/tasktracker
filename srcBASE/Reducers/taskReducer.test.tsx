import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {addTaskAC, addTaskEmptyAC, changeStatusAC, removeTaskAC, taskReducer, updateTaskTitleAC} from './taskReducer';

test('add task empty for new todolist', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let todolistId3 = v1();

  const initialState: TasksStateType = {
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
  }
  const endState = taskReducer(initialState, addTaskEmptyAC(todolistId3));
  expect(endState[todolistId3].length).toBe(0);
});

test('add task', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let taskId = v1();
  const initialState: TasksStateType = {
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
  }
  const endState = taskReducer(initialState, addTaskAC(taskId, todolistId1));
  expect(endState[todolistId1].length).toBe(6);
});

test('remove task', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let taskId = v1();
  const initialState: TasksStateType = {
    [todolistId1]: [
      {id: taskId, title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: v1(), title: 'SCSS', isDone: true},
      {id: v1(), title: 'Angular', isDone: false},
      {id: v1(), title: 'JS', isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'React Book', isDone: true}
    ]
  }
  const endState = taskReducer(initialState, removeTaskAC(taskId, todolistId1));
  expect(endState[todolistId1].length).toBe(4);
  expect(endState[todolistId1][0].title).toBe('React');
});

test('change status task', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let taskId = v1();
  const initialState: TasksStateType = {
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: taskId, title: 'SCSS', isDone: true},
      {id: v1(), title: 'Angular', isDone: false},
      {id: v1(), title: 'JS', isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'React Book', isDone: true}
    ]
  }

  const endState = taskReducer(initialState, changeStatusAC(taskId, false, todolistId1));
  expect(endState[todolistId1].find( f => f.id === taskId)!.isDone).toBe(false);
});

test('change title task', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let taskId = v1();
  const initialState: TasksStateType = {
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: taskId, title: 'SCSS', isDone: true},
      {id: v1(), title: 'Angular', isDone: false},
      {id: v1(), title: 'JS', isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'React Book', isDone: true}
    ]
  }

  const endState = taskReducer(initialState, updateTaskTitleAC(taskId, 'TITLE', todolistId1));
  expect(endState[todolistId1].find( f => f.id === taskId)!.title).toBe('TITLE');
});

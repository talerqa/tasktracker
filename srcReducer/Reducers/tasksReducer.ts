import { TaskType } from "../Todolist";
import { v1 } from "uuid";

export const tasksReducer = (state: TaskType[], action: CommonType) => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return state.filter((t) => t.id !== action.payload.id);
    }
    case "ADD-TASKS": {
      let task = { id: v1(), title: action.payload.title, isDone: false };
      let newTasks = [task, ...state];
      return newTasks;
    }
    default:
      return state;
  }
};

type CommonType = RemoveTaskACType | AddTaskACType;
type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (id: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      id,
    },
  } as const;
};

type AddTaskACType = ReturnType<typeof addTasksAC>;
export const addTasksAC = (title: string) => {
  return {
    type: "ADD-TASKS",
    payload: {
      title,
    },
  } as const;
};

// import {TaskType} from "../Todolist";
// import {v1} from "uuid";
//
// export const tasksReducer = (state: TaskType[], action: CommonType): TaskType[] => {
//     switch (action.type) {
//         case 'Remove-Task': {
//             // let filteredTasks = tasks.filter(t => t.id != id);
//             // dispachTasks(filteredTasks);
//             return state.filter(el=>el.id !== action.payload.id)
//         }
//         case "Add-Task": {
//              let newTask = { id: v1(), title:action.payload.title, isDone: false };
//             return [...state, newTask]
//         }
//         default:
//             return state
//     }
// }
// type CommonType = RemoveTaskACType | AddTaskACType
// type RemoveTaskACType = ReturnType<typeof removeTaskAC>
// type AddTaskACType = ReturnType<typeof addTaskAC>
//
// export const removeTaskAC = (id: string) => {
//     return {
//         type: 'Remove-Task',
//         payload:{
//             id
//         }
//     } as const
// }
//
// export const addTaskAC = (title: string) =>{
//     return {
//         type: 'Add-Task',
//         payload:{title}
//     }as const
//
// }

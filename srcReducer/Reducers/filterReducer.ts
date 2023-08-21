import { FilterValuesType } from "../App";

export const filterReducer = (state: FilterValuesType, action: CommonType): FilterValuesType => {
  switch (action.type) {
    case "CHANGE-FILTER": {
      return action.payload.value;
    }
    default:
      return state;
  }
};

type CommonType = ChangeFilterType;
type ChangeFilterType = ReturnType<typeof changeFilterAC>;
export const changeFilterAC = (value: FilterValuesType) => {
  return {
    type: "CHANGE-FILTER",
    payload: {
      value,
    },
  } as const;
};

// import {FilterValuesType} from "../App";
//
// export const FilterReducer = (state: FilterValuesType, action: commonType): FilterValuesType=>{
//     switch (action.type) {
//         case 'ChangeFilter': {
//             return action.payload.value
//         }
//         default: return state
//     }
// }
//
// type commonType = ChangeFilterACType
// type ChangeFilterACType = ReturnType<typeof changeFilterAC>
// export const changeFilterAC = (value: FilterValuesType)=>{
//     return {
//         type:'ChangeFilter',
//         payload: {
//             value
//         }
//     } as const
// }

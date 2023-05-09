import { ADD_DEFECT } from "./actionConstants";

export const addDefect = (data) => {
  return {
    type: ADD_DEFECT,
    payload: data,
  };
};

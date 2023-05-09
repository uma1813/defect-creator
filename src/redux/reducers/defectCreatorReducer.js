import {
  ADD_DEFECT,
  CLOSE_DEFECT,
  VALID_USER,
} from "../actions/actionConstants";

const initialState = {
  data: {},
  loggedInUser: "",
  userName: "",
  validUser: false,
};

export default function defectReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DEFECT:
      state.data[state.loggedInUser] = {
        ...state.data[state.loggedInUser],
        defects: [
          ...(state.data[state.loggedInUser]?.defects || []),
          action.payload,
        ],
      };
      return { ...state };
    case VALID_USER:
      return {
        ...state,
        validUser: action.payload.status,
        loggedInUser: action.payload.userId,
        userName: action.payload.username,
      };
    case CLOSE_DEFECT:
      state.data[state.loggedInUser] = {
        defects: action.payload,
      };
      return { ...state };
    default:
      return state;
  }
}

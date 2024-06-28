// Action types
export const ADD_TASK = "ADD";
export const REMOVE_TASK = "REMOVE";
export const SET_TASKS = "MODIFY";

// Reducer function
export default function tasksReducer(state, action) {
  switch (action.type) {
    case SET_TASKS:
      return [...action.data.tasks];
    case ADD_TASK:
      return [...state, action.data.tasks];
    case REMOVE_TASK:
      return state.filter((todo) => todo.id !== action.data.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

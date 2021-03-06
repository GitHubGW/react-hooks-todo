export const initialState = {
  toDos: [],
  completedToDos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      const addResult = { ...state, toDos: [...state.toDos, { id: action.id, text: action.text }] };
      return addResult;
    case "delete":
      const deleteResult = { ...state, toDos: state.toDos.filter((todo) => todo.id !== action.id) };
      return deleteResult;
    case "complete":
      const completedTodo = state.toDos.find((todo) => todo.id === action.id);
      const completedResult = {
        ...state,
        toDos: state.toDos.filter((todo) => todo.id !== action.id),
        completedToDos: [...state.completedToDos, completedTodo],
      };
      return completedResult;
    case "uncomplete":
      const uncompletedTodo = state.completedToDos.find((todo) => todo.id === action.id);
      const uncompletedResult = {
        ...state,
        toDos: [...state.toDos, uncompletedTodo],
        completedToDos: state.completedToDos.filter((completedToDo) => completedToDo.id !== action.id),
      };
      return uncompletedResult;
    default:
      throw new Error("Wrong Action Type!");
  }
};

export default reducer;

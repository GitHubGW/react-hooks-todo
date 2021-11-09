import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import reducer, { initialState } from "./reducer";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTodo(value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    dispatch({ type: "add", id: uuidv4(), text: newTodo });
    setNewTodo("");
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "delete", id });
  };

  const handleCompleteTodo = (id) => {
    dispatch({ type: "complete", id });
  };

  const handleUnCompleteTodo = (id) => {
    dispatch({ type: "uncomplete", id });
  };

  return (
    <div>
      <h1>ToDos</h1>
      <form onSubmit={handleAddTodo}>
        <input type="text" placeholder="Write to do" onChange={onChange} value={newTodo}></input>
        <button type="submit" onClick={handleAddTodo}>
          Add
        </button>
      </form>
      <ul>
        {state?.toDos?.length > 0 && <h2>ToDos</h2>}
        {state?.toDos?.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => handleCompleteTodo(todo.id)}>✅</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>

      <ul>
        {state?.completedToDos?.length > 0 && <h2>Completed ToDos</h2>}
        {state?.completedToDos?.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => handleUnCompleteTodo(todo.id)}>↩️</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

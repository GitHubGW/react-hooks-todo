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

  const handleDeleteTodo = (id) => dispatch({ type: "delete", id });

  const handleCompleteTodo = (id) => dispatch({ type: "complete", id });

  const handleUnCompleteTodo = (id) => dispatch({ type: "uncomplete", id });

  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
      <h1>π ν¬λ π</h1>
      <form onSubmit={handleAddTodo}>
        <input type="text" placeholder="ν΄μΌν  μΌλ€μ μλ ₯νμΈμ." onChange={onChange} value={newTodo}></input>
        <button type="submit" onClick={handleAddTodo}>
          μΆκ°
        </button>
      </form>
      <ul>
        {state?.toDos?.length > 0 && <h2>ν¬λ λ¦¬μ€νΈ</h2>}
        {state?.toDos?.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => handleCompleteTodo(todo.id)}>β</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>β</button>
          </li>
        ))}
      </ul>

      <ul>
        {state?.completedToDos?.length > 0 && <h2>μλ£ν ν¬λ λ¦¬μ€νΈ</h2>}
        {state?.completedToDos?.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => handleUnCompleteTodo(todo.id)}>β©οΈ</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

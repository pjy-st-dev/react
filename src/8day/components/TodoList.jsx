import styles from "./TodoList.module.css";

function TodoList({ todos, removeTodo, toggleTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li className={styles.item} key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
          />

          <span className={todo.done ? styles.textDone : ""}>
            {todo.text}
          </span>

          <button onClick={() => removeTodo(todo.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

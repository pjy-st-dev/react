import { motion, AnimatePresence } from "framer-motion";

function TodoList({ todos, removeTodo, toggleTodo }) {
  return (
    <ul>
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />

            <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
              {todo.text}
            </span>

            <button onClick={() => removeTodo(todo.id)}>삭제</button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TodoList;

import { useEffect, useState } from "react";
import Input from "./Input";
import TodoList from "./TodoList";


function App() {
  // TodoList
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // Todo 추가
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // Todo 삭제
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Todo 완료 체크
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h1>Todo App</h1>

      {/* addTodo만 전달 */}
      <Input addTodo={addTodo} />

      {/* todos와 remove/toggle 전달 */}
        <TodoList
          todos={todos}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
        />
    </div>
  );
}

export default App;

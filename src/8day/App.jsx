import { useEffect, useState } from "react";
import TodoList from "./components/TodoList.jsx";
import './index.css'
import styles from "./App.module.css"; // Day 8: CSS 모듈


/**
  ✅ 1. React에서 스타일링하는 3가지 방법
    - CSS 기본 적용 방식 3가지 이해
    - CSS Module 사용법 (실무에서 많이 사용)
    - 컴포넌트 단위 디자인 구조 잡기
    - Styled Components(선택) 맛보기
  
  🎯 2. CSS Module 사용법 (실습!)
      src/8day/
           ├ App.jsx
           ├ App.module.css
           ├ components/
           │    ├ Input.jsx
           │    ├ Input.module.css
           │    ├ TodoList.jsx
           │    ├ TodoList.module.css

  
  CSS 기본 적용 방식 3가지 이해
  1) 일반 CSS 파일
  ================================================================================================================
  import "./App.css"

  ================================================================================================================

  2) CSS Module (★ 실무 추천)
  ================================================================================================================
  import styles from "./Button.module.css"

  파일명 뒤에 반드시 .module.css
  ○ 컴포넌트 단위 스타일
  ○ 클래스명이 충돌하지 않음 (자동으로 유니크하게 생성됨)
  ================================================================================================================

  3) CSS-in-JS (styled-components 같은 라이브러리)
  ================================================================================================================
  const Button = styled.button`
  background: blue;
`
  스타일을 JS에서 직접 관리
  조건부 스타일링 편함
  ================================================================================================================
 */
function App() {
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 다크모드 body 클래스 업데이트
  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
  }, [dark]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Todo App</h1>
        <button className={styles.darkBtn} onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      <div className={styles.inputBox}>
        <input
          className={styles.input}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button className={styles.addBtn} onClick={addTodo}>
          추가
        </button>
      </div>

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    </div>
  );
}

export default App;
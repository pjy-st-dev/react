
/**
 12일차:
 🌟 Day 12 — useRef 완전 정복하기
  React에서 useRef는 두 가지 상황에서 많이 사용됨:
    ✔ 1. DOM 요소 직접 접근 (포커스 주기 등)
    ✔ 2. 렌더링을 발생시키지 않는 값 저장 (state와 비교됨) 

  1️⃣ useRef란?
    👉 ref.current에 값이 저장됨
    👉 값이 바뀌어도 컴포넌트가 재렌더링되지 않음!!
    👉 DOM 요소에 연결하면 ref.current가 그 DOM을 가리킴    
  
  2️⃣ 기본 예제: 버튼 클릭하면 input에 포커스 주기    
  ================================================================================================================           
  import { useRef } from "react";

  function App() {
    const inputRef = useRef(null);

    const focusInput = () => {
      inputRef.current.focus();  // DOM 직접 접근!
    };

    return (
      <div>
        <input ref={inputRef} placeholder="여기에 포커스" />
        <button onClick={focusInput}>포커스 주기</button>
      </div>
    );
  }

  export default App;
  ================================================================================================================           

  3️⃣ useRef vs useState 차이
    | 항목         | useState     | useRef              |
    | ----------  | ------------ | ------------------- |
    | 값 변경 시    | **재렌더링 O**   | **재렌더링 X**          |
    | 저장되는 곳   | 컴포넌트 state   | ref.current         |
    | 언제 사용?    | UI가 바뀌어야 할 때 | 렌더링 없이 값 저장, DOM 제어 |

  4️⃣ 렌더링 없이 값 저장하기 (카운트 예제)    
  ================================================================================================================           
  import { useRef, useState } from "react";

  function App() {
    const countRef = useRef(0);
    const [renderCount, setRenderCount] = useState(0);

    const increase = () => {
      countRef.current += 1;        // 증가하지만 화면은 안 바뀜!
      setRenderCount(renderCount+1); // 렌더링 시 ref 값 확인 가능
    };

    return (
      <div>
        <p>ref 값: {countRef.current}</p>
        <p>렌더링 횟수: {renderCount}</p>
        <button onClick={increase}>증가</button>
      </div>
    );
  }

  export default App;
  ================================================================================================================           

  5️⃣ 초보자들이 가장 많이 쓰는 상황
    ✔ 입력 후 자동 포커스
    ✔ 특정 div 위치로 스크롤
    ✔ setInterval 등 “변하는 값 저장”
    ✔ 렌더링 발생시키고 싶지 않은 값 유지
  
  6️⃣ Todo 프로젝트와 결합하기 (추천)    
  ================================================================================================================           
  const inputRef = useRef(null);

  const addTodo = () => {
    ...
    inputRef.current.focus();
  };

  return (
    <input ref={inputRef} ... />
  );
  ================================================================================================================           

  12일차 요약
    | 개념         | 설명                         |
    | ----------- | -------------------------- |
    | useRef      | DOM 직접 접근 & 렌더링 없이 값 저장    |
    | ref.current | 저장된 실값                     |
    | 리렌더링 여부 | ref 변경은 렌더링 발생 X           |
    | 주요 사용처   | 포커스, 스크롤, interval, 이전값 기억 |


  풀 프로젝트 
  ****************************************************************************************************************
  src/
  ├─ App.jsx
  ├─ components/
  │   └─ TodoList.jsx
  └─ main.jsx  

  📌 1) App.jsx
  useRef로 input 포커스 + Todo 추가 + 렌더링 최소화
  ================================================================================================================           
  import { useRef, useState } from "react";
  import TodoList from "./components/TodoList";

  function App() {
    const inputRef = useRef(null); // DOM 요소 직접 접근
    const idRef = useRef(1);       // 랜더링 없이 증가하는 id 저장
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
      const text = inputRef.current.value.trim();
      if (text === "") return;

      const newTodo = {
        id: idRef.current++,
        text,
        done: false,
      };

      setTodos((prev) => [...prev, newTodo]);

      // 입력창 비우기 + 포커스 유지
      inputRef.current.value = "";
      inputRef.current.focus();
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        addTodo();
      }
    };

    const toggleTodo = (id) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    };

    const removeTodo = (id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return (
      <div style={{ maxWidth: 400, margin: "0 auto", paddingTop: 30 }}>
        <h1>📝 useRef 실습 Todo App</h1>

        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력하세요"
          style={{ padding: "8px", width: "70%", marginRight: "10px" }}
        />
        <button onClick={addTodo}>추가</button>

        <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
      </div>
    );
  }

  export default App;
  ================================================================================================================
  
  📌 2) components/TodoList.jsx
  깔끔한 Todo 렌더링 + 토글 + 삭제
  ================================================================================================================
  function TodoList({ todos, toggleTodo, removeTodo }) {
    return (
      <ul style={{ marginTop: 20, paddingLeft: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              listStyle: "none",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />

            <span
              style={{
                marginLeft: 10,
                textDecoration: todo.done ? "line-through" : "none",
                flex: 1,
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => removeTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    );
  }

  export default TodoList;
  ================================================================================================================

  📌 3) main.jsx
  기본 React 렌더링 코드  
  ================================================================================================================
  import ReactDOM from "react-dom/client";
  import App from "./App";

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  ================================================================================================================
  
  🎉 12일차 실습에서 배울 수 있는 내용
  | 기능                     | useRef가 담당             |
  | --------------          | ------------------------ |
  | 입력창 포커스             | inputRef.current.focus() |
  | Enter 키 처리            | DOM 이벤트 직접 처리        |
  | id 값 렌더링 없이 증가     | idRef.current++          |
  | 렌더링 최소화             | ref는 렌더링되지 않음       |
  ****************************************************************************************************************

  */
   

import  { useRef, useState }  from "react";
import TodoList from "./components/TodoList";

function App() {
  
  // 2️⃣ 기본 예제: 버튼 클릭하면 input에 포커스 주기    
  const inputRef1 = useRef(null);

  const focusInput = () => {
    inputRef1.current.focus();
  }

  const example = (
    <>
      <input ref={inputRef1} placeholder="여기에 포커스"></input>    
      <button onClick={focusInput}>포커스 주기</button>
    </>
  );

  // 4️⃣ 렌더링 없이 값 저장하기 (카운트 예제)
  const [renderCount, setRenderCount] = useState(0);
  const countRef = useRef(0);

  const increase = () => {
    countRef.current += 1;  // 값은 증가하지만 화면은 안 바뀜 
    setRenderCount(renderCount+1);  // 랜더링 시 ref 값 확인 가능 
  }

const example2 = (
  <>
    <div>
      <p>ref 값 : {countRef.current}</p>
      <p>랜더링 횟수 : {renderCount}</p>
      <button onClick={increase}>증가</button>
    </div>
  </>
)

// 예제 
// *******************************************************************************************************************************************************************
const inputRef2 = useRef(null); // DOM 요소 담아 둘 변수 선언 
const idRef = useRef(1);        // 랜더링 없이 증가하는 변수 지정 -> id로 사용하기 위해 
const [todos, setTodos] = useState([]); // todos 선언 

// 리스트 등록 
const addTodo = () => {
  const text = inputRef2.current.value.trim();  // DOM에 현재 값 확인
  if(text == '') return; 

  // todos에 새로 들어갈 Map 생성
  const newTodo = {
    id : idRef.current ++ // 값이 변해도 랜더링 하지 않음
    , text // DOM 현재 값 
    , done:false  // false 기본값 세팅 체크박스를 선택하면 값 변경 
  }

  setTodos(() => [...todos, newTodo]);  // newTodo새로운 값을 현재 todos배열 뒤에 추가 후 새로 만듬

  inputRef2.current.value = ''; // DOM값 초기화 
  inputRef2.current.focus();  // DOM에 포커스 이동
}

// 엔터키 등록 처리 
const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
};

// 체크박스 선택
const toggleTodo = (id) => {
  // 체크박스가 선택된 id와 todos에 들어있는 배열 중 id가 동일한 값이면 todo.done 값을 변경 / 아니면 배열 그대로 등록
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  );
};

// 삭제 
const removeTodo = (id) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id));
};

const example3 = (
  <>
    <div style={{ maxWidth: 400, margin: "0 auto", paddingTop: 30 }}>
      <h1>📝 useRef 실습 Todo App</h1>
      <input ref={inputRef2} onKeyDown={handleKeyDown} placeholder="할 일을 입력하세요" style={{ padding: "8px", width: "70%", marginRight: "10px" }}></input>
      <button onClick={addTodo}>추가</button>
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo}/>
    </div>
  </>
);

return example3;

}

export default App

import { useState } from "react";

/**
 * 🎯 Day 4 학습 목표
    useState 완벽 이해
    Controlled input(입력창 값 관리)
    추가/삭제 기능 구현 방식 이해
    상태 변경이 일어날 때 React가 어떻게 렌더링하는지 이해
    실습: 간단한 Todo / 사용자 추가 앱 만들기

    1. useState란?
    ===========================================================
    const [value, setValue] = useState(초기값);
    ===========================================================
    React는 UI를 상태(state)에 따라 그리는 라이브러리야.
    value: 상태 변수
    setValue: 상태를 변경하는 함수
    초기값은 보통 "", 0, [], {} 등이 들어감
    상태가 변경되면 컴포넌트 전체가 다시 렌더링된다.

    2. Controlled Input이란?
    ===========================================================
      const [text, setText] = useState("");

      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
    ===========================================================
    React에서 입력창은 "상태로 제어"해야 한다.
    value는 React state에서 가져오고
    사용자가 입력하면 그 값을 state에 업데이트함
    그래서 입력창이 React가 완전히 컨트롤하는 구조 → Controlled Input

    3. 상태 변경 이후 렌더링
    ===========================================================
    setUsers([...users, newUser]);
    ===========================================================
    React는 다음을 실행함:
    상태 값 변경
    변경된 상태를 가진 컴포넌트를 다시 렌더링
    화면이 새 상태에 맞게 업데이트됨
    return이 다시 실행되는 것이지, addUser 함수 내부가 다시 실행되는 것이 아님!

    4. Day4 실습 예제 (아주 중요!!)
    ===========================================================
    import { useState } from "react";

    function App() {
      const [todos, setTodos] = useState([]);
      const [text, setText] = useState("");

      const addTodo = () => {
        if (!text) return;

        setTodos([...todos, text]);
        setText("");  // 입력창 초기화 ✔
      };

      const deleteTodo = (item) => {
        setTodos(todos.filter((todo) => todo !== item));
      };

      return (
        <div>
          <h1>Todo App</h1>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="할 일을 입력하세요"
          />
          <button onClick={addTodo}>추가</button>

          <ul>
            {todos.map((todo) => (
              <li key={todo}>
                {todo}
                <button onClick={() => deleteTodo(todo)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default App;
    ===========================================================

    🧠 Day4 핵심 정리
    | 개념              | 의미                               |
    | ---------------- | --------------------------         |
    | useState         | 상태를 저장하고 변경하는 훅            |
    | 상태 변경         | 컴포넌트 전체가 다시 렌더링됨           |
    | Controlled Input | 입력창 값이 React state에서 관리됨     |
    | 렌더링            | return 부분을 다시 실행 → 화면 업데이트 |

 * @returns 
 */
function App() {
  // 투두리스트
  // =============================================================================================================================================== 
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const addTodo = () => {
    if(!text){
      setError('할 일을 입력해주세요.');
      return;
    } 
    // 중복된 값이 있으면 등록 안함
    if(todos.some((data) => data.value == text )){
      setError('중복된 값이 있습니다.');
      return;
    } 
    setTodos([...todos, {value : text, isComplate : false}]);
    setText("");
    setError("");
  }
  
  const keyPress = (e) => {
    if(e.key == 'Enter'){
      addTodo();
      return;
    }
  }

  const deleteTodo = (item) => {
    setTodos(todos.filter((todo) => todo.value !== item ));
  }

  const toggleComplete = (e, value) => {
    setTodos(
      todos.map((todo) =>
        todo.value === value ? { ...todo, isComplate: e.target.checked } : todo
      )
    );
  }

  const example = (
    <div>
      <h1>Todo App</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} onKeyPress={keyPress} placeholder="할 일을 입력하세요."/>
      <button onClick={addTodo}>추가</button>
      <p style={{color:'red'}}>{error}</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.value}>
            <input type="checkbox" checked={todo.isComplate} onChange={(e) => toggleComplete(e, todo.value)}/>
              &nbsp;<span style={{textDecoration: todo.isComplate ? "line-through":""}}>{todo.value}</span>&nbsp;
            <button onClick={() => deleteTodo(todo.value)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>  
  )
  // 증가/ 증감
  // ===============================================================================================================================================

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count +1);
  }

  const decrement = () => {
    setCount(count -1);
  }

  const example2 = (
    <div>
      <h2>카운터: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )

  return example2;
}

export default App;
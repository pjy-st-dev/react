import { useState } from "react";
import WriteInput from "./WriteInput";
import ListPrint from "./ListPrint";



/** 
 * ✅ 📘 Day 5 학습 목표

  1. 상태와 입력창 연결하기 (Controlled Input) → onChange 이해
  2. 리스트 렌더링 복습 + 응용(map)
  3. 데이터 추가 기능 완성(add)
  4. 입력창 에러 처리(빈값, 중복 등)
  5. 불변성 원칙 지키며 배열 업데이트
 * @returns 
 */
function App() {

  const [text, setText] = useState("");

  /**
   *  1️⃣ onChange 제대로 이해
      React의 입력창은 기본적으로 브라우저가 관리하지만,
      React에서는 UI를 “내가 직접 통제”해야 한다.
      그래서 입력값을 상태와 연결하는 방식 → Controlled Component

      ===============================================================

      입력창에 글자를 치면
      → onChange 발생
      → setText 실행
      → 상태 업데이트
      → UI 자동 재렌더링

      즉, UI = 상태로부터 자동 생성되는 구조가 된다.
   */
  const example = (
    <>
      <input value={text} onChange={(e)=>setText(e.target.value)}/>
    </>
  )

  /**
   *  2️⃣ 리스트 렌더링 복습(map)
      배열을 화면에 여러 개 뿌릴 때는 map 사용
    
      ===============================================================
    
      key는 React가 요소를 구분할 수 있게 하는 "ID 같은 값"
   */
  const fruits = ["사과", "바나나", "키위"];
  const example2 = (
    <ul>
      {fruits.map((fruit) => (
        <li key="{fruit}">{fruit}</li>
      ))}
    </ul>
  );

  /**
   *  3️⃣ 데이터 추가 기능(add)
      Day 4처럼 Todo 추가 예제를 다시 정리하면:

      ===============================================================

      새로운 객체를 배열에 추가할 때는 기존 배열을 복사 + 새 요소 추가하는 방식만 사용해야 한다.(불변성 유지)
   */
  const [todos, setTodos] = useState([]);

  const addTodo = (value) => {
    if(!value.trim()) return;
    setTodos([...todos, {value:value, isComplete:false}]);
  }


  const example3 = (
    <>
      <WriteInput onSubmit={addTodo}/>
      <ListPrint todos={todos} />
    </>
  );

  return example3;
}

export default App;
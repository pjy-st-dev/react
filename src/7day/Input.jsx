import { useState } from "react";
/**
 👉 Input 안에서 input 상태는 스스로 관리한다.
 👉 버튼을 누르면 App의 addTodo(text)를 호출한다.
 */
function Input({ addTodo }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    addTodo(input);
    setInput(""); // 입력창 비우기
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
}

export default Input;

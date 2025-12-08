import { useState } from "react";

function WriteInput({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onSubmit(text);
    setText("");
  };

  return (
    <>
      <h3>등록</h3>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>등록</button>
    </>
  );
}

export default WriteInput;
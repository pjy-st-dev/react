import { useState, useEffect } from "react";

/**
 * 
✅ 1. 입력창 자동추천 기능 (검색 자동완성) 입력하면 추천 리스트가 아래에 나타나는 형태.

🔍 동작 흐름
 - 사용자가 입력(text state 변경)
 - useEffect가 text 변화를 감지
 - 미리 준비한 데이터에서 필터
 - 자동추천 목록 렌더링
 */

function App_1(){
  const countries = ["Korea", "Japan", "China", "Canada", "Chile", "Cambodia", "한국"];
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => { 
    if (text === "") {
      setList([]);
      return; 
    }

    const result = countries.filter((c) =>
      c.toLowerCase().includes(text.toLowerCase())
    );

    setList(result);
  }, [text]); // 입력값이 변할 때만 실행됨

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="국가 입력..."
      />

      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

}

export default App_1;



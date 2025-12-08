import { useState, useEffect } from "react";

/**
  ✅ 3. 서버 폴링(Server Polling) — setInterval 사용 예제
   - 폴링은 “서버에 일정 시간마다 자동으로 데이터 재요청”하는 것.
   - 여기서는 서버 대신 숫자 증가를 예제로 보여줄게.
 */
function App_3(){
  const [count, setCount] = useState(0);

  useEffect(() =>{
    console.log("폴링 시작");

    const id = setInterval(() => {
      console.log("서버에 요청 보내는 중 ... ");
      setCount((prev) => prev + 1);
    }, 2000);

    return () => {
      console.log("폴링 중단");
      clearInterval(id);
    };
  },[]);
  
  return(
    <>
      {count}
    </>
  )
}

export default App_3;
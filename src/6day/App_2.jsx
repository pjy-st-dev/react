import { useState, useEffect } from "react";

/**
 * 
  ✅ 2. 반응형 체크 (윈도우 크기 감지)
  브라우저 창 크기 변경 시 값을 실시간으로 감지하기.
  
  🔍 동작 흐름
  컴포넌트가 처음 나타날 때 → resize 이벤트 리스너 등록
  창 크기 변경 시 → width 업데이트
  컴포넌트가 사라질 때 → 리스너 제거(cleanup)
 */
function App_2(){
  const [width, setWidth] = useState(window.innerWidth);

  // 이벤트 
  useEffect(() => {

    const handleResize = () => {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // 클린업
    return () => {
      console.log("리스너 제거");
      // window.removeEventListener("resize",handleResize);
    }

  }, [width]);

  return(
    <>
    {width}
    </>
  )

}

export default App_2;



import { useState } from "react";

/*
JSX 기본 문법
 - JSX 규칙 4가지
  1. 반드시 하나의 부모 태그로 감싸야 함
     -> JSX 사용 시 감싸는 부모 태그는 항상 존재, HTML에 부모 태그가 필요 없는 경우 Fragment(<></>) 사용
     -> 부모 태그 없이 사용하면 오류 발생
  2. JSX에서 JavaScript 사용 → {}
  3. 속성은 camelCase 사용
  4. JSX에서는 표현식(값)만 가능, 문(statement)은 불가능
 - 조건부 렌더링
  1. 삼항 연산자
  2. && 연산자
  3. 변수에 JSX를 담아서 처리 가능
*/
function App() {
  /*
    1.반드시 하나의 부모 태그로 감싸야 함
    JSX 사용 시 하나의 부모 태그로 감싸야 한다.
    <div> 또는 <Fragment> 를 사용해야 한다.
  */

  // 1-1) 부모 태그로 감싼 경우
  const example1 = (
    <div>
      <p>example1</p>
    </div>
  );

  // 1-2) 불필요한 div를 피하고 싶다면 Fragment 사용
  const example2 = (
    <>
      <p>example2</p>
    </>
  );

  // 1-3) ❌ 잘못된 예 -> 부모 태그 없이 작성하면 오류
  // const wrong = (
  //   <h1>Hi</h1>
  //   <p>Hello</p>
  // );


  /*
    2.JSX에서 JavaScript 사용 → {}
  */
  // 2-1) 변수 출력
  const name = '홍길동';
  const example3 = (
    <p>{name} 입니다.</p>
  )

  // 2-2) 숫자 출력
  const example4 = (
    <p>1+4={1+4} 입니다.</p>
  )  

  // 2-3) 문자열 합치기
  const a = "Hello";
  const b = "React";  
  const example5 = (
    <p>{`${a} - ${b}`}</p>
  );

  // 2-4) 삼항 연산자 (조건부 렌더링)
  const isTrue = true;
  const example6 = (
    <p>{isTrue ? "true":"false"}</p>
  )
  
  // 2-5) 논리 연산자 &&
  const isShow = true;
  const example7 = (
    <p>{isShow && <b>출력</b>}</p>
  );

  // 2-6) 함수 호출결과 넣기 
  function getMessage(){
    return "Hello";
  }
  const example8 = (
    <p>{getMessage()}</p>
  )

  // 2-7) 배열 랜더링(map)
  const items = ['A','B','C','D'];
  const example9 = (
    <ul>
      {items.map(item => (
        <li key="{item}">{item}</li>
      ))}
    </ul>
  );

  // 2-10) 객체의 값 사용 
  const user = {
    name : '홍길동', 
    age : 25
  }
  const example10 = (
    <p>이름 : {user.name}, 나이 : {user.age}</p>
  )
  
  // 2-11) 스타일 적용 
  const styleObj = {
    color : 'red', 
    backgroundColor : 'black'
  }
  const example11 = (
    <p style={styleObj}>홍길동</p>
  )

  /*
    3. HTML 속성은 camelCase 사용
  */
  const example12 = (
    <p id="tom" className="nicks" onClick={()=>{console.log("안녕하세요!")}}>안녕하세요.</p>
  )
  /*
      HTML 속성	        JSX 속성
      class	            className
      onclick	          onClick
      for	              htmlFor
      maxlength	        maxLength
      autocomplete      autoComplete
      readonly	        readOnly
      tabindex	        tabIndex
      contenteditable	  contentEditable
      colspan	          colSpan
      rowspan	          rowSpan
      aria-label	      aria-label (aria-*는 그대로 사용)
      data-id	          data-id (data-*도 그대로 사용)
  */

  /*
    4. JSX에서는 표현식(값)만 가능, 문(statement)은 불가능
      - JSX는 JavaScript 표현식만 들어갈 수 있는 자리에 들어간다.
      - 그래서 값을 만들지 않는 statement는 넣으면 문법적으로 불가능.
      - React는 UI 렌더링 과정에서 JSX를 값(createElement 호출 결과)으로 변환한다.
      - 따라서 statement는 JSX 밖에서 처리하고, JSX 안에서는 표현식만 사용하는 패턴이 표준.    
  */

  // ========================================================================= 예제 : s

  // isLogin 초기값 false 선언 
  // 로그인 여부 상태  
  const [isLogin, setIsLogin] = useState(false);
  
  // userNmae 초기값 "" 선언
  // 사용자 이름 
  const [userName, setUserName] = useState("");

  const example13 = (
    <div style={{padding:"20px"}}>
      <h1>Welcom to React</h1>
      {/* 로그인 상태 아닐 때만 input 랜더링 */}
      {!isLogin && (
        <>
          <input placeholder="이름을 입력하세요" value={userName} onChange={(e)=>setUserName(e.target.value)} style={{marginRight:"10px"}}/>

          <button onClick={() => setIsLogin(true)} disabled={!userName}>로그인</button>
        </>
      )}

      {/* isLogin이 true일 때만 랜더링 */}
      {isLogin && (
        <>
          <h2>Hell, {userName || "User"}!</h2>
          {/* 로그아웃 */}
          <button onClick={() => setIsLogin(false)}>로그아웃</button>
        </>
      )}
    </div>
  );

  // ========================================================================= 예제 : e
  return example13;
}

export default App;
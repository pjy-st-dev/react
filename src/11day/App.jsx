
/**
 11일차: Context / useContext 완전 이해하기
 
    📌 1. Context가 왜 필요한가?
    React에서 props drilling 문제가 생길 때 해결하는 기능이 Context.
    ================================================================================================================
    ❌ props drilling 예시
    App → Layout → Sidebar → UserInfo → Avatar
    
    Avatar에 userName이 필요하면 상위 컴포넌트들이 전부 props로 전달해야 함.
    
    ✅ Context 사용 시
    
    전역 저장소에 user 정보를 넣어두고
    필요한 컴포넌트는 바로 꺼내서 사용 가능     
    ================================================================================================================
    
    📌 2. Context 기본 흐름
    ================================================================================================================
    1) Context 생성
    const UserContext = createContext();
    
    2) Provider로 감싸기
    Provider는 값을 공유할 “전역 저장소 관리자”
    <UserContext.Provider value={user}>
    <App />
    </UserContext.Provider>
    
    3) 하위 컴포넌트에서 가져오기      
    const user = useContext(UserContext);
    
    
    📌 3. 전체 예시      
    ================================================================================================================
    👉 user 정보를 전역에서 공유하는 예시
    🟦 1) UserContext.js
    import { createContext } from "react";
    
    export const UserContext = createContext(null);
    
    🟦 2) App.jsx (Provider로 감싸기)
    import { UserContext } from "./UserContext";
    
    function App() {
      const user = { name: "장용", age: 30 };
      
      return (
        <UserContext.Provider value={user}>
        <Home />
        </UserContext.Provider>
        );
        }
        
        export default App;
        
    🟦 3) Home.jsx — 어디서든 값 사용
    import { useContext } from "react";
    import { UserContext } from "./UserContext";
    
    function Home() {
      const user = useContext(UserContext);
      
      return (
        <div>
        <h1>안녕하세요, {user.name}님!</h1>
        </div>
        );
      }
    ================================================================================================================
    
    📌 4. Context 사용 시 주의할 점
    ================================================================================================================
    👍 좋은 점
    props drilling 해결
    공통 값을 손쉽게 전달 가능
    로그인 정보, 다크모드, 언어 설정 같은 “전역 상태”에 특히 유용
    
    👎 주의점
    너무 많이 쓰면 리렌더링이 많아짐 → 성능 저하
    Redux / Zustand / Jotai 같은 라이브러리로 가는 이유
    ================================================================================================================
    
    📌 5. 오늘 실습 미션
    ================================================================================================================
    ✔ 미션 1
    user 정보(name, level)를 Context로 공유하기
    
    ✔ 미션 2
    Todo 앱에서 todos를 Context로 공유해보기
    (이제 props 없이 어느 컴포넌트에서도 todos 사용 가능)      
    ================================================================================================================           
    */
           
import { useState, createContext, useEffect } from 'react';
import User from './User.jsx'; 
// 전역변수를 담는 저장소를 하나 만듬 
export const UserContext = createContext();

function App() {
  // name 초기값 홍길동 선언
  const [tmpName, setTmpName] = useState("");
  const [name, setName] = useState("홍길동");


  const nameChange = () => {
      setName(tmpName);
  }

  const example = (
    <>
      <input value={tmpName} onChange={(e) => setTmpName(e.target.value)}/><button onClick={nameChange}>변경</button>
      <br/>
      <br/>
      <UserContext.Provider value={name}>
        <User/>
      </UserContext.Provider>
    </>
  );

  return example;
}

export default App

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Todo from "./pages/Todo";


/**
 🌟 Day 9: React Router 기초 배우기
   > React Router v6 (현재 표준 버전)
  ✅ 오늘 목표
   1. React Router 설치
   2. BrowserRouter 설정
   3. Routes / Route 사용
   4. Link, NavLink 사용
   5. 페이지 컴포넌트 분리
   6. Layout 컴포넌트로 공통 UI 만들기
 */
function App() {

  /**
   1️⃣ React Router 설치
    ================================================================================================================ 
    프로젝트 폴더에서:
    npm install react-router-dom
    ================================================================================================================

    2️⃣ 페이지 기본 구조 만들기
    📁 페이지 폴더 생성
    ================================================================================================================
      src/9day/
          ├─ pages/
          │   ├─ Home.jsx
          │   ├─ About.jsx
          │   └─ Todo.jsx
          ├─ App.jsx
          └─ main.jsx
    ================================================================================================================

    3️⃣ 페이지 컴포넌트 만들기
    ================================================================================================================
    ✔ Home.jsx
      function Home() {
        return <h2>홈 페이지</h2>;
      }
      export default Home;
    
    ✔ About.jsx  
    function About() {
      return <h2>소개 페이지</h2>;
    }
    export default About;

    ✔ Todo.jsx (7일차에 만든 Todo를 붙일 예정)
    function Todo() {
      return <h2>Todo 페이지</h2>;
    }
    export default Todo;
    ================================================================================================================

    4️⃣ App.jsx 라우터 구성하기
      📌 중요 개념 3개
      <BrowserRouter> : 라우터 전체를 감싸는 컨테이너
      <Routes> : 모든 페이지 라우터 묶음
      <Route path="주소" element="컴포넌트" />
    ================================================================================================================
    ✔ App.jsx 완성 예시
    import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
    import Home from "./pages/Home";
    import About from "./pages/About";
    import Todo from "./pages/Todo";

    function App() {
      return (
        <BrowserRouter>
          <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <Link to="/">홈</Link>
            <Link to="/about">소개</Link>
            <Link to="/todo">Todo</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </BrowserRouter>
      );
    }

    export default App;

    ================================================================================================================

    5️⃣ Link vs a 태그 차이
    ================================================================================================================
    | a 태그               | Link                   |
    | ------------------- | ---------------------- |
    | 페이지 전체 새로고침   | 새로고침 없음            |
    | 서버 요청            | React 내부에서 이동      |
    | SPA 방식 깨짐        | SPA 유지                |
    React에서는 반드시 <Link> 사용해야 해!
    ================================================================================================================

    6️⃣ NavLink (현재 페이지 강조)
    ================================================================================================================
    <NavLink
      to="/todo"
      style={({ isActive }) => ({
        color: isActive ? "red" : "black"
      })}
    >
      Todo
    </NavLink>
    ================================================================================================================

    7️⃣ Layout 만들기 (Bonus)
     여러 페이지에서 공통으로 들어가는 UI(ex. 메뉴)는 Layout으로 감싸면 깔끔함.
    ================================================================================================================
    Layout.jsx
      import { Outlet, Link } from "react-router-dom";

      function Layout() {
        return (
          <div>
            <nav>
              <Link to="/">홈</Link> | 
              <Link to="/about">소개</Link> | 
              <Link to="/todo">Todo</Link>
            </nav>

            <hr />

            <Outlet />
          </div>
        );
      }

      export default Layout;

    App.jsx 수정
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="todo" element={<Todo />} />
      </Route>
    ================================================================================================================
    
   */
  
  // 정적인 라우팅을 설정할 경우 
  const example = (
    // 라우팅 시스템을 시작합니다! 
    <BrowserRouter>
      {/* Link 컴포넌트들이 라우팅 기능을 사용할 수 있게 됩니다. */}
      <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
        <Link to="/todo">Todo</Link>
      </nav>

      {/* Routes와 Route가 URL 변경에 따라 페이지를 보여줄 수 있게 됩니다. */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );

  // 
  const example2 = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="todo" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
  return example;
}

export default App;
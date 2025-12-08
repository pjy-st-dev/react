/**
  📘 React Day 13 — 미니 프로젝트 (API + Router + Context)
    ✔ Router 사용
    ✔ API(fetch) 호출
    ✔ Context로 전역 상태 관리
    ✔ 컴포넌트 구조화
    ✔ 페이지 이동 + 상세 페이지 구현 

  🎯 미니 프로젝트: 작은 “영화 정보 앱” 만들기
    📂 프로젝트 구조 예시
      src/
      ├─ components/
      │   ├─ MovieCard.jsx
      │   ├─ Header.jsx
      │
      ├─ pages/
      │   ├─ Home.jsx
      │   ├─ MovieDetail.jsx
      │
      ├─ context/
      │   ├─ MovieContext.jsx
      │
      ├─ App.jsx
      └─ main.jsx

    1️⃣ Router 설정
    ================================================================================================================
      // App.jsx
      import { BrowserRouter, Routes, Route } from "react-router-dom";
      import Home from "./pages/Home";
      import MovieDetail from "./pages/MovieDetail";

      export default function App() {
        return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
          </BrowserRouter>
        );
      }
    ================================================================================================================

    2️⃣ Context 전역 상태
    예: 영화 리스트를 전역에서 관리.
    ================================================================================================================
      // context/MovieContext.jsx
      import { createContext, useState, useEffect } from "react";

      export const MovieContext = createContext();

      export default function MovieProvider({ children }) {
        const [movies, setMovies] = useState([]);

        useEffect(() => {
          fetch("https://api.sampleapis.com/movies/action")
            .then(res => res.json())
            .then(data => setMovies(data));
        }, []);

        return (
          <MovieContext.Provider value={{ movies }}>
            {children}
          </MovieContext.Provider>
        );
      }

      ** main.jsx에서 Provider 감싸기: **

      import React from "react";
      import ReactDOM from "react-dom/client";
      import App from "./App";
      import MovieProvider from "./context/MovieContext";

      ReactDOM.createRoot(document.getElementById("root")).render(
        <MovieProvider>
          <App />
        </MovieProvider>
      );

    ================================================================================================================

    3️⃣ Home 페이지 (리스트 표시)
    ================================================================================================================
      // pages/Home.jsx
      import { useContext } from "react";
      import { MovieContext } from "../context/MovieContext";
      import MovieCard from "../components/MovieCard";

      export default function Home() {
        const { movies } = useContext(MovieContext);

        return (
          <div>
            <h1>Movie List</h1>
            <div style={{ display: "grid", gap: "16px" }}>
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        );
      }
    ================================================================================================================

    4️⃣ MovieCard (각 영화 컴포넌트)
    ================================================================================================================
      // components/MovieCard.jsx
      import { Link } from "react-router-dom";

      export default function MovieCard({ movie }) {
        return (
          <Link to={`/movie/${movie.id}`}>
            <div style={{ border: "1px solid gray", padding: 16 }}>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
            </div>
          </Link>
        );
      }
    ================================================================================================================

    5️⃣ 상세 페이지
    ================================================================================================================
      // pages/MovieDetail.jsx
      import { useParams } from "react-router-dom";
      import { useContext } from "react";
      import { MovieContext } from "../context/MovieContext";

      export default function MovieDetail() {
        const { id } = useParams();
        const { movies } = useContext(MovieContext);

        const movie = movies.find(m => String(m.id) === id);

        if (!movie) return <p>Loading...</p>;

        return (
          <div>
            <h1>{movie.title}</h1>
            <p>Year: {movie.year}</p>
            <p>{movie.plot}</p>
          </div>
        );
      }
    ================================================================================================================

    🎉 Day 13에서 얻는 핵심 개념
    ================================================================================================================
      | 개념               | 설명                                |
      | ---------------   | -----------------------             |
      | **Context**       | 여러 컴포넌트에서 공통 데이터를 쉽게 공유 |
      | **Router**        | 페이지 이동을 SPA 방식으로 구현         |
      | **fetch API**     | 서버에서 데이터 받아오기                |
      | **Detail Page**   | URL 파라미터를 이용해 개별 콘텐츠 표시    |
      | **컴포넌트 분리**   | 리스트/카드/페이지 구조화               |
    ================================================================================================================
  */

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

function App(){
  
  // 1️⃣ Router 설정
  const example = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );

  return example;

}

export default App

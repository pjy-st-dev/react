import { useState, useEffect } from "react";


/** 
  ✅ Day 10 목표
  1. fetch() 기본 사용법
  2. useEffect()에서 API 요청하기
  3. 로딩 상태(loading)
  4. 에러 상태(error)
  5. 데이터(state) 관리
  6. API 하나 만들어서 실제 보여주기

  1️⃣ 기본 fetch() 사용법 개념
  ================================================================================================================
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  ================================================================================================================

  2️⃣ React에서 fetch + useEffect 적용
  ================================================================================================================
    import { useState, useEffect } from "react";

    function PostList() {
      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then((res) => {
            if (!res.ok) throw new Error("서버 에러");
            return res.json();
          })
          .then((data) => {
            setPosts(data);
          })
          .catch((err) => {
            setError(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

      if (loading) return <h2>⏳ 로딩중...</h2>;
      if (error) return <h2>❌ 에러 발생: {error}</h2>;

      return (
        <div>
          <h1>📄 게시글 목록</h1>
          {posts.slice(0, 5).map((p) => (
            <div key={p.id}>
              <h3>{p.title}</h3>
            </div>
          ))}
        </div>
      );
    }

    export default PostList;
  
  ================================================================================================================

  3️⃣ 로딩/에러/데이터 3종 상태 패턴
  ================================================================================================================
  📌 loading = true → “로딩중”
  📌 error = null → 성공/실패 여부 판단
  📌 data = [] → 실제 보여줄 데이터
  ================================================================================================================

  4️⃣ Router와 연결하기 (Day 9 이어서)
  pages/PostList.jsx 만들어서 페이지로 붙이면 좋아.
  ================================================================================================================
    📁 src/pages/PostList.jsx
      import PostList from "../components/PostList";

      function PostsPage() {
        return <PostList />;
      }

      export default PostsPage;
   
    App 라우터에 추가
      <Route path="posts" element={<PostsPage />} />
    그리고 메뉴에 추가:
      <Link to="/posts">Posts</Link>
  ================================================================================================================

  5️⃣ fetch를 async/await로 사용하는 버전 (더 깔끔한 방식)
  ================================================================================================================
    useEffect(() => {
      async function load() {
        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/posts");
          if (!res.ok) throw new Error("서버 오류");
          const data = await res.json();
          setPosts(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      load();
    }, []);

  ================================================================================================================

  6️⃣ 오늘 정리
    📌 오늘 배운 핵심 5개

    개념	          설명
    fetch	          외부 데이터 불러오기
    useEffect	      컴포넌트 실행 후 API 요청
    로딩 상태	       “로딩중…” 처리하는 UI
    에러 상태	       서버 에러, 네트워크 에러 처리
    데이터 렌더링	    성공 시 화면에 출력
 */

function App() {
  const [data, setData] = useState(null);     // 받아온 데이터 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null);     // 에러 상태

  useEffect(() => {
    async function load(){
      try{
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/9");
        if(!res.ok){
          throw new Error("서버 오류");
        }
        const data = await res.json();
        setData(data);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }
    load();
  },[]);

  if(loading) return <h2>⏳ 로딩중...</h2>;
  if(error) return <h2>❌ 에러 발생: {error}</h2>;


  const example = (
    <div>
      <h2>📌 데이터 가져오기 성공!</h2>
      <p><b>ID:</b> {data.id}</p>
      <p><b>Title:</b> {data.title}</p>
      <p><b>Body:</b> {data.body}</p>
    </div>
  );

  return example;
}

export default App;
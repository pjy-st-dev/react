import { useState } from "react";
import User1 from "./User1.jsx";
import User2 from "./User2.jsx";
import User3 from "./User3.jsx";

function App() {
  // 컴포넌트 재사용
  const users2 = [
    {name:'홍길동', age:24},
    {name:'이순신', age:28},
    {name:'김유신', age:30}
  ];

  const example2 = (
    <div>
      <User1/>
      <User1/>
      {
        users2.map(user => (
          <User2 name={user.name} age={user.age}/>
        ))
      }
    </div>
  );
  
  /**
   * 예제 (사용자 리스트, 삭제)
   */
  // 사용자 리스트 & 삭제 기능 
  const [users3, setUsers3]  = useState([
    {name:'홍길동', age:24},
    {name:'이순신', age:28},
    {name:'김유신', age:30}
  ]);

  // 삭제함수
  const deleteUser = (nameToDelete) => {
    setUsers3(users3.filter((user) => user.name !== nameToDelete));
  }

  // jsx
  const example3 = (
    <div>
      {users3.map((user)=>(
        <User3 key={user.name} name={user.name} age={user.age} onDelete={()=>deleteUser(user.name)}/>
      ))}
    </div>
  );

  /**
   * 예제 (사용자 리스트, 추가, 삭제)
   */
  // 사용자 리스트 추가 & 삭제 기능
  const [users4, setUsers4] = useState([
    { name: "홍길동", age: 24 },
    { name: "이순신", age: 28 },
    { name: "김유신", age: 30 },
  ]);

  // 입력창 상태 
  const [name4, setName4] = useState("");
  const [age4, setAge4] = useState("");

  // 사용자 추가 함수 
  const addUser = () => {
    if(!name4 || !age4) return;
    setUsers4([...users4, {name:name4, age:Number(age4)}]);
    setName4("");
    setAge4("");
  }

  // 사용자 삭제 함수
  const deleteUser4 = (nameToDelete) => {
    setUsers4(users4.filter((user) => user.name !== nameToDelete));
  }

  const example4 = (
    <div style={{ padding: "20px" }}>
        <h1>사용자 관리 앱</h1>
        {/* 입력 창 */}
        <input placeholder="이름" value={name4} onChange={(e) => setName4(e.target.value)} />
        <input placeholder="나이" type="number" value={age4} onChange={(e) => setAge4(e.target.value)} />
        <button onClick={addUser}>추가</button>
        {/* 사용자 리스트 */}
        <div>
          {users4.map((user) => (
             <User3
              key={user.name}
              name={user.name}
              age={user.age}
              onDelete={() => deleteUser4(user.name)}
            />
          ))}
        </div>
    </div>
  );

  return example4;
}

export default App;
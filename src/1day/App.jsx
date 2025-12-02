import { useState } from 'react';
import User from './User';

function App() {
  // 1️⃣ 상태 선언
  /*
    names -> 변수 선언 변수가 변경되면 리랜더링 함 
    setNames -> names 값을 변경하는 함수 
    useState -> 초기값 ['Tom', 'Jane', 'Mike'] 배열 세팅
  */
  const [names, setNames] = useState(['Tom', 'Jane', 'Mike']);

  // 2️⃣ 함수 선언
  /*
    deleteName 함수 정의 -> names 배열 중 nameToDelete변수 값이 있다고 하면 삭제 후 names 배열을 다시 만들어 세팅
   */
  function deleteName(nameToDelete) {
    setNames(names.filter(name => name !== nameToDelete));
  }

  // 3️⃣ JSX 렌더링
  return (
    <div>
      {names.map(name => (
        <div key={name}>
          <User name={name} />
          <button onClick={() => deleteName(name)}>삭제</button>
        </div>
      ))}
    </div>
  );
}

export default App;
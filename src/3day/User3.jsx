
function User3({name, age, onDelete}){
    return (
        <div style={{border: "1px solid gray", padding: "10px", margin: "5px"}}>
            이름 : {name}, 나이 : {age}세, <button onClick={onDelete}>삭제</button>
        </div>
    );
}

export default User3;
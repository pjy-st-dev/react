
function TodoList({todos, toggleTodo, removeTodo}){
    return (
    <ul style={{ marginTop: 20, paddingLeft: 0 }}>
        {todos.map((todo) => (
            <li key={todo.id} style={{listStyle: "none", marginBottom: 8, display: "flex", alignItems: "center"}}>
                <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)}/>
                <span style={{ marginLeft: 10, textDecoration: todo.done ? "line-through" : "none",flex: 1}}>{todo.text}</span>
                <button onClick={() => removeTodo(todo.id)}>삭제</button>
            </li>
        ))}
    </ul>
    );
}
export default TodoList;
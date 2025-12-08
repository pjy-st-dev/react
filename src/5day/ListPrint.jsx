function ListPrint({todos}){
    return (
        <>
            <h3>리스트</h3>
            <ul>
                {
                    todos.map((todo) => (
                        <li key={todo.value}>{todo.value}</li>
                    ))
                }
            </ul>
        </>
    )
}
export default ListPrint;
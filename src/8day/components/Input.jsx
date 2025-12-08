import styles from "./Input.module.css";

function Input({ addTodo }) {
  const [text, setText] = useState("");

  return (
    <div className={styles.inputWrap}>
      <input
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.button} onClick={() => addTodo(text)}>
        추가
      </button>
    </div>
  );
}

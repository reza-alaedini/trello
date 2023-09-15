function RadioButton({
  children,
  value,
  title,
  status,
  setStatus,
  useFor,
  selectedTodo,
}) {
  return (
    <div className={value}>
      <label htmlFor={value}>
        {children}
        {title}
      </label>
      <input
        id={value}
        type="radio"
        value={value}
        checked={status === value}
        onChange={
          useFor === "add"
            ? (e) => setStatus(e.target.value)
            : (e) => setStatus({ ...selectedTodo, status: e.target.value })
        }
      />
    </div>
  );
}

export default RadioButton;

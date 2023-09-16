import { useEffect, useState } from "react";
import Tasks from "../module/Tasks";

function HomePage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    if (data.status === "success") setTodos(data.todos);
  };

  return (
    <>
      <div className="home-page">
        <div className="home-page--todo">
          <p>Todo</p>
          <Tasks data={todos.todo} next="inProgress" fetchTodos={fetchTodos} />
        </div>
        <div className="home-page--inProgress">
          <p>In Progress</p>
          <Tasks
            data={todos.inProgress}
            next="review"
            back="todo"
            fetchTodos={fetchTodos}
          />
        </div>
        <div className="home-page--review">
          <p>Review</p>
          <Tasks
            data={todos.review}
            next="done"
            back="inProgress"
            fetchTodos={fetchTodos}
          />
        </div>
        <div className="home-page--done">
          <p>Done</p>
          <Tasks data={todos.done} back="review" fetchTodos={fetchTodos} />
        </div>
      </div>
    </>
  );
}

export default HomePage;

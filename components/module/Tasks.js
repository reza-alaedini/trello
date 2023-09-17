import { RiMastodonLine } from "react-icons/ri";
import { BiLeftArrow, BiRightArrow, BiEdit } from "react-icons/bi";
import { useRouter } from "next/router";

function Tasks({ data, next, back, fetchTodos }) {
  const router = useRouter();

  const changeStatus = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") fetchTodos();
  };
  return (
    <div className="tasks">
      {data?.map((i) => (
        <div key={i._id} className="tasks__card">
          <span className={i.status}></span>
          <div className="myIcons" title="Edit Todo">
            <RiMastodonLine />
            <BiEdit
              className="myIcons__edit"
              onClick={() => router.push(`/todos/${i._id}`)}
            />
          </div>
          <h4>{i.title}</h4>
          {i.description && <p className="myDesc">{i.description}</p>}
          <div>
            {back ? (
              <button
                className="button-back"
                onClick={() => changeStatus(i._id, back)}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : null}
            {next ? (
              <button
                className="button-next"
                onClick={() => changeStatus(i._id, next)}
              >
                Next <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RadioButton from "@/components/module/RadioButton";
import { toast } from "react-toastify";

// icons
import { TbEditCircle } from "react-icons/tb";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";

function EditTodoPage() {
  const [selectedTodo, setSelectedTodo] = useState({
    title: "",
    description: "",
    status: "",
  });

  const router = useRouter();
  const { todoId } = router.query;

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    const res = await fetch(`/api/todos/${todoId}`);
    const data = await res.json();
    // console.log(data);
    if (data.status === "success") setSelectedTodo(data.todo);
  };

  const saveHandler = async () => {
    const id = toast.loading("Please Wait ... ⌛");
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify(selectedTodo),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);
    if (data.status === "success") {
      fetchTodo();
      toast.update(id, {
        render: "Todo Updated Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const deleteHandler = async () => {
    const result = window.confirm("Are You Sure?");

    if (result) {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
        body: JSON.stringify({ id: todoId }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      // console.log(data);
      if (data.status === "success") {
        toast.success(data.message, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        router.replace("/");
      }
    } else {
      return;
    }
  };

  return (
    <div className="add-form">
      <h2>
        <TbEditCircle />
        Edit Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={selectedTodo.title}
            onChange={(e) =>
              setSelectedTodo({ ...selectedTodo, title: e.target.value })
            }
          />
          <div className="add-form__textBox">
            <label htmlFor="desc">Description:</label>
            <textarea
              id="desc"
              value={selectedTodo.description}
              onChange={(e) =>
                setSelectedTodo({
                  ...selectedTodo,
                  description: e.target.value,
                })
              }
              rows="4"
              cols="50"
            />
          </div>
        </div>
        <div className="add-form__input--second">
          <RadioButton
            value="todo"
            title="Todo"
            useFor="edit"
            selectedTodo={selectedTodo}
            status={selectedTodo.status}
            setStatus={setSelectedTodo}
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            value="inProgress"
            title="In Progress"
            useFor="edit"
            selectedTodo={selectedTodo}
            status={selectedTodo.status}
            setStatus={setSelectedTodo}
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            value="review"
            title="Review"
            useFor="edit"
            selectedTodo={selectedTodo}
            status={selectedTodo.status}
            setStatus={setSelectedTodo}
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            value="done"
            title="Done"
            useFor="edit"
            selectedTodo={selectedTodo}
            status={selectedTodo.status}
            setStatus={setSelectedTodo}
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <div className="edit-form__buttons">
          <button className="save" onClick={saveHandler}>
            Save
          </button>
          <button className="delete" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTodoPage;

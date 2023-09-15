import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB!" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  if (req.method === "GET") {
    const { todoId } = req.query;

    const todo = await User.findOne({ "todos._id": todoId });
    if (!todo) {
      return res
        .status(404)
        .json({ status: "failed", message: "Todo not found!" });
    }

    const [selectedTodo] = todo.todos.filter((i) => String(i._id) === todoId);

    res.status(200).json({ status: "success", todo: selectedTodo });
  } else if (req.method === "PATCH") {
    const { title, description, status } = req.body;
    const { todoId } = req.query;

    if (!title || !status) {
      return res
        .status(500)
        .json({ status: "failed", message: "Invalid data!" });
    }

    const result = await User.updateOne(
      { "todos._id": todoId },
      {
        $set: {
          "todos.$.title": title,
          "todos.$.description": description,
          "todos.$.status": status,
        },
      }
    );
    console.log(result);
    res
      .status(200)
      .json({ status: "success", message: "Todo updated successfully!" });
  } else if (req.method === "DELETE") {
    
  }
}

export default handler;

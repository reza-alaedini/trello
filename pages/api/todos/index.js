import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { sortTodos } from "@/utils/sortTodos";
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
      .json({ status: "failed", message: "Yoy are not logged in!" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  if (req.method === "POST") {
    const { title, status, description } = req.body;
    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }

    user.todos.push({ title, status, description: description || "" });
    user.save();

    res.status(201).json({ status: "success", message: "Todo created!" });
  } else if (req.method === "GET") {
    const sortedTodos = sortTodos(user.todos);

    res.status(200).json({ status: "success", todos: sortedTodos });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;
    if (!id || !status) {
      return res
        .status(500)
        .json({ status: "failed", message: "Invalid data!" });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );

    console.log(result);
    res.status(200).json({ status: "success" });
  }
}

export default handler;

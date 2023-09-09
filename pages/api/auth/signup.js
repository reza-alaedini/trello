import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

async function handler(req, res) {
  if (req.method !== "POST") return;

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid data!" });
  }

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB!" });
  }

  const isExist = await User.findOne({ email: email });
  if (isExist) {
    return res
      .status(422)
      .json({ status: "failed", message: "User already exists!" });
  }

  const hashPass = await hashPassword(password);

  const user = await User.create({ email, password: hashPass });
  console.log(user);

  res.status(201).json({ status: "success", message: "User created!" });
}

export default handler;

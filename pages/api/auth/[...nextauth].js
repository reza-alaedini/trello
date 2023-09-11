import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";

export default NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Invalid data!");
        }

        try {
          await connectDB();
        } catch (err) {
          console.log(err);
          throw new Error("Error in connecting to DB!");
        }

        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("User doen't exist!");
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("Email or Password is incorrect!");
        }

        return { email };
      },
    }),
  ],
});

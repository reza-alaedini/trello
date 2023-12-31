import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // client-side page protection
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  const loginHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res.error) {
      toast.success("Welcome!", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      router.push("/");
    } else {
      toast.error(res.error, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };
  return (
    <div className="signin-form">
      <h3>Login Form</h3>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginHandler}>Login</button>
      <div>
        <p>Create an Account?</p>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default SigninPage;

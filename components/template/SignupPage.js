import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // client-side page protection
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  const signUpHandler = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      toast.success("User Added!", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      router.push("/signin");
    } else if (data.status === "failed") {
      toast.error(data.message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className="signin-form">
      <h3>Registration Form</h3>
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
      <button onClick={signUpHandler}>Register</button>
      <div>
        <p>Have an Account?</p>
        <Link href="/signin">Signin</Link>
      </div>
    </div>
  );
}

export default SignupPage;

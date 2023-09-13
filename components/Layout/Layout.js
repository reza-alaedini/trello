import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// icons
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";

function Layout({ children }) {
  const { status } = useSession();

  const logOutHandler = () => {
    signOut();
  };
  return (
    <div className="container">
      <header>
        Trello App
        {status === "authenticated" ? (
          <button onClick={logOutHandler}>
            Logout <FiLogOut />
          </button>
        ) : null}
      </header>

      <div className="container--main">
        <aside>
          <p>Welcome 👋</p>
          <ul>
            <li>
              <VscListSelection />
              <Link href="/">Todos</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href="/add-todo">Add Todo</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Layout;

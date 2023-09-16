import EditTodoPage from "@/components/template/EditTodoPage";
import { getSession } from "next-auth/react";

function TodoId() {
  return (
    <>
      <EditTodoPage />
    </>
  );
}

export default TodoId;

// server-side protection
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

import EditProfilePage from "@/components/template/EditProfilePage";
import { getSession } from "next-auth/react";

function EditProfile() {
  return <EditProfilePage />;
}

export default EditProfile;

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

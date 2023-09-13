import ProfilePage from "@/components/template/ProfilePage";
import { getSession } from "next-auth/react";

function Profile() {
  return <ProfilePage />;
}

export default Profile;

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

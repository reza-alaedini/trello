import { useEffect } from "react";

function EditProfilePage() {
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    console.log(data);
  };
  return <div>EditProfilePage</div>;
}

export default EditProfilePage;

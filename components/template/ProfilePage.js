import { useEffect, useState } from "react";
import ProfileForm from "../module/ProfileForm";
import { toast } from "react-toastify";
import Link from "next/link";

// icons
import { CgProfile } from "react-icons/cg";
import ProfileData from "../module/ProfileData";

function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    // console.log(data);
    if (
      data.status === "success" &&
      data.data.name &&
      data.data.lastName &&
      data.data.email
    ) {
      setData(data.data);
    }
  };

  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      toast.success("User information updated!", {
        autoClose: 5000,
        closeOnClick: true,
      });
      fetchProfile();
    } else {
      toast.error(data.message, {
        autoClose: 5000,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {data ? (
        <ProfileData data={data} />
      ) : (
        <ProfileForm
          name={name}
          lastName={lastName}
          password={password}
          setName={setName}
          setLastName={setLastName}
          setPassword={setPassword}
          submitHandler={submitHandler}
          useFor="add"
        />
      )}
      <button>
        <Link href="/edit-profile">Edit</Link>
      </button>
    </div>
  );
}

export default ProfilePage;

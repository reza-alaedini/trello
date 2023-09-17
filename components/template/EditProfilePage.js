import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ProfileForm from "../module/ProfileForm";

// icon
import { LiaUserEditSolid } from "react-icons/lia";

function EditProfilePage() {
  const [info, setInfo] = useState({
    name: "",
    lastName: "",
  });
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    // console.log(data);
    if (data.status === "success") setInfo(data.data);
  };

  const submitHandler = async () => {
    const id = toast.loading("Please Wait ... ⌛");
    const res = await fetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify({
        name: info?.name,
        lastName: info?.lastName,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);
    if (data.status === "success") {
      toast.update(id, {
        render: data.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      router.push("/profile");
    } else {
      toast.update(id, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className="profile-form">
      <h2>
        <LiaUserEditSolid />
        Edit Profile
      </h2>
      <ProfileForm
        useFor="edit"
        name={info?.name}
        lastName={info?.lastName}
        password={password}
        setInfo={setInfo}
        setPassword={setPassword}
        info={info}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default EditProfilePage;

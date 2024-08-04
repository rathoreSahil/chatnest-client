"use client";

import { useAuth } from "@/context/auth-provider";
import InputBox from "@/components/sidebar/input-box";
import PhotoActions from "@/components/sidebar/photo-actions";

const Profile = () => {
  const authUser = useAuth().authUser!;

  return (
    <div className="flex-1 p-10 space-y-8">
      <PhotoActions photoSrc={authUser.photo || "/default.webp"} />

      <InputBox id="name" label="Name" value={authUser.name} readOnly />
      <InputBox
        id="description"
        label="Description"
        value={authUser.description}
        readOnly
      />
    </div>
  );
};

export default Profile;

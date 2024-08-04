"use client";

import { useAuth } from "@/context/auth-provider";
import InputBox from "@/components/sidebar/misc/input-box";
import PhotoActions from "@/components/sidebar/misc/photo-actions";

const Profile = () => {
  const authUser = useAuth().authUser!;

  return (
    <div className="flex flex-col flex-1 gap-6 p-10">
      <PhotoActions photoSrc={authUser.photo} />

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

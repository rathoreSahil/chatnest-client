"use client";

import { useAuth } from "@/context/auth-provider";
import Image from "next/image";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      Profile
      {/* <Image
        src={`/${user?.photo || ""}`}
        alt="profile"
        height={500}
        width={500}
        className="rounded-full"
      /> */}
    </div>
  );
};

export default Profile;

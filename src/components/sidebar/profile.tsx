"use client";

import { UploadButton } from "@/lib/uploadthing";
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
      {/* <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
    </div>
  );
};

export default Profile;

"use client";

import { useAuth } from "@/context/auth-provider";
import ProfilePhoto from "@/components/profile/profile-photo";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Profile = () => {
  const { user } = useAuth();
  console.log("profile:", user?.photo);

  return (
    <div className="p-10 space-y-8">
      <ProfilePhoto src={user?.photo} className="h-48 w-48 mx-auto mb-16" />
      <div>
        <Label className="pl-3 pb-3 text-green-400" htmlFor="name">
          Name
        </Label>
        <Input
          className="border-0 text-md focus-visible:border-b focus-visible:border-white"
          id="name"
          value={user?.name}
        />
      </div>
      <div>
        <Label className="pl-3 pb-3 text-green-400" htmlFor="description">
          Description
        </Label>
        <Input
          className="border-0 text-md focus-visible:border-b focus-visible:border-white"
          id="description"
          value={user?.description}
        />
      </div>
    </div>
  );
};

export default Profile;

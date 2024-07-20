"use client";

import { useAuth } from "@/context/auth-provider";
import ProfilePhoto from "@/components/profile/profile-photo";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Camera } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { Fetch } from "@/lib/fetch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Profile = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Fetch.DELETE("/users/photo");

      const formData = new FormData();
      formData.append("photo", file);

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const profilePhoto = await fetch(`${API_URL}/users/photo`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });
    }
  };

  const dropdownItemClass = "hover:bg-slate-900";

  return (
    <div className="p-10 space-y-8">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e)}
      />
      <DropdownMenu>
        <div className="group h-48 w-48 relative rouded-full overflow-hidden mx-auto">
          <DropdownMenuTrigger className=" focus:outline-none">
            <ProfilePhoto
              src={user?.photo}
              className="h-48 w-48 group-hover:opacity-40"
            />
          </DropdownMenuTrigger>
          <Camera className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block" />
        </div>

        <DropdownMenuContent className="bg-slate-800 border-0 absolute top-0 left-0">
          <DropdownMenuItem className={dropdownItemClass}>
            View Photo
          </DropdownMenuItem>
          <DropdownMenuItem
            className={dropdownItemClass}
            onClick={openFileInput}
          >
            Upload Photo
          </DropdownMenuItem>
          <DropdownMenuItem className={dropdownItemClass}>
            Take Photo
          </DropdownMenuItem>
          <DropdownMenuItem
            className={dropdownItemClass}
            onClick={() => {
              Fetch.DELETE("/users/photo");
            }}
          >
            Remove Photo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div>
        <Label className="pl-3 pb-3 text-green-400" htmlFor="name">
          Name
        </Label>
        <Input
          className="border-0 text-md focus-visible:border-b focus-visible:border-white"
          id="name"
          value={user?.name}
          readOnly
        />
      </div>
      <div>
        <Label className="pl-3 pb-3 text-green-400" htmlFor="description">
          Description
        </Label>
        <Input
          className="border-0 text-md text-wrap break-words focus-visible:border-b focus-visible:border-white"
          id="description"
          value={user?.description}
          readOnly
        />
      </div>
    </div>
  );
};

export default Profile;

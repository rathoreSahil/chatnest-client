"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

const ProfilePhoto = ({
  src,
  className,
}: {
  src: string | undefined;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden h-12 w-12 cursor-pointer",
        className
      )}
    >
      <Image
        src={src || "/default.webp"}
        alt="profile photo"
        width={400}
        height={400}
      />
    </div>
  );
};

export default ProfilePhoto;

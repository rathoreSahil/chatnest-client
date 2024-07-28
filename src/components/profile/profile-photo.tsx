"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

const ProfilePhoto = ({
  src,
  className,
  onClick,
}: {
  src: string | undefined;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-full overflow-hidden h-12 flex-shrink-0 w-12 cursor-pointer ",
        className
      )}
    >
      <Image
        src={src || "/default.webp"}
        alt="profile photo"
        width={500}
        height={500}
      />
    </div>
  );
};

export default ProfilePhoto;

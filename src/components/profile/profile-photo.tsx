"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";

type ProfilePhotoProps = {
  src: string | undefined;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  hoverOverlay?: boolean;
};

const ProfilePhoto = ({
  src = "/default.webp",
  className = "h-12 w-12",
  onClick,
  loading,
  hoverOverlay,
}: ProfilePhotoProps) => {
  const hoverClass = hoverOverlay ? "group-hover:opacity-60" : "";
  return (
    <div
      className={cn("group relative rounded-full overflow-hidden", className)}
    >
      <div
        onClick={onClick}
        className={cn(
          "cursor-pointer rounded-full overflow-hidden",
          hoverClass,
          className
        )}
      >
        <Image src={src} alt="profile photo" width={500} height={500} />
      </div>
      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;

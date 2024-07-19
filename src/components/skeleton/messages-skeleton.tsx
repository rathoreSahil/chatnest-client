import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const MessageSkeleton = ({ length }: { length: number }) => {
  return (
    <>
      {Array.from({ length }).map((_, idx) => {
        const align = Math.round(Math.random());
        const width = ["w-150px", "w-200px", "w-250px", "w-300px", "w-350px"];
        const randomWidth = width[Math.floor(Math.random() * width.length)];
        return (
          <div
            key={idx}
            className={cn("my-3 flex", align ? "justify-end" : "justify-start")}
          >
            <Skeleton className={`${randomWidth} h-8`} />
          </div>
        );
      })}
    </>
  );
};

export default MessageSkeleton;

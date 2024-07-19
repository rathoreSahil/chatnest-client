import { Skeleton } from "@/components/ui/skeleton";

const ChatListSkeleton = ({ length }: { length: number }) => {
  return (
    <>
      {Array.from({ length }).map((_, idx) => {
        return (
          <div key={idx} className="p-4 flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChatListSkeleton;

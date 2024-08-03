import { colors } from "@/constants";
import { useAuth } from "@/context/auth-provider";
import { cn } from "@/lib/utils";
import { MessageContainerProps } from "@/types";

const MessageContainer = ({ message }: MessageContainerProps) => {
  const authUser = useAuth().authUser!;
  const isMyMessage = message.sender._id === authUser!._id;
  const randomColor = colors[Math.round(Math.random() * colors.length)];
  const messageCreatedAt = new Date(message.createdAt);

  return (
    <div
      className={cn("my-3 flex", isMyMessage ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[60%] text-wrap break-words rounded-lg px-3 py-2",
          isMyMessage ? "bg-purple-300" : "bg-gray-400"
        )}
      >
        {message.groupChat && !isMyMessage && (
          <div className={`text-sm ${randomColor}`}>{message.sender.name}</div>
        )}
        <div className="flex gap-3">
          <p className="flex-1 text-wrap break-words self-center">
            {message.content}
          </p>
          <div className="text-[12px] opacity-70 text-right w-min self-end">
            {messageCreatedAt.getHours().toString().padStart(2, "0")}:
            {messageCreatedAt.getMinutes().toString().padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;

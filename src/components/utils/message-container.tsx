import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-provider";

type MessageContainerProps = {
  message: Message;
};

const MessageContainer = ({ message }: MessageContainerProps) => {
  const authUser = useAuth().authUser!;
  const isMyMessage = message.sender._id === authUser!._id;
  const messageCreatedAt = new Date(message.createdAt);

  return (
    <div
      className={cn("my-3 flex", isMyMessage ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[60%] rounded-lg px-3 py-2 ",
          isMyMessage
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {message.groupChat && !isMyMessage && (
          <p className="text-sm text-muted-foreground">{message.sender.name}</p>
        )}
        <div className="flex gap-3">
          <p className="flex-1 text-wrap break-words self-center">
            {message.content}
          </p>
          <div className="text-[12px] text-muted-foreground text-right w-min self-end">
            {messageCreatedAt.getHours().toString().padStart(2, "0")}:
            {messageCreatedAt.getMinutes().toString().padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;

"use client";

import { useChatStore } from "@/states/chatStates";
import { useEffect, useRef, useState } from "react";
import { useMessage } from "@/context/message-provider";
import { useFetchMessages } from "@/hooks/useFetchMessages";

import toast from "react-hot-toast";
import MessageContainer from "@/components/utils/message-container";
import MessageSkeleton from "@/components/skeleton/messages-skeleton";

const ChatContent = () => {
  const message = useMessage();
  const currentChat = useChatStore().currentChat!;
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, fetchMessagesByChatId] = useFetchMessages();

  // update messages
  useEffect(() => {
    if (!message) return;
    if ((message.groupChat || message.directChat) !== currentChat._id) return;
    setMessages((prevMessages) => [...prevMessages, message]);
  }, [currentChat._id, message]);

  // fetch messages by chat id
  useEffect(() => {
    fetchMessagesByChatId(currentChat._id)
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        toast.error("Error fetching messages", error.message);
      });

    return () => {
      setMessages([]);
    };
  }, [currentChat, fetchMessagesByChatId]);

  useEffect(() => {
    const element = chatWindowRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [messages]);

  return (
    <div ref={chatWindowRef} className="px-10 py-2 flex-1 overflow-y-scroll">
      {loading ? (
        <MessageSkeleton length={14} />
      ) : (
        messages.map((message, idx) => {
          const currMsgDate = new Date(message.createdAt).toLocaleDateString(
            undefined,
            { year: "numeric", month: "long", day: "numeric" }
          );
          const prevMsgDate =
            idx > 0
              ? new Date(messages[idx - 1].createdAt).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )
              : "";
          const showDate = currMsgDate !== prevMsgDate;
          return (
            <>
              {showDate && (
                <div className="w-max bg-muted text-muted-foreground text-sm text-center mx-auto rounded-xl my-6 p-2">
                  {currMsgDate}
                </div>
              )}
              <MessageContainer key={idx} message={message} />
            </>
          );
        })
      )}
    </div>
  );
};

export default ChatContent;

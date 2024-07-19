export {};
declare global {
  type User = {
    _id: string;
    name: string;
    email: string;
    description?: string;
    photo: string;
    role: "user" | "admin";
    createdAt: Date;
  };

  type Chat = {
    _id: string;
    name: string;
    description?: string;
    photo: string;
    isGroupChat: boolean;
    participantCount: number;
    createdAt: Date;
  };

  type Message = {
    chat: string;
    sender: string | { _id: string; name: string };
    content: string;
    createdAt: Date;
  };
}

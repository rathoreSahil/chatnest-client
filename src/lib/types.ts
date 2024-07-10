type User = {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role: "user" | "admin";
};

type Chat = {
  _id: string;
  name: string;
  description?: string;
  photo?: string;
};

type Message = {
  chat: string;
  sender: string;
  content: string;
  createdAt: Date;
};

export type { User, Chat, Message };

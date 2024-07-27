export {};
declare global {
  interface User {
    _id: string;
    name: string;
    email: string;
    description?: string;
    photo?: string;
    photoPublicId?: string;
    createdAt: Date;
  }

  interface Participant {
    _id: string;
    user: User;
    group: GroupChat;
    isAdmin: boolean;
    createdAt: Date;
  }

  interface GroupChat {
    _id: string;
    name: string;
    description?: string;
    photo?: string;
    photoPublicId?: string;
    participantCount: number;
    createdAt: Date;
  }

  interface DirectChat {
    _id: string;
    user1: User;
    user2: User;
    createdAt: Date;
  }

  interface Message {
    groupChat?: string;
    directChat?: string;
    sender: User;
    content: string;
    createdAt: Date;
  }
}

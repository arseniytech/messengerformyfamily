import { create } from 'zustand';



export type Message = {
    text: string;
    sent: boolean;
    timestamp?: string;
    senderId?: number;
};

export type User = {
  id?: number;          // <— добавили
  userName: string;
  userMessage: string;
  userAvatar?: string;
  userOnline: boolean;
  messageTime?: string;
  lastMessage?: string;
};

type MessageStore = {
  contacts: User[];
  activeUser: User | null;
  messages: Record<string, Message[]>;
  setContacts: (contacts: User[]) => void;
  setActiveUser: (user: User) => void;
  addMessage: (
    userName: string,
    text: string,
    sent?: boolean,
    timestamp?: string,
    senderId?: number,
  ) => void;
  setMessagesForUser: (userName: string, msgs: Message[]) => void;
};

export const useMessageStore = create<MessageStore>((set, get) => ({
  contacts: [],
  activeUser: null,
  messages: {},

  setContacts: (contacts) => set({ contacts }),

  setActiveUser: (user) => {
    set({ activeUser: user });
  },

  addMessage: (userName, text, sent = true, timestamp, senderId) => {
    const { messages } = get();
    const userMessages = messages[userName] || [];
    const updatedMessages = {
      ...messages,
      [userName]: [
        ...userMessages,
        { text, sent, timestamp: timestamp || new Date().toISOString(), senderId },
      ],
    };
    set({ messages: updatedMessages });
  },

  setMessagesForUser: (userName, msgs) => {
    const { messages } = get();
    const updated = { ...messages, [userName]: msgs };
    set({ messages: updated });
  },
}));
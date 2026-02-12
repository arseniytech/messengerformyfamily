import { useEffect } from 'react';
import { useMessageStore, type User } from '../store/messageStore';
import { useAuthStore } from '../store/authStore';

const ChatItem = ({
  id,
  userName,
  userAvatar,
  userOnline,
  messageTime,
  userMessage,
}: User) => {
  const setActiveUser = useMessageStore((s) => s.setActiveUser);

  return (
    <div
      className="chatList"
      onClick={() =>
        setActiveUser({
          id,
          userName,
          userAvatar,
          userOnline,
          messageTime,
          userMessage,
        })
      }
    >
      <div className="chatItem">
        <img src={userAvatar} className="avatar" />
        <div className="userInfo">
          <div className="chatTop">
            <span className="userName">{userName}</span>
            <span className="chatTime">{messageTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatList = () => {
  const contacts = useMessageStore((s) => s.contacts);
  const setContacts = useMessageStore((s) => s.setContacts);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    const loadContacts = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://localhost:4000/contacts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error('Failed to load contacts', await response.text());
          return;
        }
        const data = await response.json();

        const users: User[] = data.map((row: any) => ({
          id: row.id,
          userName: row.display_name || row.username,
          userMessage: '',
          userAvatar: row.avatar_url,
          userOnline: row.is_online,
          messageTime: '',
          lastMessage: '',
        }));

        setContacts(users);
      } catch (error) {
        console.error('Failed to load contacts', error);
      }
    };

    loadContacts();
  }, [setContacts, token]);

  return (
    <div className="chatContainer">
      {contacts.map((c) => (
        <ChatItem key={c.userName} {...c} />
      ))}
    </div>
  );
};

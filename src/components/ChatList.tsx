import { useMessageStore, type User } from '../store/messageStore';

const ChatItem = ({userName, userAvatar, userOnline, messageTime, userMessage }: User ) => {
  const setActiveUser = useMessageStore((s) => s.setActiveUser);

  return (
    <div className="chatList" 
         onClick = {() => setActiveUser({ userName, userAvatar, userOnline, messageTime, userMessage })}>
      <div className="chatItem">
        <img src = {userAvatar} className='avatar'/>
        <div className="userInfo">
          <div className="chatTop">
            <span className="userName">{userName}</span>
            <span className="chatTime">{messageTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ChatList = () => {
  const contacts = useMessageStore(s => s.contacts);

  return (
    <div className="chatContainer">
      {contacts.map((c) => (<ChatItem key={c.userName} {...c}/>))}
    </div>
  );
}



import { useMessageStore } from '../store/messageStore';
import Message from './Message';
import { useChat } from '../hooks/useChat';
import { useRef, useEffect, useCallback } from 'react';
import styles from './ChatWindow.module.css';

export const ChatWindow = () => {
  const { activeUser, sendMessage } = useChat();
  const messages = useMessageStore(s => s.messages);
  
  const messagesToBottom = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesToBottom.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const target = e.currentTarget;
      const value = target.value;
      sendMessage(value);
      target.value = '';
    }
  }, 
  [sendMessage]);


  useEffect(()=>{
    scrollToBottom()
  }, [messages,activeUser]);

  if (!activeUser) {
    return (
      <div className={styles.cardsContainer}>
        <div className={styles.mainCard}>
          <div className={styles.messages}>
            <p> Select User </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.mainCard}>
        <div className={styles.chatWithUser}>
          <div className={styles.topbar}>
            <div className={styles.center}>{activeUser.userName}</div>
          </div>
          <div className={styles.messages}>
            {(messages[activeUser.userName] || []).map((m, i) => (
              <Message key={i} text={m.text} sent={m.sent} />
            ))}
            <div className={styles.gradientCircle}></div>
                        
                        
            <div ref={messagesToBottom}></div>

          </div>
        </div>

        <div className={styles.messageType}>
          <textarea
            className={styles.typing}
            placeholder="Type a message ..."
            aria-label="Type a message"
            onKeyDown={onKeyDown}
          />
          <button
            className={styles.sendMess}
            aria-label="Send message"
            onClick={(e) => {
              const textarea = (e.currentTarget.previousElementSibling as HTMLTextAreaElement | null);
              if (!textarea) return;
              const value = textarea.value;
              sendMessage(value);
              textarea.value = '';
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};



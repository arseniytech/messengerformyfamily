import { memo } from 'react';
import styles from './ChatWindow.module.css';

export type MessageProps = {
  text: string;
  sent: boolean;
  timestamp?: string;
  isGrouped?: boolean;
};

const formatTime = (timestamp?: string): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'только что';
  if (diffMins < 60) return `${diffMins} мин назад`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)} ч назад`;

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const Message = ({ text, sent, timestamp, isGrouped }: MessageProps) => {
  return (
    <div
      className={`${styles.message} ${sent ? styles.sent : ''} ${
        isGrouped ? styles.grouped : ''
      }`}
    >
      <div className={styles.messageText}>{text}</div>
      {timestamp && (
        <div className={styles.messageTime}>{formatTime(timestamp)}</div>
      )}
    </div>
  );
};

export default memo(Message);
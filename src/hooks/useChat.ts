import { useCallback, useMemo } from 'react';
import { useMessageStore } from '../store/messageStore';
import { useAuthStore } from '../store/authStore';

export const useChat = () => {
  const activeUser = useMessageStore((s) => s.activeUser);
  const addMessage = useMessageStore((s) => s.addMessage);
  const token = useAuthStore((s) => s.token);
  const currentUser = useAuthStore((s) => s.user);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!activeUser || !token || !currentUser) return;
      const trimmed = text.trim();
      if (!trimmed) return;

      // локально сразу показать
      addMessage(
        activeUser.userName,
        trimmed,
        true,
        new Date().toISOString(),
        currentUser.id,
      );

      if (!activeUser.id) {
        // нет id — пока просто локально
        return;
      }

      try {
        await fetch('http://localhost:4000/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            toUserId: activeUser.id,
            text: trimmed,
          }),
        });
      } catch (err) {
        console.error('Failed to send message', err);
      }
    },
    [activeUser, addMessage, token, currentUser],
  );

  return useMemo(() => ({ activeUser, sendMessage }), [activeUser, sendMessage]);
};
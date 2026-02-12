import { useEffect, useState } from 'react';
import { ChatList } from './ChatList';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const [time, setTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="navigation">
      <div id="timeDisplay">{time}</div>

      <div className="messageTitle">
        <span style={{ fontSize: 18, fontWeight: 600 }}>Messages</span>
      </div>

      <div className="search">
        <input
          type="text"
          id="searchinput"
          placeholder="Search"
          aria-label="Search chats"
        />
      </div>

      <div className="buttons">
        <button className="navBtn">All</button>
        <button className="navBtn">Groups</button>
        <button className="navBtn">Personal</button>
      </div>

      <ChatList />

      <div className="btnsContainer">
        <div className="btns">
          <Link
            to="/calls"
            className="bottomBtn"
            aria-label="Go to Calls"
            style={isActive('/calls') ? { color: '#007aff' } : undefined}
          >
            <span>Calls</span>
          </Link>
          <Link
            to="/"
            className="bottomBtn"
            aria-label="Go to Chats"
            style={isActive('/') ? { color: '#007aff' } : undefined}
          >
            <span>Chats</span>
          </Link>
          <Link
            to="/settings"
            className="bottomBtn"
            aria-label="Go to Settings"
            style={isActive('/settings') ? { color: '#007aff' } : undefined}
          >
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
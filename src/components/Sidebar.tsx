import MessagesIcon from '../assets/Messages.svg';
import SearchIcon from '../assets/Search.svg';
import PhoneIcon from '../assets/Phone.svg';
import ChatMessageIcon from '../assets/Chat Message.svg';
import SettingsIcon from '../assets/Settings.svg';
import { useEffect, useState } from 'react';
import { ChatList } from './ChatList';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], {hour: '2-digit' , minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="navigation">
      <div id="timeDisplay">{time}</div>
      <div className="messageTitle">
        <img src={MessagesIcon} alt="Messages" />
      </div>

      <div className="search">
        <input type="text" id="searchinput" placeholder="Search" aria-label="Search chats" />
        <button id="searchBtn" aria-label="Search">
          <img className="searchinput" src={SearchIcon} alt="Search" />
        </button>
      </div>

      <div className="buttons">
        <button className="navBtn">All</button>
        <button className="navBtn">Groups</button>
        <button className="navBtn">Personal</button>
      </div>

      <ChatList />

      <div className="btnsContainer">
        <div className="btns">
          <Link to="/calls" className="bottomBtn" aria-label="Go to Calls">
            <img src={PhoneIcon} alt="phone" />
            <span>Calls</span>
          </Link>
          <Link to="/" className="bottomBtn" aria-label="Go to Chats">
            <img src={ChatMessageIcon} alt="chat" />
            <span>Chats</span>
          </Link>
          <Link to="/settings" className="bottomBtn" aria-label="Go to Settings">
            <img src={SettingsIcon} alt="settings" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};



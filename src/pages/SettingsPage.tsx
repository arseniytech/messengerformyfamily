import { Link } from 'react-router-dom';
import SettingsIcon from '../assets/Settings.svg';
import PhoneIcon from '../assets/Phone.svg';
import ChatMessageIcon from '../assets/Chat Message.svg';
import { ChatWindow } from '../components/ChatWindow';

const SettingsPage = () => {
  return (
    <div className="mainBlock">
      <div className="navigation">
        <div className="messageTitle">
          <img src={SettingsIcon} alt="Settings" />
        </div>

        <div className="chatContainer">
          <div className="chatItem" style={{ cursor: 'default' }}>
            <div className="userInfo" style={{ width: '100%' }}>
              <div className="chatTop">
                <span className="userName">Settings</span>
                <span className="chatTime"></span>
              </div>
              <div className="chatMessage"> настраивай</div>
            </div>
          </div>
        </div>

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

      <ChatWindow />
    </div>
  );
};

export default SettingsPage;



import { Link, useLocation } from 'react-router-dom';
import { ChatWindow } from '../components/ChatWindow';

const CallsPage = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="mainBlock">
      <div className="navigation">
        <div id="timeDisplay"></div>

        <div className="messageTitle">
          <span style={{ fontSize: 18, fontWeight: 600 }}>Calls</span>
        </div>

        <div className="chatContainer">
          <div className="chatItem" style={{ cursor: 'default' }}>
            <div className="userInfo" style={{ width: '100%' }}>
              <div className="chatTop">
                <span className="userName">Calls</span>
              </div>
              <div className="chatMessage">История звонков появится здесь</div>
            </div>
          </div>
        </div>

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

      <ChatWindow />
    </div>
  );
};

export default CallsPage;
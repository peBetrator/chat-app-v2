import React from 'react';
import './app.css';

import Header from '../components/header/app-header';
import Channels from '../../features/channels/components/channels';

import MainChat from '../../pages/main/chat-page';

function App() {
  return (
    <div>
      <Header />
      <div className="chat__app">
        <Channels />
        <div className="chat__main" id="content">
          {/* div for mounting sidebars */}
          <MainChat />
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './app.css';

import Header from '../components/header/app-header';
import Channels from '../../features/channels/components/channels';

import MainChat from '../../pages/main/chat-page';
import Footer from '../components/common/footer';

function App() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <Channels />
        <div className="content" id="content">
          {/* div for mounting sidebars */}
          <MainChat />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

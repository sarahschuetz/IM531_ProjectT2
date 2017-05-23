import React from 'react';
import { ipcRenderer, shell } from 'electron';
import MenuBar from './components/MenuBar.jsx';
import ProjectBar from './components/ProjectBar.jsx';
import ServerWindow from './components/ServerWindow.jsx';
import SystemBarBottom from './components/SystemBarBottom.jsx';
import SystemBarTop from './components/SystemBarTop.jsx';

class App extends React.Component {

  componentDidMount() {
    ipcRenderer.on('VolumeUp', () => {
      console.log('TEST');
    });
  }

  openWebsite() {
    shell.openExternal("http://google.at");
  }

  render() {
    return <div>
      <MenuBar />
      <ProjectBar />
      <SystemBarTop />
      <ServerWindow />
      <SystemBarBottom />
    </div>;
  }
}

export default App;

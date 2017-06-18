import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import MenuBar from './components/MenuBar.jsx';
import MenuItem from './components/MenuItem.jsx';
import ServerOverview from './routes/ServerOverview.jsx';
import StaticWebserver from './routes/StaticWebserver.jsx';
import SystemBarBottom from './components/SystemBarBottom.jsx';

import { stopServer } from './store/actions/server';
import { stopProcess } from './store/actions/process';

const cp = require('child_process');

const styles = {
  menuLink: {
    textDecoration: 'none',
  },
};

const routes = [
  {
    link: '/',
    exact: true,
    title: 'Server Overview',
    component: ServerOverview,
    icon: 'code',
  },
  {
    link: '/static',
    title: 'Static Webserver',
    component: StaticWebserver,
    icon: 'settings',
  },
];

@connect(store => ({
  serverList: store.server.list,
  processList: store.process.list,
}))
class App extends React.Component {

  static propTypes = {
    serverList: PropTypes.array,
    processList: PropTypes.array,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      serverOverviewActive: true,
      terminatedServerActive: false,
      staticWebserverActive: false,
    };
    this.stopAllServer = this.stopAllServer.bind(this);
  }

  componentWillMount() {
    ipcRenderer.on('stop-servers', this.stopAllServer);
  }

  stopAllServer() {
    let index = 0;
    this.props.serverList.forEach((server) => {
      if (server.isRunning) {
        const pid = server.processPID;
        const currentProcess = this.props.processList.filter(process => process.pid === pid)[0];
        if (!currentProcess.terminated) {
          const isWin = /^win/.test(process.platform);
          if (!isWin) {
            process.kill(pid);
          } else {
            cp.exec(`taskkill /PID ${pid} /T /F`, () => {});
          }
        }
        this.props.dispatch(stopProcess(pid));
        this.props.dispatch(stopServer(index));
      }
      index += 1;
    });
    ipcRenderer.send('close-window');
  }

  onButtonClick(title) {
    if (title === 'Server Overview') {
      this.setState({
        serverOverviewActive: true,
        terminatedServerActive: false,
        staticWebserverActive: false,
      });
    } else if (title === 'Static Webserver') {
      this.setState({
        serverOverviewActive: false,
        terminatedServerActive: false,
        staticWebserverActive: true,
      });
    }
  }

  getTitle(title) {
    if (title === 'Server Overview') {
      return this.state.serverOverviewActive;
    } else if (title === 'Static Webserver') {
      return this.state.staticWebserverActive;
    }
    return this.state.serverOverviewActive;
  }

  render() {
    return <Router>
      <div>
        <MenuBar>
          {routes.map(route => (
            <Link style={styles.menuLink} to={route.link} key={route.link} onClick={() =>
              this.onButtonClick(route.title)} replace>
              <MenuItem icon={route.icon} active={ this.getTitle(route.title) } />
            </Link>
          ))}
        </MenuBar>
        {routes.map(route => (
            <Route exact
                   key={route.link}
                   path={route.link}
                   component={route.component } />
        ))}
        <SystemBarBottom />
      </div>
    </Router>;
  }
}

export default App;

import React from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import ErrorWindow from './routes/ErrorWindow.jsx';
import MenuBar from './components/MenuBar.jsx';
import MenuItem from './components/MenuItem.jsx';
import ProjectBar from './components/ProjectBar.jsx';
import ServerWindow from './routes/ServerWindow.jsx';
import SettingsWindow from './routes/SettingsWindow.jsx';
import SystemBarBottom from './components/SystemBarBottom.jsx';
import SystemBarTop from './components/SystemBarTop.jsx';

const styles = {
  menuLink: {
    textDecoration: 'none',
  },
};

const routes = [
  {
    link: '/',
    exact: true,
    title: 'Server',
    component: ServerWindow,
    icon: 'code',
  },
  {
    link: '/errors',
    title: 'Error Messages',
    component: ErrorWindow,
    icon: 'error',
  },
  {
    link: '/settings',
    title: 'Settings',
    component: SettingsWindow,
    icon: 'settings',
  },
];

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      settingsActive: false,
      serverActive: true,
      errorActive: false,
    };
    // this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(title) {
    if (title === 'Server') {
      this.setState({ serverActive: true, errorActive: false, settingsActive: false });
    } else if (title === 'Error Messages') {
      this.setState({ serverActive: false, errorActive: true, settingsActive: false });
    } else if (title === 'Settings') {
      this.setState({ serverActive: false, errorActive: false, settingsActive: true });
    }
  }

  getTitle(title) {
    if (title === 'Server') {
      return this.state.serverActive;
    } else if (title === 'Error Messages') {
      return this.state.errorActive;
    } else if (title === 'Settings') {
      return this.state.settingsActive;
    }
    return this.state.serverActive;
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
        <ProjectBar />
        <SystemBarTop />
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

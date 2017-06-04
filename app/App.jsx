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

  render() {
    return <Router>
      <div>
        <MenuBar>
          {routes.map(route => (
            <Link to={route.link} key={route.link} style={styles.menuLink}>
              <MenuItem icon={route.icon} />
            </Link>
          ))}
        </MenuBar>
        <ProjectBar />
        <SystemBarTop />
        {routes.map(route => (
            <Route exact
                   key={route.link}
                   path={route.link}
                   component={route.component} />
        ))}
        <SystemBarBottom />
      </div>
    </Router>;
  }
}

export default App;

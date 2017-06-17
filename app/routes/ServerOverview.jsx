import React from 'react';
import Theme from './../theme';
import SystemBarTop from './../components/SystemBarTop.jsx';
import ProjectBar from './../components/ProjectBar.jsx';
import ServerWindow from './../components/ServerWindow.jsx';

const styles = {
  container: {
    width: `calc(100% - ${Theme.sizes.MENU_BAR_WIDTH}px)`,
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px)`,
    fontFamily: '"Montserrat", sans-serif',
    float: 'right',
    position: 'relative',
  },
};

class ServerOverview extends React.Component {

  render() {
    return <div style={styles.container}>
      <ProjectBar />
      <SystemBarTop />
      <ServerWindow />
    </div>;
  }
}

export default ServerOverview;

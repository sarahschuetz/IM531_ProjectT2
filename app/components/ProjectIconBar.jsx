import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Theme from './../theme';
import ProjectIcon from './ProjectIcon.jsx';
import { deleteServer, startServer, stopCurrentServer } from './../store/actions/server';
import { startProcess, stopProcess, addMessage } from './../store/actions/process';

const spawn = require('child_process').spawn;

const styles = {
  container: {
    backgroundColor: Theme.colors.EDON_BLUE_LIGHT,
    width: '100%',
    height: `${Theme.sizes.PROJECT_ICON_BAR_HEIGHT}px`,
    fontFamily: '"Montserrat", sans-serif',
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    paddingRight: '10px',
  },
  button: {
    float: 'right',
    display: 'block',
    border: 0,
    background: 'transparent',
    color: Theme.colors.FONT_DEFAULT,
    outline: 'none',
    cursor: 'pointer',
  },
  icon: {
    margin: '0 auto',
    cursor: 'pointer',
  },
};

@connect(store => ({
  currentServerIndex: store.server.currentServerIndex,
  server: store.server.list[store.server.currentServerIndex],
}))
class ProjectIconBar extends React.Component {

  static propTypes = {
    currentServerIndex: PropTypes.number,
    server: PropTypes.object,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = { unsavedChanges: false };
    this.deleteServer = this.deleteServer.bind(this);
    this.toggleServer = this.toggleServer.bind(this);
    this.startServer = this.startServer.bind(this);
    this.stopServer = this.stopServer.bind(this);
    this.restartServer = this.restartServer.bind(this);
  }

  deleteServer() {
    if (this.props.server.isRunning) {
      this.stopServer();
    }
    this.props.dispatch(deleteServer(this.props.currentServerIndex));
  }

  toggleServer() {
    if (!this.props.server.isRunning) {
      this.startServer();
    } else {
      this.stopServer();
    }
  }

  restartServer() {
    if (this.props.server.isRunning) {
      this.stopServer();
      this.startServer();
    }
  }

  startServer() {
    const newProcess = spawn('webpack --watch', [], { shell: true });

    newProcess.stdout.on('data', (data) => {
      this.props.dispatch(addMessage(newProcess.pid, data));
    });

    this.props.dispatch(startProcess(newProcess.pid, newProcess));
    this.props.dispatch(startServer(newProcess.pid));
  }

  stopServer() {
    const pid = this.props.server.processPID;
    process.kill(pid);
    this.props.dispatch(stopProcess(pid));
    this.props.dispatch(stopCurrentServer());
  }

  render() {
    if (this.props.currentServerIndex >= 0) {
      return <div style={styles.container}>
        <div style={styles.icon} onClick={this.toggleServer}>
          <ProjectIcon icon="power_settings_new"/>
        </div>
        <div style={styles.icon} onClick={this.deleteServer}>
          <ProjectIcon icon="delete_forever"/>
        </div>
        {this.props.server.isRunning ?
          <div style={styles.icon} onClick={this.restartServer}>
            <ProjectIcon icon="cached"/>
          </div>
        : ''}
      </div>;
    }
    return <div style={styles.container}></div>;
  }
}

export default ProjectIconBar;

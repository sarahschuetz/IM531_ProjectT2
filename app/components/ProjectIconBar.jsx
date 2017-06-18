import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Theme from './../theme';
import ProjectIcon from './ProjectIcon.jsx';
import { deleteServer, startServer, stopCurrentServer } from './../store/actions/server';
import { startProcess, stopProcess, addMessage, processTerminated } from './../store/actions/process';

const cp = require('child_process');

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
  project: store.project.list[store.project.currentProjectIndex],
  processList: store.process.list,
}))
class ProjectIconBar extends React.Component {

  static propTypes = {
    currentServerIndex: PropTypes.number,
    server: PropTypes.object,
    project: PropTypes.object,
    dispatch: PropTypes.func,
    processList: PropTypes.array,
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
    this.props.dispatch(deleteServer(this.props.server.id));
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
    const newProcess = cp.spawn(this.props.server.command, [], {
      shell: true,
      cwd: this.props.project.rootPath,
    });

    newProcess.stdout.on('data', (data) => {
      this.props.dispatch(addMessage(newProcess.pid, data));
    });

    newProcess.stderr.on('data', (data) => {
      this.props.dispatch(addMessage(newProcess.pid, data));
    });

    newProcess.on('close', () => {
      this.props.dispatch(addMessage(newProcess.pid, '---------- PROCESS TERMINATED ----------'));
      this.props.dispatch(processTerminated(newProcess.pid));
    });

    this.props.dispatch(startProcess(newProcess.pid, newProcess));
    this.props.dispatch(startServer(newProcess.pid));
  }

  stopServer() {
    const pid = this.props.server.processPID;
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
    this.props.dispatch(stopCurrentServer());
  }

  render() {
    if (this.props.currentServerIndex > 0) {
      return <div style={styles.container}>
        {(this.props.server.command !== '' && this.props.project.rootPath !== '') ?
          <div style={styles.icon} onClick={this.toggleServer}>
            <ProjectIcon icon="power_settings_new"/>
          </div>
        : ''}
        {!this.props.server.isRunning ?
          <div style={styles.icon} onClick={this.deleteServer}>
            <ProjectIcon icon="delete_forever"/>
          </div>
        : ''}
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

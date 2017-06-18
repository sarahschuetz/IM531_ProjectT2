import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Theme from './../theme';
import { startServer, stopCurrentServer } from './../store/actions/server';
import { startProcess, stopProcess, addMessage, processTerminated } from './../store/actions/process';

const cp = require('child_process');

const styles = {
  container: {
    backgroundColor: Theme.colors.BACKGROUND,
    width: '60px',
    height: '60px',
    color: Theme.colors.FONT_DEFAULT,
    position: 'absolute',
    right: '0px',
    top: '0px',
  },
  icon: {
    fontSize: '60px',
    ':hover': {
      cursor: 'pointer',
      color: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    },
  },
};

@connect(store => ({
  project: store.project.list[store.project.currentProjectIndex],
  server: store.server.list[store.server.currentServerIndex],
  processList: store.process.list,
}))
@Radium
class ServerWindow extends React.Component {

  static propTypes = {
    project: PropTypes.object,
    processList: PropTypes.array,
    server: PropTypes.object,
    dispatch: PropTypes.func,
    checkPrerequisites: PropTypes.func,
    arg: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
    };

    this.toggleServer = this.toggleServer.bind(this);
    this.startServer = this.startServer.bind(this);
    this.stopServer = this.stopServer.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ errorMessage: '' });
    }
  }

  toggleServer() {
    if (!this.props.server.isRunning) {
      const readyToStart = this.props.checkPrerequisites ? this.props.checkPrerequisites() : true;
      if (readyToStart) {
        this.startServer();
      }
    } else {
      this.stopServer();
    }
  }

  startServer() {
    const arg = this.props.arg ? [`"${this.props.arg}"`] : [];
    const newProcess = cp.spawn(this.props.server.command, arg, {
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
      if (this.props.server.isRunning) {
        this.props.dispatch(addMessage(newProcess.pid, '---------- PROCESS TERMINATED ----------'));
        this.props.dispatch(processTerminated(newProcess.pid));
      }
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
    if (this.props.server) {
      let iconStyle = { ...styles.icon };
      if (this.props.server.isRunning) {
        iconStyle = { ...iconStyle, color: Theme.colors.EDON_BLUE_LIGHT };
      }

      return <div style={styles.container}>
          <i className="material-icons" style={iconStyle} onClick={this.toggleServer}>power_settings_new</i>
      </div>;
    }
    return <div style={styles.container}></div>;
  }
}

export default ServerWindow;

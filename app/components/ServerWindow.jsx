import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import _ from 'underscore';
import Theme from './../theme';
import Console from './Console.jsx';
import TextInput from './TextInput.jsx';
import { setCommand, startServer, stopCurrentServer } from './../store/actions/server';
import { startProcess, stopProcess, addMessage, processTerminated } from './../store/actions/process';

const spawn = require('child_process').spawn;

const styles = {
  container: {
    backgroundColor: Theme.colors.BACKGROUND,
    width: `calc(100% - ${Theme.sizes.PROJECT_BAR_WIDTH}px)`,
    height: `calc(100% - ${Theme.sizes.HEADER_HEIGHT + Theme.sizes.PROJECT_ICON_BAR_HEIGHT}px)`,
    padding: '16px',
    fontFamily: '"Montserrat", sans-serif',
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    fontSize: '14px',
    letterSpacing: '0.5px',
    float: 'right',
    position: 'relative',
  },
  settings: {
    position: 'relative',
    height: '164px',
    width: '100%',
  },
  input: {
    position: 'absolute',
    width: '100%',
    bottom: '16px',
  },
  icon: {
    fontSize: '60px',
    position: 'absolute',
    right: '0px',
    ':hover': {
      cursor: 'pointer',
      color: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    },
  },
};

@connect(store => ({
  project: store.project.list[store.project.currentProjectIndex],
  serverList: store.server.list,
  server: store.server.list[store.server.currentServerIndex],
  processList: store.process.list,
  fileStore: store.server.fileStore,
}))
@Radium
class ServerWindow extends React.Component {

  static propTypes = {
    project: PropTypes.object,
    serverList: PropTypes.array,
    processList: PropTypes.array,
    server: PropTypes.object,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleServer = this.toggleServer.bind(this);
    this.startServer = this.startServer.bind(this);
    this.stopServer = this.stopServer.bind(this);
  }

  componentWillMount() {
    this.saveChange = _.debounce(this.saveChange, 2000);
  }

  componentWillUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ errorMessage: '' });
    }
  }

  handleChange(event) {
    this.props.dispatch(setCommand(event.target.value));
    this.saveChange();
  }

  saveChange() {
    this.props.fileStore.set('list', this.props.serverList);
  }

  toggleServer() {
    if (!this.props.server.isRunning) {
      if (this.props.project.rootPath === '') {
        this.setState({ errorMessage: 'No project root directory selected.' });
      } else if (this.props.server.command === '') {
        this.setState({ errorMessage: 'No command specified.' });
      } else {
        this.startServer();
      }
    } else {
      this.stopServer();
    }
  }

  startServer() {
    const newProcess = spawn(this.props.server.command, [], {
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
      process.kill(pid);
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
        <div style={styles.settings}>
          <div>{this.state.errorMessage}</div>
          <i className="material-icons" style={iconStyle} onClick={this.toggleServer}>power_settings_new</i>
          <div style={styles.input}>
            <TextInput label="Command"
                       placeholder="npm start"
                       value={this.props.server.command}
                       handleChange={this.handleChange} />
          </div>
        </div>
        <Console server={this.props.server} />
      </div>;
    }
    return <div style={styles.container}></div>;
  }
}

export default ServerWindow;

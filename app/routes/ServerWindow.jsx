import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import _ from 'underscore';
import Theme from './../theme';
import Console from './../components/Console.jsx';
import TextInput from './../components/TextInput.jsx';
import { setCommand, startServer, stopServer } from './../store/actions/server';
import { startProcess, stopProcess, addMessage } from './../store/actions/process';

const spawn = require('child_process').spawn;

const styles = {
  container: {
    backgroundColor: Theme.colors.BACKGROUND,
    width: `calc(100% - ${Theme.sizes.PROJECT_BAR_WIDTH + Theme.sizes.MENU_BAR_WIDTH}px)`,
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT + Theme.sizes.HEADER_HEIGHT + Theme.sizes.PROJECT_ICON_BAR_HEIGHT}px)`,
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
  serverList: store.server.list,
  server: store.server.list[store.server.currentServerIndex],
  processList: store.process.list,
  fileStore: store.server.fileStore,
}))
@Radium
class ServerWindow extends React.Component {

  static propTypes = {
    serverList: PropTypes.array,
    processList: PropTypes.array,
    server: PropTypes.object,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.toggleServer = this.toggleServer.bind(this);
    this.startServer = this.startServer.bind(this);
    this.stopServer = this.stopServer.bind(this);
  }

  componentWillMount() {
    this.saveChange = _.debounce(this.saveChange, 2000);
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
      this.startServer();
    } else {
      this.stopServer();
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
    this.props.dispatch(stopServer());
  }

  render() {
    if (this.props.server) {
      let iconStyle = { ...styles.icon };
      if (this.props.server.isRunning) {
        iconStyle = { ...iconStyle, color: Theme.colors.EDON_BLUE_LIGHT };
      }

      return <div style={styles.container}>
        <div style={styles.settings}>
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

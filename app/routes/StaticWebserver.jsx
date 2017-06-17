import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Theme from './../theme';
import Console from './../components/Console.jsx';
import TextInput from './../components/TextInput.jsx';
import ServerStartIcon from './../components/ServerStartIcon.jsx';
import { setCurrentProjectIndex } from './../store/actions/project';
import { setCurrentServerIndex, setShowDirectory } from './../store/actions/server';

const { dialog } = require('electron').remote;

const styles = {
  container: {
    backgroundColor: Theme.colors.BACKGROUND,
    width: `calc(100% - ${Theme.sizes.MENU_BAR_WIDTH}px)`,
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px)`,
    padding: '16px',
    fontFamily: '"Montserrat", sans-serif',
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    fontSize: '14px',
    letterSpacing: '0.5px',
    float: 'right',
    position: 'relative',
  },
  h1: {
    fontWeight: 300,
    fontSize: '20px',
    float: 'left',
  },
  p: {
    clear: 'both',
    fontWeight: 200,
    fontSize: '14px',
    width: '320px',
    float: 'left',
  },
  icon: {
    position: 'absolute',
    right: '16px',
    top: '16px',
  },
  input: {
    clear: 'both',
  },
};

@connect(store => ({
  fileStore: store.server.fileStore,
  projects: store.project.list,
  project: store.project.list[0],
  server: store.server.list[0],
  serverList: store.server.list,
}))
@Radium
class StaticWebserver extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
    projects: PropTypes.array,
    project: PropTypes.object,
    server: PropTypes.object,
    serverList: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.openFolder = this.openFolder.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(setCurrentProjectIndex(0));
    this.props.dispatch(setCurrentServerIndex(0));
  }

  componentWillUpdate(nextProps) {
    if (this.props.server !== nextProps.server) {
      this.props.fileStore.set({
        list: nextProps.serverList,
      });
    }
  }

  handleChange(event) {
    this.props.dispatch(setShowDirectory(event.target.value));
  }

  openFolder() {
    dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory', 'promptToCreate'] },
    (filePaths) => {
      if (filePaths === undefined) {
        return;
      }
      this.props.dispatch(setShowDirectory(filePaths[0]));
    });
  }

  render() {
    return <div style={styles.container}>
      <h1 style={styles.h1}>Start a Temporary Static Webserver</h1>
      <p style={styles.p}>This option starts a static file server showing
                          the given directory on port 9000.</p>
      { (this.props.server && this.props.server.showDirectory) ?
        <div style={styles.icon}><ServerStartIcon arg={this.props.server.showDirectory}/></div>
      : ''}
      <div style={styles.input}>
        <TextInput label="server directory"
                   placeholder="directory/to/serve"
                   backgroundLight={false}
                   icon='folder'
                   iconClickHandler={this.openFolder}
                   value={this.props.server.showDirectory}
                   handleChange={this.handleChange} />
      </div>
      <div>{this.state.errorMessage}</div>
      <Console server={this.props.server}/>
    </div>;
  }
}

export default StaticWebserver;

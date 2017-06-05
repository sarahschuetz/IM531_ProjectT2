import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Theme from './../theme';
import ProjectIcon from './ProjectIcon.jsx';
import { deleteServer } from './../store/actions/server';

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
};

@connect(store => ({
  currentServerIndex: store.server.currentServerIndex,
  currentProjectIndex: store.project.currentProjectIndex,
  server: store.server.list,
  fileStore: store.server.fileStore,
  serverIdCounter: store.server.serverIdCounter,
}))

class ProjectIconBar extends React.Component {

  static propTypes = {
    currentServerIndex: PropTypes.number,
    currentProjectIndex: PropTypes.number,
    server: PropTypes.array,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
    serverIdCounter: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = { unsavedChanges: false, serverNumb: 1 };
    this.deleteServer = this.deleteServer.bind(this);
  }

  deleteServer() {
    this.props.dispatch(deleteServer({
      serverID: this.state.serverNumb,
    }));
  }

  render() {
    return <div style={styles.container}>
          <ProjectIcon icon="cached"/>
          <ProjectIcon icon="add"/>
          <button style={styles.button} onClick={() => this.deleteServer()}><ProjectIcon onClick={() => this.deleteServer()} icon="delete_forever"/></button>
          <ProjectIcon icon="power_settings_new"/>
        </div>;
  }
}

export default ProjectIconBar;

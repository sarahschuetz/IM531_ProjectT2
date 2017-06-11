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
  deleteSever: {
    margin: '0 auto',
    cursor: 'pointer',
  },
};

@connect(store => ({
  currentServerIndex: store.server.currentServerIndex,
  server: store.server.list,
  fileStore: store.server.fileStore,
}))

class ProjectIconBar extends React.Component {

  static propTypes = {
    currentServerIndex: PropTypes.number,
    server: PropTypes.array,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { unsavedChanges: false };
    this.deleteServer = this.deleteServer.bind(this);
  }

  deleteServer() {
    this.props.dispatch(deleteServer(this.props.currentServerIndex));
  }

  render() {
    if (this.props.currentServerIndex >= 0) {
      return <div style={styles.container}>
            <ProjectIcon icon="cached"/>
        <div style={styles.deleteSever} onClick={() => this.deleteServer()}><ProjectIcon icon="delete_forever"/></div>
            <ProjectIcon icon="power_settings_new"/>
          </div>;
    }
    return <div style={styles.container}></div>;
  }
}

export default ProjectIconBar;

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectBarEntry from './ProjectBarEntry.jsx';
import ProjectIconBar from './ProjectIconBar.jsx';
import ProjectSelector from './ProjectSelector.jsx';
import Theme from './../theme';
import { addServer } from './../store/actions/server';

const styles = {
  container: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px)`,
    backgroundColor: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    float: 'left',
    color: Theme.colors.WHITE,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    fontSize: '14px',
    fontWeight: '300',
  },
  scroll: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: `calc(100% - ${Theme.sizes.HEADER_HEIGHT + Theme.sizes.PROJECT_ICON_BAR_HEIGHT}px)`,
    overflowY: 'auto',
    paddingBottom: '100px',
    paddingTop: '40px',
  },
  addServer: {
    fontSize: '12px',
    color: Theme.colors.EDON_BLUE,
    margin: '0 auto',
    paddingTop: '25px',
    width: '115px',
    cursor: 'pointer',
  },
  icon: {
    float: 'left',
    marginRight: '5px',
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    marginLeft: '55px',
    border: 'none',
    color: Theme.colors.EDON_BLUE_LIGHT,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    fontSize: '13px',
    width: '200px',
    fontWeight: 400,
  },
};

@connect(store => ({
  currentServerIndex: store.server.currentServerIndex,
  currentProjectIndex: store.project.currentProjectIndex,
  server: store.server.list,
  projects: store.project.list,
  fileStore: store.server.fileStore,
  serverIdCounter: store.server.serverIdCounter,
}))
class ProjectBar extends React.Component {

  static propTypes = {
    currentServerIndex: PropTypes.number,
    currentProjectIndex: PropTypes.number,
    server: PropTypes.array,
    projects: PropTypes.array,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
    serverIdCounter: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = { unsavedChanges: false };
    this.addServer = this.addServer.bind(this);
    this.saveNewServer = this.saveNewServer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.checkProjectId = this.checkProjectId.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.server !== prevProps.server) {
      this.props.fileStore.set({
        list: this.props.server,
        serverIdCounter: this.props.serverIdCounter,
      });
    }
  }

  addServer() {
    if (!this.state.newServer) {
      this.setState({
        nameInput: '',
        newServer: true,
      });
    }
  }

  saveNewServer() {
    if (this.state.nameInput !== '') {
      this.props.dispatch(addServer({
        name: this.state.nameInput,
        projectId: this.props.server[this.props.currentProjectIndex].id,
      }));
    }
    this.setState({
      nameInput: '',
      newServer: false,
    });
  }

  handleChange(event) {
    this.setState({ nameInput: event.target.value });
  }

  saveChange(event) {
    if (event.keyCode === 13) {
      this.saveNewServer();
    }
  }

  checkProjectId(server) {
    if (this.props.projects[this.props.currentProjectIndex]) {
      return server.projectId === this.props.projects[this.props.currentProjectIndex].id;
    }
    return false;
  }

  render() {
    let inputField;
    if (this.state.newServer) {
      inputField = <input type="text"
                          style={styles.input}
                          maxLength="15"
                          placeholder="server name"
                          onBlur={this.saveNewServer}
                          onChange={this.handleChange}
                          onKeyDown={this.saveChange}
                          autoFocus />;
    }

    return <div style={styles.container}>
      <ProjectSelector/>
      <ProjectIconBar/>

      <div style={styles.scroll}>
        {this.props.server.filter(this.checkProjectId).map(server => (
          <ProjectBarEntry key={server.id}
            id={server.id}
            name={server.name} />
        ))}

        <div>
          {inputField}
        </div>

        <div style={styles.addServer} onClick={this.addServer}>
          <i className="material-icons" style={styles.icon}>add_circle</i>
          add new Server
        </div>

      </div>
    </div>;
  }
}

export default ProjectBar;

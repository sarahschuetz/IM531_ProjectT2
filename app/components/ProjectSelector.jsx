

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import React from 'react';
import Theme from './../theme';
import ProjectSelectorEntry from './ProjectSelectorEntry.jsx';
import { addProject, deleteProject, setCurrentProjectIndex } from './../store/actions/project';
import { deleteServer, stopServer, setCurrentServerIndex } from './../store/actions/server';
import { stopProcess } from './../store/actions/process';

const { dialog } = require('electron').remote;

const styles = {
  container: {
    backgroundColor: Theme.colors.EDON_BLUE,
    width: '100%',
    height: `${Theme.sizes.HEADER_HEIGHT}px`,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    fontSize: '14px',
    letterSpacing: '0.5px',
    position: 'relative',
    cursor: 'pointer',
  },
  noSelect: {
    userSelect: 'none',
    padding: '16px',
  },
  icon: {
    float: 'right',
  },
  dropDown: {
    position: 'absolute',
    top: `${Theme.sizes.HEADER_HEIGHT + 5}px `,
    left: '15px',
    backgroundColor: Theme.colors.WHITE,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    color: Theme.colors.EDON_BLUE_LIGHT,
    width: 'calc(100% - 30px)',
    fontSize: '14px',
    boxShadow: `0px 0px 15px ${Theme.colors.EDON_BLUE_LIGHT}`,
  },
  addIcon: {
    float: 'left',
    marginRight: '5px',
    fontSize: '16px',
  },
  scroll: {
    width: '100%',
    height: '400px',
    overflowY: 'auto',
    paddingBottom: '10px',
    paddingTop: '10px',
    '::-webkitScrollbar': {
      display: 'none',
    },
  },
  middle: {
    borderTop: '2px solid',
    borderColor: Theme.colors.EDON_BLUE,
    width: '100%',
    paddingTop: '10px',
    paddingBottom: '20px',
    backgroundColor: Theme.colors.EDON_BLUE_LIGHT,
  },
  addProj: {
    fontSize: '12px',
    color: Theme.colors.EDON_BLUE,
    margin: '0 auto',
    paddingTop: '15px',
    width: '115px',
    cursor: 'pointer',
    ':hover': {
      color: Theme.colors.WHITE,
    },
  },
  input: {
    color: Theme.colors.EDON_BLUE_LIGHT,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    padding: '10px',
    marginLeft: '15px',
    marginTop: '5px',
    fontSize: '13px',
    width: '240px',
    fontWeight: 400,
    border: `solid 1px ${Theme.colors.EDON_BLUE_LIGHT}`,
  },

};

@connect(store => ({
  currentProjectIndex: store.project.currentProjectIndex,
  projects: store.project.list,
  project: store.project.list[store.project.currentProjectIndex],
  serverList: store.server.list,
  processList: store.process.list,
  fileStore: store.project.fileStore,
  projectIdCounter: store.project.projectIdCounter,
}))
@Radium
class ProjectSelector extends React.Component {

  static propTypes = {
    currentProjectIndex: PropTypes.number,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
    project: PropTypes.object,
    projects: PropTypes.array,
    serverList: PropTypes.array,
    processList: PropTypes.array,
    projectIdCounter: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      fadeIn: false,
      unsaved: false,
    };

    this.addProject = this.addProject.bind(this);
    this.saveNewProject = this.saveNewProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.toggleProjectMenu = this.toggleProjectMenu.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (this.props.projects !== prevProps.projects) {
      this.props.fileStore.set({
        list: this.props.projects,
        projectIdCounter: this.props.projectIdCounter,
      });

      if (this.props.projects.length < prevProps.projects.length) { // project was deleted
        this.props.dispatch(setCurrentProjectIndex(-1));
      } else if (this.props.projects.length > prevProps.projects.length) { // project was added
        this.props.dispatch(setCurrentProjectIndex(this.props.projects.length - 1));
      }
    }

    if (this.props.currentProjectIndex !== prevProps.currentProjectIndex) {
      this.props.fileStore.set({ currentProjectIndex: this.props.currentProjectIndex });
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = (e) => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      if (e.target !== ProjectSelector) {
        this.setState({
          fadeIn: false,
        });
      }
    }
  }

  toggleProjectMenu() {
    if (!this.state.fadeIn) {
      this.setState({
        fadeIn: true,
      });
    } else {
      this.setState({
        fadeIn: false,
      });
    }
  }

  saveNewProject() {
    if (this.state.nameInput !== '') {
      this.props.dispatch(addProject({
        name: this.state.nameInput,
        rootPath: '',
      }));
      this.toggleProjectMenu();
    }
    this.setState({
      nameInput: '',
      newProject: false,
    });
  }

  openFolder() {
    dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory', 'promptToCreate'] },
            (filePaths) => {
              console.log(`DUMMY OUTPUT${filePaths}`);
            });
  }

  saveChange(event) {
    if (event.keyCode === 13) {
      this.saveNewProject();
    }
  }

  addProject() {
    if (!this.state.newProject) {
      this.setState({
        nameInput: '',
        newProject: true,
      });
    }
  }

  handleChange(event) {
    this.setState({ nameInput: event.target.value });
  }

  handleClose = () => {
    this.setState({ fadeIn: false });
  };

  findServerIndex(server) {
    let index = 0;
    let result = -1;

    this.props.serverList.forEach((currentServer) => {
      if (currentServer.id === server.id) {
        result = index;
      }
      index += 1;
    });

    return result;
  }

  deleteServer(server) {
    const serverIndex = this.findServerIndex(server);
    if (server.isRunning) {
      const pid = server.processPID;
      const currentProcess = this.props.processList.filter(process => process.pid === pid)[0];
      if (!currentProcess.terminated) {
        process.kill(pid);
      }
      this.props.dispatch(stopProcess(pid));
      this.props.dispatch(stopServer(serverIndex));
    }
    this.props.dispatch(deleteServer(serverIndex));
  }

  deleteProject() {
    this.props.dispatch(setCurrentServerIndex(-1));

    const serverOfProject = this.props.serverList.filter(
      server => server.projectId === this.props.project.id,
    );

    serverOfProject.forEach((server) => { this.deleteServer(server); });

    this.props.dispatch(deleteProject(this.props.currentProjectIndex));
    this.props.dispatch(setCurrentProjectIndex(-1));
  }

  render() {
    const projectS = (this.props.project) ? this.props.project.name : 'Select Project';
    let inputField;
    if (this.state.newProject) {
      inputField = <input type="text"
                          style={styles.input}
                          maxLength="15"
                          placeholder="Project Name"
                          onBlur={this.saveNewProject}
                          onChange={this.handleChange}
                          onKeyDown={this.saveChange}
                          autoFocus />;
    }

    return <div style={styles.container}>
      <div style={styles.noSelect} onClick={this.toggleProjectMenu}>
          {projectS}
        <i className="material-icons" style={styles.icon}>arrow_drop_down</i>
      </div>
      {this.state.fadeIn ? <div style={styles.dropDown} onBlur={this.toggleProjectMenu}>
        <div style={styles.scroll}>
          {this.props.projects.map(project => (
            <ProjectSelectorEntry key={project.id}
                                  name={project.name}
                                  id = {project.id}
                                  rootPath={project.rootPath}
                                  clickHandler={this.toggleProjectMenu}/>
          ))}
          {inputField}
        </div>

        <div style={styles.middle}>
          {this.props.currentProjectIndex >= 0 ?
            <div style={styles.addProj} key="delete" onClick={this.deleteProject}>
              <i className="material-icons" style={styles.addIcon}>delete_forever</i>
              delete Project
            </div>
          : '' }
          <div style={styles.addProj} key="add" onClick={this.addProject}>
            <i className="material-icons" style={styles.addIcon}>add_circle</i>
            add Project
          </div>
          <div style={styles.addProj} key="open" onClick={this.openFolder}>
            <i className="material-icons" style={styles.addIcon}>folder</i>
            open Project
          </div>
        </div>
      </div>
      : ''}
    </div>;
  }
}

export default ProjectSelector;

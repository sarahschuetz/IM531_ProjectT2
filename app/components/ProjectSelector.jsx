import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Theme from './../theme';
import ProjectSelectorEntry from './ProjectSelectorEntry.jsx';
import { addProject, deleteProject } from './../store/actions/project';

const styles = {
  container: {
    backgroundColor: Theme.colors.EDON_BLUE,
    width: '100%',
    height: `${Theme.sizes.HEADER_HEIGHT}px`,
    // padding: '16px',
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    fontSize: '14px',
    letterSpacing: '0.5px',
  },
  icon: {
    float: 'right',
  },
  drop: {
    display: 'none',
  },
  dropIn: {
    position: 'absolute',
    backgroundColor: Theme.colors.EDON_BLUE_LIGHT,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    color: Theme.colors.EDON_BLUE_LIGHT,
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: `calc(100% - (${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px + ${Theme.sizes.HEADER_HEIGHT}px)`,
    fontSize: '14px',
  },
  addIcon: {
    float: 'left',
    marginRight: '5px',
    fontSize: '16px',
  },
  scroll: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: `calc(100% - ${Theme.sizes.HEADER_HEIGHT + Theme.sizes.PROJECT_ICON_BAR_HEIGHT}px)`,
    overflowY: 'auto',
    paddingBottom: '100px',
    paddingTop: '40px',
  },
  middle: {
    width: '100%',
    height: '50%',
    backgroundColor: Theme.WHITE,
    margin: '0 auto',
  },
  addProj: {
    fontSize: '12px',
    color: Theme.colors.EDON_BLUE,
    margin: '0 auto',
    paddingTop: '25px',
    width: '115px',
    cursor: 'pointer',
  },
  button: {
    float: 'right',
    display: 'block',
    border: 0,
    background: 'transparent',
    color: Theme.colors.FONT_DEFAULT,
    cursor: 'pointer',
    outline: 'none',
    // margin: '16px',
  },
  fontPad: {
    padding: '16px',
  },
  input: {
    color: Theme.colors.EDON_BLUE_LIGHT,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    padding: '10px',
    marginLeft: '55px',
    border: 'none',
    fontSize: '13px',
    width: '200px',
    fontWeight: 400,
  },

};

@connect(store => ({
  currentProjectIndex: store.project.currentProjectIndex,
  project: store.project.list,
  fileStore: store.project.fileStore,
  projectIdCounter: store.project.projectIdCounter,
}))
class ProjectSelector extends React.Component {

  static propTypes = {
    currentProjectIndex: PropTypes.number,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
    project: PropTypes.array,
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
    this.onButtonClick = this.onButtonClick.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.project !== prevProps.project) {
      this.props.fileStore.set({
        list: this.props.project,
        projectIdCounter: this.props.projectIdCounter,
      });
    }
  }

  onButtonClick() {
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
        rootPath: 'TEST/PATH/HERE',
      }));
    }
    this.setState({
      nameInput: '',
      newServer: false,
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

  deleteProject() {
    this.props.dispatch(deleteProject(this.props.currentProjectIndex));
  }

  render() {
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

        <div style={styles.fontPad}>Select Project
        <button onClick={this.onButtonClick} style={styles.button}>
        <i className="material-icons" style={styles.icon}>arrow_drop_down</i>
        </button></div>

        {this.state.fadeIn ? <div style={styles.dropIn}>

          <div style={styles.scroll}>

              {this.props.project.map(project => (
                  <ProjectSelectorEntry key={project.id}
                                   name={project.name}
                                   id = {project.id}
                                   rootPath={project.rootPath}/>

              ))}

          {inputField}
          <div style={styles.addProj} onClick={this.deleteProject}><i className="material-icons" style={styles.icon}>delete_forever</i></div>
          <div style={styles.addProj} onClick={this.addProject}><i className="material-icons" style={styles.addIcon}>add_circle</i>
            add Project</div>
            </div></div>

          : <div style ={styles.drop}></div>}
      <div style ={styles.middle}></div>

          </div>;
  }


}

export default ProjectSelector;

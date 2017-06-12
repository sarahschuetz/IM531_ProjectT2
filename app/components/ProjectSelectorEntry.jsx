import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radium from 'radium';
import React from 'react';
import Theme from './../theme';
import { setCurrentProjectIndex } from './../store/actions/project';


const styles = {
  container: {
    width: '100%',
    padding: '10px 20px',
    color: Theme.colors.EDON_BLUE_LIGHT,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    fontSize: '14px',
    fontWeight: 500,
    ':hover': {
      color: Theme.colors.EDON_BLUE,
    },
  },
  projectPath: {
    color: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    fontSize: '10px',
    fontWeight: 300,
  },
};
@connect(store => ({
  currentProjectIndex: store.project.currentProjectIndex,
  projects: store.project.list,
  fileStore: store.project.fileStore,
}))
@Radium
class ProjectSelectorEntry extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rootPath: PropTypes.string.isRequired,
    projects: PropTypes.array,
    fileStore: PropTypes.object,
    dispatch: PropTypes.func,
    currentProjectIndex: PropTypes.number,
    clickHandler: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.selectCurrentProject = this.selectCurrentProject.bind(this);
  }

  selectCurrentProject() {
    let index = 0;
    this.props.projects.forEach((project) => {
      if (project.id === this.props.id) {
        this.props.dispatch(setCurrentProjectIndex(index));
      }
      index += 1;
    });
    this.props.clickHandler();
  }

  getContainerStyle() {
    console.log('projects', this.props.projects);
    console.log('index', this.props.currentProjectIndex);
    if (this.props.currentProjectIndex >= 0 &&
        this.props.projects[this.props.currentProjectIndex].id === this.props.id) {
      return {
        ...styles.container,
        color: Theme.colors.EDON_BLUE,
      };
    }
    return styles.container;
  }

  render() {
    return <div style={this.getContainerStyle()}
                key={this.props.id}
                onClick={this.selectCurrentProject}>
           {this.props.name}<br/>
           <span style={styles.projectPath}>{this.props.rootPath}</span></div>;
  }
}

export default ProjectSelectorEntry;

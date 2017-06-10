import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radium from 'radium';
import React from 'react';
import Theme from './../theme';
import { setCurrentProjectIndex } from './../store/actions/project';

const styles = {
  container: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: '50px',
    padding: '17px 20px',
    color: Theme.colors.WHITE,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    fontSize: '14px',
    ':hover': {
      backgroundColor: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    },
  },
  icon: {
    float: 'left',
    marginRight: '10px',
    fontSize: '22px',
    marginTop: '-2px',
  },
};
@connect(store => ({
  currentProjectIndex: store.project.currentProjectIndex,
  project: store.project.list,
  fileStore: store.project.fileStore,
}))
@Radium
class ProjectSelectorEntry extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rootPath: PropTypes.string.isRequired,
    project: PropTypes.array,
    fileStore: PropTypes.object,
    dispatch: PropTypes.func,
    currentProjectIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.selectCurrentProject = this.selectCurrentProject.bind(this);
  }

  selectCurrentProject() {
    let index = 0;
    this.props.project.forEach((project) => {
      if (project.id === this.props.id) {
        this.props.dispatch(setCurrentProjectIndex(index));
      }
      index += 1;
    });
  }

  getContainerStyle() {
    if (this.props.currentProjectIndex >= 0 &&
            this.props.project[this.props.currentProjectIndex].id === this.props.id) {
      return {
        ...styles.container,
        backgroundColor: Theme.colors.EDON_BLUE_LIGHT,
      };
    }
    return styles.container;
  }


  render() {
    return <div style={this.getContainerStyle()}
                key={this.props.id}
                onClick={this.selectCurrentServer}>
            <div><i className="material-icons" style={styles.icon}>delete_forever</i>{this.props.name}<br/>{this.props.rootPath} ServerID {this.props.id}</div>
        </div>;
  }
}

export default ProjectSelectorEntry;

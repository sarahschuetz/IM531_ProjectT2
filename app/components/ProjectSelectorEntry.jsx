import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radium from 'radium';
import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: '50px',
    padding: '17px 20px',
    color: Theme.colors.WHITE,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    fontSize: '14px',
    ':hover': {
      backgroundColor: Theme.colors.EDON_BLUE_LIGHT,
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
    name: PropTypes.string.isRequired,
    rootPath: PropTypes.string.isRequired,
    project: PropTypes.array,
    fileStore: PropTypes.object,
    dispatch: PropTypes.func,
    currentProjectIndex: PropTypes.number,
  };


  render() {
    return <div style={styles.container}>
            <div><i className="material-icons" style={styles.icon}>delete_forever</i>{this.props.name}<br/>{this.props.rootPath}</div>
        </div>;
  }
}

export default ProjectSelectorEntry;

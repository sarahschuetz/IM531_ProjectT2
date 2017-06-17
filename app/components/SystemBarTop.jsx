import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Theme from './../theme';
import TextInput from './../components/TextInput.jsx';
import { setProjectRootPath } from './../store/actions/project';

const { dialog } = require('electron').remote;

const styles = {
  container: {
    backgroundColor: Theme.colors.WHITE,
    width: `calc(100% - ${Theme.sizes.PROJECT_BAR_WIDTH}px)`,
    height: `${(Theme.sizes.HEADER_HEIGHT + Theme.sizes.PROJECT_ICON_BAR_HEIGHT)}px`,
    padding: '16px',
    paddingTop: '26px',
    letterSpacing: '0.5px',
    position: 'relative',
    float: 'right',
  },
};

@connect(store => ({
  currentProjectIndex: store.project.currentProjectIndex,
  projects: store.project.list,
  project: store.project.list[store.project.currentProjectIndex],
  fileStore: store.project.fileStore,
}))
class SystemBarTop extends React.Component {

  static propTypes = {
    currentProjectIndex: PropTypes.number,
    projects: PropTypes.array,
    project: PropTypes.object,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.openFolder = this.openFolder.bind(this);
  }

  componentWillMount() {
    this.saveChange = _.debounce(this.saveChange, 2000);
  }

  handleChange(event) {
    this.props.dispatch(setProjectRootPath(event.target.value));
    this.saveChange();
  }

  saveChange() {
    this.props.fileStore.set('list', this.props.projects);
  }

  openFolder() {
    dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory', 'promptToCreate'] },
    (filePaths) => {
      if (filePaths === undefined) {
        return;
      }
      this.props.dispatch(setProjectRootPath(filePaths[0]));
      this.saveChange();
    });
  }

  render() {
    const project = (this.props.project) ? this.props.project.rootPath : '';

    if (this.props.currentProjectIndex >= 0) {
      return <div style={styles.container}>
        <TextInput label="Project root"
                  placeholder="path/to/project/root"
                  backgroundLight={true}
                  icon='folder'
                  iconClickHandler={this.openFolder}
                  value={project}
                  handleChange={this.handleChange} />
      </div>;
    }
    return <div style={styles.container}></div>;
  }
}

export default SystemBarTop;

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Theme from './../theme';
import TextInput from './../components/TextInput.jsx';
import { setProjectRootPath } from './../store/actions/project';

const { dialog } = require('electron').remote;

const styles = {
  container: {
    backgroundColor: Theme.colors.WHITE,
    width: `calc(100% - ${Theme.sizes.PROJECT_BAR_WIDTH + Theme.sizes.MENU_BAR_WIDTH}px)`,
    height: `${(Theme.sizes.HEADER_HEIGHT + Theme.sizes.PROJECT_ICON_BAR_HEIGHT)}px`,
    padding: '16px',
    letterSpacing: '0.5px',
    position: 'relative',
    float: 'right',
  },
};

@connect(store => ({
  currentProjectIndex: store.project.currentProjectIndex,
  project: store.project.list[store.project.currentProjectIndex],
}))
class SystemBarTop extends React.Component {

  static propTypes = {
    currentProjectIndex: PropTypes.number,
    project: PropTypes.object,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.openFolder = this.openFolder.bind(this);
  }

  handleChange(event) {
    this.props.dispatch(setProjectRootPath(event.target.value));
  }

  openFolder() {
    dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory', 'promptToCreate'] },
    (filePaths) => {
      this.props.dispatch(setProjectRootPath(filePaths[0]));
    });
  }

  render() {
    return <div style={styles.container}>
      <TextInput label="Project root"
                 placeholder="path/to/project/root"
                 backgroundLight={true}
                 icon='folder'
                 iconClickHandler={this.openFolder}
                 value={this.props.project.rootPath}
                 handleChange={this.handleChange} />
    </div>;
  }
}

export default SystemBarTop;

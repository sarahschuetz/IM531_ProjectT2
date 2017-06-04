import React from 'react';
import Theme from './../theme';
import TextInput from './../components/TextInput.jsx';

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

class SystemBarTop extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.openFolder = this.openFolder.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  openFolder() {
    dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory', 'promptToCreate'] },
    (filePaths) => {
      this.setState({ value: filePaths[0] });
    });
  }

  render() {
    return <div style={styles.container}>
      <TextInput label="Project root"
                 placeholder="path/to/project/root"
                 backgroundLight={true}
                 icon='folder'
                 iconClickHandler={this.openFolder}
                 value={this.state.value}
                 handleChange={this.handleChange} />
    </div>;
  }
}

export default SystemBarTop;

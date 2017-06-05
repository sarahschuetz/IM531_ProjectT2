import React from 'react';

import Theme from './../theme';
import ProjectIcon from './ProjectIcon.jsx';

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
    float: 'left',
    display: 'block',
    border: 0,
    background: 'transparent',
    color: Theme.colors.FONT_DEFAULT,
    outline: 'none',
    cursor: 'pointer',
  },
};

class ProjectIconBar extends React.Component {

  render() {
    return <div style={styles.container}>
      <ProjectIcon icon="cached" />
      <ProjectIcon icon="add" />
      <ProjectIcon icon="delete_forever" />
      <ProjectIcon icon="power_settings_new" />
    </div>;
  }
}

export default ProjectIconBar;

import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    backgroundColor: Theme.colors.EDON_BLUE_LIGHT,
    width: '100%',
    height: `${Theme.sizes.PROJECT_ICON_BAR_HEIGHT}px`,
    padding: '6px',
    fontFamily: '"Montserrat", sans-serif',
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    marginBottom: '40px',
  },
};

class ProjectIconBar extends React.Component {

  render() {
    return <div style={styles.container}>
    </div>;
  }
}

export default ProjectIconBar;

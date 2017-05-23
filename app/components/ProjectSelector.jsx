import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    backgroundColor: Theme.colors.EDON_BLUE,
    width: '100%',
    height: `${Theme.sizes.HEADER_HEIGHT}px`,
    padding: '16px',
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    fontSize: '14px',
    letterSpacing: '0.5px',
  },
  icon: {
    float: 'right',
  },
};

class ProjectSelector extends React.Component {

  render() {
    return <div style={styles.container}>
      <div><img src="" /></div>
      <div>Select Project <i className="material-icons" style={styles.icon}>arrow_drop_down</i></div>
    </div>;
  }
}

export default ProjectSelector;

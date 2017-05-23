import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: '50px',
    padding: '10px 20px',
    color: Theme.colors.WHITE,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    fontSize: '14px',
  },
};

class ProjectBarEntry extends React.Component {

  render() {
    return <div style={styles.container}>
      <div>Server 1</div>
    </div>;
  }
}

export default ProjectBarEntry;

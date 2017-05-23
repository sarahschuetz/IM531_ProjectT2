import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: '50px',
    padding: '15px 20px',
    // backgroundColor: 'red',
    borderBottom: `solid 1px ${Theme.colors.WHITE}`,
    borderTop: `solid 1px ${Theme.colors.WHITE}`,
    float: 'left',
    color: Theme.colors.WHITE,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    fontSize: '14px',
  },
};

class ProjectBarEntry extends React.Component {

  render() {
    return <div style={styles.container}>
      <div>Project 1</div>
    </div>;
  }
}

export default ProjectBarEntry;

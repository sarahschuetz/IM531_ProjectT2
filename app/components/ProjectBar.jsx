import React from 'react';

import ProjectBarEntry from './ProjectBarEntry.jsx';
import ProjectIconBar from './ProjectIconBar.jsx';
import ProjectSelector from './ProjectSelector.jsx';
import Theme from './../theme';

const styles = {
  container: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px)`,
    backgroundColor: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    // borderRight: `solid 1px ${Theme.colors.WHITE}`,
    float: 'left',
    color: Theme.colors.WHITE,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    fontSize: '14px',
  },
  addServer: {
    fontSize: '12px',
    color: Theme.colors.EDON_BLUE,
    margin: '0 auto',
    marginTop: '100px',
    width: '115px',
  },
  icon: {
    float: 'left',
    marginRight: '5px',
    fontSize: '16px',
  },
};

class ProjectBar extends React.Component {

  render() {
    return <div style={styles.container}>
      <ProjectSelector/>
      <ProjectIconBar/>

      <ProjectBarEntry/>
      <ProjectBarEntry/>
      <ProjectBarEntry/>
      <ProjectBarEntry/>
      <ProjectBarEntry/>

      <div style={styles.addServer}>
        <i className="material-icons" style={styles.icon}>add_circle</i>
        add new Server
      </div>
    </div>;
  }
}

export default ProjectBar;

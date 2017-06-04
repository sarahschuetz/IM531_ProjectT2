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

@Radium
class ProjectBarEntry extends React.Component {

  render() {
    return <div style={styles.container}>
      <div>
        <i className="material-icons" style={styles.icon}>power_settings_new</i>
        Server 1
      </div>
    </div>;
  }
}

export default ProjectBarEntry;

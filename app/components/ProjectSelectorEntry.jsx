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

class ProjectItem extends React.Component {


  render() {
    return <div style={styles.container}>
            <div><i className="material-icons" style={styles.icon}>delete_forever</i></div>
        </div>;
  }
}

export default ProjectItem;

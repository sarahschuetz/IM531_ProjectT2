import React from 'react';
import PropTypes from 'prop-types';
import Theme from './../theme';

const size = '20px';

const styles = {
  container: {
    width: size,
    height: `${Theme.sizes.PROJECT_ICON_BAR_HEIGHT}px`,
    padding: '5px 0',
    marginRight: '10px',
    color: Theme.colors.FONT_DEFAULT,
    float: 'right',
  },
  icon: {
    fontSize: size,
  },
};

class ProjectIcon extends React.Component {

  static propTypes = {
    icon: PropTypes.string,
  };

  render() {
    return <div style={styles.container}>
      <i className="material-icons" style={styles.icon}>{this.props.icon}</i>
    </div>;
  }
}

export default ProjectIcon;

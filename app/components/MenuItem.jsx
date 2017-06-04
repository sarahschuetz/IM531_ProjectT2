import React from 'react';
import PropTypes from 'prop-types';
import Theme from './../theme';

const styles = {
  container: {
    width: '100%',
    height: `${Theme.sizes.MENU_ITEM_HEIGHT}px`,
    float: 'left',
    padding: '11px',
    marginBottom: '15px',
  },
  icon: {
    fontSize: '30px',
    color: Theme.colors.EDON_BLUE_LIGHT,
  },
};

class MenuBar extends React.Component {

  static propTypes = {
    icon: PropTypes.string,
  };

  render() {
    return <div style={styles.container}>
      <div><i className="material-icons" style={styles.icon}>{this.props.icon}</i></div>
    </div>;
  }
}

export default MenuBar;

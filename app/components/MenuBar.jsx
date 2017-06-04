import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo.jsx';
import Theme from './../theme';

const styles = {
  container: {
    width: `${Theme.sizes.MENU_BAR_WIDTH}px`,
    padding: '5px',
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px)`,
    backgroundColor: Theme.colors.WHITE,
    float: 'left',
  },
};

class MenuBar extends React.Component {

  static propTypes = {
    children: PropTypes.array,
  };

  render() {
    return <div style={styles.container}>
      <Logo />
      {this.props.children}
    </div>;
  }
}

export default MenuBar;

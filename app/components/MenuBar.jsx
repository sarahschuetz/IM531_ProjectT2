import React from 'react';

import Logo from './Logo.jsx';
import MenuItem from './MenuItem.jsx';
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

  render() {
    return <div style={styles.container}>
      <Logo />
      <MenuItem icon="code" />
      <MenuItem icon="error" />
      <MenuItem icon="settings" />
    </div>;
  }
}

export default MenuBar;

import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    backgroundColor: Theme.colors.BACKGROUND,
    width: '100%',
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT + Theme.sizes.HEADER_HEIGHT + Theme.sizes.PROJECT_ICON_BAR_HEIGHT}px)`,
    padding: '16px',
    fontFamily: '"Montserrat", sans-serif',
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    fontSize: '14px',
    letterSpacing: '0.5px',
  },
};

class ServerWindow extends React.Component {

  render() {
    return <div style={styles.container}>
    </div>;
  }
}

export default ServerWindow;

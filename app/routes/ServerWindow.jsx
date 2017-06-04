import React from 'react';
import Theme from './../theme';
import Console from './../components/Console.jsx';
import TextInput from './../components/TextInput.jsx';

const styles = {
  container: {
    backgroundColor: Theme.colors.BACKGROUND,
    width: `calc(100% - ${Theme.sizes.PROJECT_BAR_WIDTH + Theme.sizes.MENU_BAR_WIDTH}px)`,
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT + Theme.sizes.HEADER_HEIGHT + Theme.sizes.PROJECT_ICON_BAR_HEIGHT}px)`,
    padding: '16px',
    fontFamily: '"Montserrat", sans-serif',
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    fontSize: '14px',
    letterSpacing: '0.5px',
    float: 'right',
    position: 'relative',
  },
};

class ServerWindow extends React.Component {

  render() {
    return <div style={styles.container}>
      <TextInput label="Command" placeholder="npm start" />
      <Console />
    </div>;
  }
}

export default ServerWindow;

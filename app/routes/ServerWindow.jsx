import React from 'react';
import Radium from 'radium';
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
  settings: {
    position: 'relative',
    height: '164px',
    width: '100%',
  },
  input: {
    position: 'absolute',
    width: '100%',
    bottom: '16px',
  },
  icon: {
    fontSize: '60px',
    position: 'absolute',
    right: '0px',
    ':hover': {
      cursor: 'pointer',
      color: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    },
  },
};

@Radium
class ServerWindow extends React.Component {

  render() {
    return <div style={styles.container}>
      <div style={styles.settings}>
        <i className="material-icons" style={styles.icon}>power_settings_new</i>
        <div style={styles.input}>
          <TextInput label="Command" placeholder="npm start" />
        </div>
      </div>
      <Console />
    </div>;
  }
}

export default ServerWindow;

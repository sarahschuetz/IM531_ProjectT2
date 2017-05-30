import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    backgroundColor: Theme.colors.EDON_BLUE,
    width: '100%',
    height: `${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px`,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    padding: '2px',
    borderBottom: `solid 1px ${Theme.colors.EDON_BLUE_LIGHT}`,
    clear: 'both',
  },
  appName: {
    color: Theme.colors.WHITE,
    fontSize: '12px',
    float: 'left',
    margin: '0 15px',
    fontWeight: 500,
    letterSpacing: '1px',
  },
  infoLeft: {
    color: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    fontSize: '12px',
    float: 'left',
    margin: '0 15px',
  },
  infoRight: {
    color: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    fontSize: '12px',
    float: 'right',
    margin: '0 15px',
  },
  bold: {
    fontWeight: 400,
    letterSpacing: 1.1,
    color: Theme.colors.WHITE,
  },
};

class SystemBarBottom extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      version: {
        node: process.versions.node,
      },
      runningServers: 7,
    };
  }

  render() {
    return <div style={styles.container}>
      <div style={styles.appName}>EDON</div>
      <div style={styles.infoLeft}>
        node version
        <span style={styles.bold}> {this.state.version.node}</span>
      </div>
      <div style={styles.infoRight}>
        <span style={styles.bold}>{this.state.runningServers} </span>
        running server
      </div>
    </div>;
  }
}

export default SystemBarBottom;

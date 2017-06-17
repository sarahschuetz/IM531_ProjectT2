import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Theme from './../theme';
import Console from './../components/Console.jsx';
import TextInput from './../components/TextInput.jsx';
import { setCurrentProjectIndex, setProjectRootPath } from './../store/actions/project';

const styles = {
  container: {
    backgroundColor: Theme.colors.BACKGROUND,
    width: `calc(100% - ${Theme.sizes.MENU_BAR_WIDTH}px)`,
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px)`,
    padding: '16px',
    fontFamily: '"Montserrat", sans-serif',
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    fontSize: '14px',
    letterSpacing: '0.5px',
    float: 'right',
    position: 'relative',
  },
  h1: {
    fontWeight: 300,
    fontSize: '20px',
    float: 'left',
  },
  p: {
    clear: 'both',
    fontWeight: 200,
    fontSize: '14px',
    width: '320px',
    float: 'left',
  },
  icon: {
    fontSize: '60px',
    position: 'absolute',
    right: '16px',
    ':hover': {
      cursor: 'pointer',
      color: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    },
  },
  input: {
    clear: 'both',
  },
};

@connect(() => ({}))
@Radium
class StaticWebserver extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      server: {

      },
    };
  }

  componentWillMount() {
    this.props.dispatch(setCurrentProjectIndex(0));
  }

  render() {
    let iconStyle = { ...styles.icon };
    if (this.state.server.isRunning) {
      iconStyle = { ...iconStyle, color: Theme.colors.EDON_BLUE_LIGHT };
    }

    return <div style={styles.container}>
      <h1 style={styles.h1}>Start a Temporary Static Webserver</h1>
      <p style={styles.p}>This option starts a static file server showing
                          the given directory on port ...</p>
      <i className="material-icons" style={iconStyle} key="server" onClick={this.toggleServer}>power_settings_new</i>
      <div style={styles.input}>
        <TextInput label="server directory"
                   placeholder="directory/to/serve"
                   backgroundLight={false}
                   icon='folder'
                   iconClickHandler={this.openFolder}
                   handleChange={this.handleChange} />
      </div>
      <div>{this.state.errorMessage}</div>
      <Console server={this.state.server}/>
    </div>;
  }
}

export default StaticWebserver;

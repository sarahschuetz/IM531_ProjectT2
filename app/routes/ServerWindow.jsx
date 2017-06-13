import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import _ from 'underscore';
import Theme from './../theme';
import Console from './../components/Console.jsx';
import TextInput from './../components/TextInput.jsx';
import { setCommand } from './../store/actions/server';

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

@connect(store => ({
  serverlist: store.server.list,
  server: store.server.list[store.server.currentServerIndex],
  fileStore: store.server.fileStore,
}))
@Radium
class ServerWindow extends React.Component {

  static propTypes = {
    serverlist: PropTypes.array,
    server: PropTypes.object,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.saveChange = _.debounce(this.saveChange, 2000);
  }

  handleChange(event) {
    this.props.dispatch(setCommand(event.target.value));
    this.saveChange();
  }

  saveChange() {
    this.props.fileStore.set('list', this.props.serverlist);
  }

  render() {
    if (this.props.server) {
      const server = this.props.server.command;

      return <div style={styles.container}>
        <div style={styles.settings}>
          <i className="material-icons" style={styles.icon}>power_settings_new</i>
          <div style={styles.input}>
            <TextInput label="Command"
                       placeholder="npm start"
                       value={server}
                       handleChange={this.handleChange} />
          </div>
        </div>
        <Console />
      </div>;
    }
    return <div style={styles.container}></div>;
  }
}

export default ServerWindow;

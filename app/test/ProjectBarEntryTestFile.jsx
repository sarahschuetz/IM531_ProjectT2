import Radium from 'radium';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Theme from './../theme';
import { setCurrentServerIndex } from './../store/actions/server';

const styles = {
  container: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: '50px',
    padding: '17px 20px',
    color: Theme.colors.WHITE,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    fontSize: '14px',
    ':hover': {
      backgroundColor: Theme.colors.EDON_BLUE_LIGHT,
    },
  },
  icon: {
    float: 'left',
    marginRight: '10px',
    fontSize: '22px',
    marginTop: '-2px',
  },
  button: {
    float: 'left',
    display: 'block',
    border: 0,
    background: 'transparent',
    color: Theme.colors.FONT_DEFAULT,
    outline: 'none',
    cursor: 'pointer',
  },
};

const mapStateToProps = state => ({
  currentServerIndex: state.currentServerIndex,
  server: state.list,
  fileStore: state.fileStore,
});

@Radium
class ProjectBarEntry extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    currentServerIndex: PropTypes.number,
    server: PropTypes.array,
    fileStore: PropTypes.object,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isPowerOn: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.selectCurrentServer = this.selectCurrentServer.bind(this);
  }

  onButtonClick() {
    if (!this.state.isPowerOn) {
      this.setState({
        isPowerOn: true,
      });
    } else {
      this.setState({
        isPowerOn: false,
      });
    }
  }

  selectCurrentServer() {
    let index = 0;
    this.props.server.forEach((server) => {
      if (server.id === this.props.id) {
        this.props.dispatch(setCurrentServerIndex(index));
      }
      index += 1;
    });
  }

  getContainerStyle() {
    if (this.props.currentServerIndex >= 0 &&
            this.props.server[this.props.currentServerIndex].id === this.props.id) {
      return {
        ...styles.container,
        backgroundColor: Theme.colors.EDON_BLUE_LIGHT,
      };
    }
    return styles.container;
  }

  render() {
    return <div style={this.getContainerStyle()}
                    key={this.props.id}
                    onClick={this.selectCurrentServer}>
            <div>
                <button style={styles.button} onClick={this.onButtonClick}><i className="material-icons" style={styles.icon}>
                    {!this.state.isPowerOn ? 'power_settings_new' : 'play_arrow'}
                </i>
                </button>
                {this.props.name}
            </div>
        </div>;
  }
}

export default connect(mapStateToProps)(ProjectBarEntry);

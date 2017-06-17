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
    cursor: 'pointer',
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
  activeCircle: {
    height: '7px',
    width: '7px',
    borderRadius: '5px',
    float: 'left',
    marginTop: '5px',
    marginRight: '10px',
  },
};

@connect(store => ({
  currentServerIndex: store.server.currentServerIndex,
  serverList: store.server.list,
  fileStore: store.server.fileStore,
}))
@Radium
class ProjectBarEntry extends React.Component {

  static propTypes = {
    server: PropTypes.object.isRequired,
    currentServerIndex: PropTypes.number,
    serverList: PropTypes.array,
    fileStore: PropTypes.object,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.selectCurrentServer = this.selectCurrentServer.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  selectCurrentServer() {
    let index = 0;
    this.props.serverList.forEach((server) => {
      if (server.id === this.props.server.id) {
        this.props.dispatch(setCurrentServerIndex(index));
      }
      index += 1;
    });
  }

  getContainerStyle() {
    if (this.props.currentServerIndex > 0 &&
        this.props.serverList[this.props.currentServerIndex].id === this.props.server.id) {
      return {
        ...styles.container,
        backgroundColor: Theme.colors.EDON_BLUE_LIGHT,
      };
    }
    return styles.container;
  }

  isActive() {
    return this.props.server.isRunning;
  }

  render() {
    let activeCircleStyle = { ...styles.activeCircle };
    if (this.isActive()) {
      activeCircleStyle = { ...activeCircleStyle, backgroundColor: Theme.colors.EDON_BLUE };
    }

    return <div style={this.getContainerStyle()}
                key={this.props.server.id}
                onClick={this.selectCurrentServer}>
      <div>
          <div style={ activeCircleStyle }></div>
          <i className="material-icons" style={styles.icon}></i>
        {this.props.server.name}
      </div>
    </div>;
  }
}

export default ProjectBarEntry;

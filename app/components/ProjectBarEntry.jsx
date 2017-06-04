import Radium from 'radium';
import React from 'react';
import PropTypes from 'prop-types';
import Theme from './../theme';

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

@Radium
class ProjectBarEntry extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isPowerOn: false,
      serverNumb: 0,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  count(value) {
    this.setState({
      serverNumb: value,
    });
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

  render() {
    return <div style={styles.container} key={this.props.id}>
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

export default ProjectBarEntry;

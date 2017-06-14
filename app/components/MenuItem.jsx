import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import Theme from './../theme';

const styles = {
  container: {
    width: '100%',
    height: `${Theme.sizes.MENU_ITEM_HEIGHT}px`,
    float: 'left',
    padding: '11px',
    marginBottom: '15px',
    textDecoration: 'none',
  },
  icon: {
    fontSize: '30px',
    color: Theme.colors.EDON_BLUE,
  },
  icon2: {
    fontSize: '30px',
    color: Theme.colors.EDON_BLUE_LIGHT,

  },
};
@Radium
class MenuBar extends React.Component {

  static propTypes = {
    icon: PropTypes.string,
    active: PropTypes.bool,
  };


  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.active,
    };
  }

  render() {
    return <div style={styles.container}>
      <div><i className="material-icons" style={!this.props.active ? styles.icon2 : styles.icon} onClick={this.onButtonClick}>{this.props.icon}</i></div>
    </div>;
  }
}

export default MenuBar;

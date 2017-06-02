import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    backgroundColor: Theme.colors.EDON_BLUE,
    width: '100%',
    height: `${Theme.sizes.HEADER_HEIGHT}px`,
    padding: '16px',
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: 300,
    fontSize: '14px',
    letterSpacing: '0.5px',
  },
  icon: {
    float: 'right',
  },
  drop: {
    position: 'outside',
    backgroundColor: Theme.colors.WHITE,
    width: '100%',
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px)`,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    color: Theme.colors.WHITE,
  },
  dropIn: {
    position: 'absolute',
    backgroundColor: Theme.colors.WHITE,
    width: '100%',
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px)`,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    color: Theme.colors.WHITE,
  },
  button: {
    float: 'right',
    top: '0px',
    display: 'block',
    marginBottom: '20px',
    backgroundColor: Theme.colors.BACKGROUND,
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: '200',
    outline: false,
    cursor: 'pointer',
  },

};

class ProjectSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeIn: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    if (!this.state.fadeIn) {
      this.setState({
        fadeIn: true,
      });
    } else {
      this.setState({
        fadeIn: false,
      });
    }
  }


  render() {
    return <div style={styles.container}>
          <div><img src="" /></div>
          <div>Select Project <button onClick={this.onButtonClick} style={styles.button}> <i className="material-icons" style={styles.icon}>arrow_drop_down</i></button></div>
        {this.state.fadeIn ? <div style={styles.dropIn}></div> : null}
        {!this.state.fadeIn ? <div style ={styles.drop}></div> : null}
        </div>;
  }


}

export default ProjectSelector;

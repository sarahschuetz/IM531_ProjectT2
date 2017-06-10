import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    backgroundColor: Theme.colors.EDON_BLUE,
    width: '100%',
    height: `${Theme.sizes.HEADER_HEIGHT}px`,
    // padding: '16px',
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
    display: 'none',
  },
  dropIn: {
    position: 'absolute',
    backgroundColor: Theme.colors.WHITE,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    color: Theme.colors.WHITE,
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: `calc(90% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px)`,
    fontSize: '14px',
  },
  addIcon: {
    float: 'left',
    marginRight: '5px',
    fontSize: '16px',
  },
  addProj: {
    fontSize: '12px',
    color: Theme.colors.EDON_BLUE,
    margin: '0 auto',
    paddingTop: '25px',
    width: '115px',
    cursor: 'pointer',
  },
  button: {
    float: 'right',
    display: 'block',
    border: 0,
    background: 'transparent',
    color: Theme.colors.FONT_DEFAULT,
    cursor: 'pointer',
    outline: 'none',
    // margin: '16px',
  },
  fontPad: {
    padding: '16px',
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
        <div style={styles.fontPad}>Select Project<button onClick={this.onButtonClick} style={styles.button}> <i className="material-icons" style={styles.icon}>arrow_drop_down</i></button></div>
        {this.state.fadeIn ? <div style={styles.dropIn}><div style={styles.addProj}><i className="material-icons" style={styles.addIcon}>add_circle</i>
          add Project</div></div> : <div style ={styles.drop}></div>}
        </div>;
  }


}

export default ProjectSelector;

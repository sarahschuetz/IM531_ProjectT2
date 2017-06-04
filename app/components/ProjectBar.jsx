import React from 'react';

import ProjectBarEntry from './ProjectBarEntry.jsx';
import ProjectIconBar from './ProjectIconBar.jsx';
import ProjectSelector from './ProjectSelector.jsx';
import Theme from './../theme';

let value = 0;

const styles = {
  container: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: `calc(100% - ${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px)`,
    backgroundColor: Theme.colors.EDON_BLUE_ULTRA_LIGHT,
    float: 'left',
    color: Theme.colors.WHITE,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    fontSize: '14px',
  },
  addServer: {
    fontSize: '12px',
    color: Theme.colors.EDON_BLUE,
    margin: '0 auto',
    paddingTop: '25px',
    width: '115px',
  },
  icon: {
    float: 'left',
    marginRight: '5px',
    fontSize: '16px',
  },
  button: {
    display: 'inline-block',
    border: 0,
    background: 'transparent',
    color: Theme.colors.FONT_DEFAULT,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    outline: 'none',
    cursor: 'pointer',
  },
};

class ProjectBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { entryList: [] };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    value += 1;
    this.refs.child.count(value);
    const entryList = this.state.entryList;
    this.setState({
      entryList: entryList.concat(<ProjectBarEntry key={entryList.length}/>),
    });
  }


  render() {
    return <div style={styles.container}>
      <ProjectSelector/>
      <ProjectIconBar/>
      <ProjectBarEntry ref="child"/>
      {this.state.entryList.map(input => input)}
      <button onClick={this.onButtonClick} style={styles.button}>
      <div style={styles.addServer}>
       <i className="material-icons" style={styles.icon}>add_circle</i>
        add new Server
      </div>
      </button>
    </div>;
  }
}

export default ProjectBar;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    backgroundColor: Theme.colors.EDON_BLUE_LIGHT,
    fontFamily: Theme.fonts.MAIN_FONT_FAMILY,
    color: Theme.colors.EDON_BLUE_LIGHT,
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: `calc(100% - (${Theme.sizes.SYSTEM_BAR_BOTTOM_HEIGHT}px + ${Theme.sizes.HEADER_HEIGHT}px)`,
    fontSize: '14px',
  },
  addIcon: {
    float: 'left',
    marginRight: '5px',
    fontSize: '16px',
  },
  scroll: {
    width: `${Theme.sizes.PROJECT_BAR_WIDTH}px`,
    height: `calc(100% - ${Theme.sizes.HEADER_HEIGHT + Theme.sizes.PROJECT_ICON_BAR_HEIGHT}px)`,
    overflowY: 'auto',
    paddingBottom: '100px',
    paddingTop: '40px',
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

@connect(store => ({
  currentProjectIndex: store.project.currentProjectIndex,
  project: store.project.list,
  fileStore: store.project.fileStore,
}))
class ProjectSelector extends React.Component {

  static propTypes = {
    currentProjectIndex: PropTypes.number,
    dispatch: PropTypes.func,
    fileStore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      fadeIn: false,
      unsaved: false,
    };
    this.addProject = this.addProject.bind(this);
    // this.saveNewProject = this.saveNewProject.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.saveChange = this.saveChange.bind(this);
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

  addProject() {
    if (!this.state.newProject) {
      this.setState({
        nameInput: '',
        newProject: true,
      });
    }
  }


  render() {
    let inputField;
    if (this.state.newProject) {
      inputField = <input type="text"
                              style={styles.input}
                              maxLength="15"
                              placeholder="server name"
                              onBlur={this.saveNewProject}
                              onChange={this.handleChange}
                              onKeyDown={this.saveChange}
                              autoFocus />;
    }
    return <div style={styles.container}>

          <div><img src="" /></div>

        <div style={styles.fontPad}>Select Project
        <button onClick={this.onButtonClick} style={styles.button}>
        <i className="material-icons" style={styles.icon}>arrow_drop_down</i>
        </button></div>

        {this.state.fadeIn ? <div style={styles.dropIn}>

          <div style={styles.scroll}>

          <div>{inputField}</div>

          <div style={styles.addProj} onClick={this.addProject}><i className="material-icons" style={styles.addIcon}>add_circle</i>
            add Project</div></div></div>

          : <div style ={styles.drop}></div>}

          </div>;
  }


}

export default ProjectSelector;

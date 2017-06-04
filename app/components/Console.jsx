import React from 'react';
import Theme from './../theme';
import ConsoleMessage from './ConsoleMessage.jsx';

const spawn = require('child_process').spawn;

const styles = {
  container: {
    backgroundColor: Theme.colors.console.BACKGROUND,
    width: 'calc(100% - 32px)',
    height: 'calc(100% - 200px)',
    padding: '16px',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'absolute',
    bottom: '16px',
    // opacity: '0.3',x
  },
  button: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    display: 'block',
    marginBottom: '16px',
    borderRadius: 'none',
    border: 'none',
    backgroundColor: Theme.colors.BACKGROUND,
    color: Theme.colors.FONT_DEFAULT,
    fontWeight: '200',
    outline: false,
    cursor: 'pointer',
  },
  icon: {
    fontSize: '10px',
    position: 'relative',
    top: '1px',
  },
};

class Console extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      command: spawn('webpack', ['--watch'], { shell: true }),
      messages: [],
      consoleIsEmpty: true,
    };

    /* this.state.command.stderr.on('data', (data) => {
      this.setState(state => ({
        messages: state.messages.concat(<ConsoleMessage data={`${data}`}
                                                  key={this.state.messages.length}
                                                  color={Theme.colors.console.ERROR_COLOR} />),
      }));
    });

    this.state.command.on('close', (code) => {
      this.setState(state => ({
        messages: state.messages.concat(<ConsoleMessage data={`${code}`}
                                                  key={this.state.messages.length}
                                                  color={Theme.colors.console.ERROR_COLOR} />),
      }));
      // console.log(`child process exited with code ${code}`);
    });*/
  }

  componentWillMount() {
    this.state.command.stdout.on('data', (data) => {
      this.setState(state => ({
        messages: state.messages.concat(<ConsoleMessage data={`${data}`}
                                                  key={this.state.messages.length}
                                                  color={Theme.colors.console.INFO_COLOR} />),
        consoleIsEmpty: false,
      }));
    });
  }

  componentWillUnmount() {
    this.state.command.stdout.removeAllListeners();
  }

  clearConsole = () => {
    this.setState({
      messages: [],
      consoleIsEmpty: true,
    });
  }

  render() {
    return <div style={styles.container}>
      {!this.state.consoleIsEmpty && <button onClick={this.clearConsole} style={styles.button}>clear <i className="material-icons" style={styles.icon}>clear</i></button>}
      { this.state.messages }
    </div>;
  }
}

export default Console;

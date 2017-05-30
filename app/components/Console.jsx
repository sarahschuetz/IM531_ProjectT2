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
    opacity: '0.3',
  },
};

class Console extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      command: spawn('webpack', ['--watch']),
      messages: [],
    };

    this.state.command.stdout.on('data', (data) => {
      console.log('TEST');
      this.setState(state => ({
        messages: state.messages.concat(<ConsoleMessage data={`${data}`}
                                                  key={this.state.messages.length}
                                                  color={Theme.colors.console.INFO_COLOR} />),
      }));
    });

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

  render() {
    return <div style={styles.container}>
    { this.state.messages }

    </div>;
  }
}

export default Console;

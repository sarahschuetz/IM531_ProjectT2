import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Theme from './../theme';
import ConsoleMessage from './ConsoleMessage.jsx';

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

@connect(store => ({
  processList: store.process.list,
}))
class Console extends React.Component {

  static propTypes = {
    server: PropTypes.object.isRequired,
    processList: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
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

  // messages: state.messages.concat(),
  //       consoleIsEmpty: false,

  componentWillUnmount() {
    // this.state.command.stdout.removeAllListeners();
  }

  clearConsole = () => {
    this.setState({
      consoleIsEmpty: true,
    });
  }

  render() {
    const currentProcess = this.props.processList.filter(
      process => process.pid === this.props.server.processPID)[0];

    return <div style={styles.container}>
      {!this.state.consoleIsEmpty && <button onClick={this.clearConsole} style={styles.button}>clear <i className="material-icons" style={styles.icon}>clear</i></button>}
      {currentProcess ? currentProcess.messages.map((message, index) => (
            <ConsoleMessage data={`${message}`}
                            key={index}
                            color={Theme.colors.console.INFO_COLOR} />
        )) : ''}
    </div>;
  }
}

export default Console;

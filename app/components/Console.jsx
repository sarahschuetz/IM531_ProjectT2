import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Theme from './../theme';
import ConsoleMessage from './ConsoleMessage.jsx';
import { clearMessages } from './../store/actions/process';

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
  autoScrollHelper: {
    float: 'left',
    clear: 'both',
  }
};

@connect(store => ({
  processList: store.process.list,
}))
class Console extends React.Component {

  static propTypes = {
    server: PropTypes.object.isRequired,
    processList: PropTypes.array,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      consoleIsEmpty: true,
    };
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidUpdate(prevProps) {
    this.scrollToBottom();
    if (this.props.processList !== prevProps.processList) {
      if (this.props.server.isRunning) {
        const currentProcess = this.props.processList.filter(
          process => process.pid === this.props.server.processPID,
        )[0];
        const empty = (currentProcess.messages.length === 0);
        this.setState({ consoleIsEmpty: empty });
      } else {
        this.setState({ consoleIsEmpty: true });
      }
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }


  clearConsole = (pid) => {
    if (this.props.server.isRunning) {
      this.props.dispatch(clearMessages(pid));
    }
  }

  render() {
    const currentProcess = this.props.processList.filter(
      process => process.pid === this.props.server.processPID)[0];

    return <div style={styles.container}>
      {!this.state.consoleIsEmpty && <button onClick={() => this.clearConsole(currentProcess.pid)} style={styles.button}>clear <i className="material-icons" style={styles.icon}>clear</i></button>}
      {currentProcess ? currentProcess.messages.map((message, index) => (
            <ConsoleMessage data={`${message}`}
                            key={index}
                            color={Theme.colors.console.INFO_COLOR} />
        )) : ''}
      <div style={styles.autoScrollHelper}
           ref={(el) => { this.messagesEnd = el; }} />
    </div>;
  }
}

export default Console;

import PropTypes from 'prop-types';
import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    backgroundColor: Theme.colors.console.BACKGROUND,
    width: '100%',
    fontFamily: Theme.fonts.MONO_SPACED_FONT_FAMILY,
    fontWeight: 300,
    fontSize: '12px',
    letterSpacing: '0.5px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
};

class ConsoleMessage extends React.Component {

  static propTypes = {
    data: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };

  render() {
    return <code style={{ ...styles.container, color: this.props.color }}>
        {this.props.data}
    </code>;
  }
}

export default ConsoleMessage;

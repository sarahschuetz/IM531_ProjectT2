import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import Theme from './../theme';

const styles = {
  container: {
    width: '100%',
    height: '13px',
  },
  label: {
    display: 'block',
    width: '100%',
    maxWidth: '700px',
  },
  labelText: {
    fontSize: '12px',
    paddingTop: '8px',
    display: 'inline-block',
    fontFamily: '"Montserrat", sans-serif',
  },
  labelTextDark: {
    fontSize: '12px',
    paddingTop: '8px',
    display: 'inline-block',
    color: Theme.colors.EDON_BLUE,
    fontWeight: 500,
    fontFamily: '"Montserrat", sans-serif',
  },
  input: {
    width: 'calc(100% - 100px)',
    border: 'none',
    padding: '8px',
    float: 'right',
    ':focus': {
      outline: 'none',
    },
  },
  icon: {
    float: 'right',
    marginLeft: '10px',
    marginTop: '2px',
    color: Theme.colors.EDON_BLUE,
    ':hover': {
      cursor: 'pointer',
    },
  },
};

@Radium
class TextInput extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    backgroundLight: PropTypes.bool,
    icon: PropTypes.string,
    iconClickHandler: PropTypes.func,
    value: PropTypes.string,
    handleChange: PropTypes.func,
  };

  getInputStyle() {
    let inputStyle = styles.input;
    if (this.props.backgroundLight) {
      inputStyle = {
        ...inputStyle,
        border: `1px solid ${Theme.colors.EDON_BLUE_LIGHT}`,
      };
    }

    if (this.props.icon) {
      inputStyle.width = 'calc(100% - 100px - 24px - 10px)'; // 100% - label - icon - icon margin
    }

    return inputStyle;
  }

  render() {
    let icon;
    if (this.props.icon) {
      icon = <i className="material-icons"
                style={styles.icon}
                onClick={this.props.iconClickHandler}
                key={this.props.icon}>{this.props.icon}</i>;
    }

    return <div style={styles.container}>
      <label style={styles.label}>
        <span style={this.props.backgroundLight ? styles.labelTextDark : styles.labelText}>
          {this.props.label}:
        </span>
        {icon}
        <input type="text"
               style={this.getInputStyle()}
               placeholder={this.props.placeholder}
               value={this.props.value}
               onChange={this.props.handleChange} />
      </label>
    </div>;
  }
}

export default TextInput;

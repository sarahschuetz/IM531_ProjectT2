import React from 'react';
import Theme from './../theme';

const styles = {
  container: {
    width: '100%',
    height: `${Theme.sizes.MENU_ITEM_HEIGHT}px`,
    marginTop: '10px',
    marginBottom: '50px',
  },
  image: {
    width: '100%',
  },
};

class Logo extends React.Component {

  render() {
    return <div style={styles.container}>
      <img src="./../public/images/logo.png" style={styles.image} />
    </div>;
  }
}

export default Logo;

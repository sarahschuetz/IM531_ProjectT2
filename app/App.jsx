import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div>
      <h1>Hello World from React and Electron!</h1>
      We are using node <script>document.write(process.versions.node)</script>,
      Chrome <script>document.write(process.versions.chrome)</script>,
      and Electron <script>document.write(process.versions.electron)</script>.
    </div>;
  }
}

export default App;

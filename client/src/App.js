import './App.css';
import React from "react";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state({"isDataLoaded": false, "message" : ""})
  }

  componentDidMount() {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data)=> {
        this.setState({"isDataLoaded": true, message: data});
      })

  }
  render() {
    console.log("I am here");
    return (
    <div className="App">
      <p>"lo"</p>
    </div>
    )
  };
}

export default App;

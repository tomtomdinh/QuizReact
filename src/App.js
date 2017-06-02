import React, {Component} from 'react';
import './App.css';
import {About} from './About';
import {AddQ} from './AddQ';
import {ShowAll} from './ShowAll';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: "about"
    };
  }

  aboutHandler() {
    this.setState({mode: "about"});
    console.log("about pressed");
  }
  showAllHandler() {
    this.setState({mode: "showAll"});
    console.log("show pressed");
  }
  addQHandler() {
    this.setState({mode: "addQ"});
    console.log("add q pressed");
  }

  render() {
    let contents;
    switch (this.state.mode) {
      case "about":
        contents = <About/>;
        break;
      case "showAll":
        contents = <ShowAll/>;
        break;
      case "addQ":
        contents = <AddQ/>;
        break;
      default:
        contents = null;
        break;
    }

    let buttonBar = <div>
      <button onClick ={this.aboutHandler.bind(this)}>About</button>
      <button onClick={this.showAllHandler.bind(this)}>Show</button>
      <button onClick={this.addQHandler.bind(this)}>Add Question</button>
    </div>;

    return (
      <div>
        <h1>Quizzy 2000 is almost here</h1>
        <p>Stuff to come...</p>
        {buttonBar}
        {contents}
      </div>
    );
  }
}

export default App;

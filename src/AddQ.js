import React, {Component} from 'react';

const numAlpha = ["a", "b", "c", "d", "e", "f"];

function ChoiceLine(props) {

  return <div >
    <label>{numAlpha[props.i]}.
    </label>
    <input type="text" placeholder="Type Choice Here" value={props.choice} onChange={props.choiceHandler}/>
    <input type="radio" name="Choices" onChange={props.answerHandler}/>
    <label>
      Is answer?</label>
  </div>;
}

class AddQ extends Component {

  constructor(props) {
    super(props);
    /* Set up state here */
    this.state = {
      question: "",
      choices: [
        "", ""
      ],
      answer: 0
    };

    this.defaultState = this.state
  }

  resetState() {
    this.setState(this.defaultState);
  }

  addChoice() {
    console.log("addChoice");
    this.setState({
      choices: this.state.choices.concat([""])
    });

  }

  answerHandler(i, evt) {
    console.log(i);
    console.log(evt.currentTarget.value);
    this.setState({answer: i});
  }

  questionHandler(evt) {
    this.setState({question: evt.target.value});
  }

  choiceHandler(i, evt) {
    let tempChoices = this.state.choices.slice();
    // Update copy, not original
    tempChoices[i] = evt.currentTarget.value;
    this.setState({choices: tempChoices});
  }

submitQ() {
  console.log("submitQ");
  // makes a copy of the object data just as long as it doesn't contain any functions
  let questionData = JSON.parse(JSON.stringify(this.state));
  fetch('/addQ', {
          method: 'POST',
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify({
              question: questionData.question,
              choices : questionData.choices,
              answer : questionData.answer
          })
      }).then(function(response) {
          console.log('Request status code: ', response.statusText, response.status, response.type);
          return response.json();
      });

      this.resetState();
}

  render() {
    let that = this;
    let buttonBar = <div>
      <button onClick={this.addChoice.bind(this)}>Add Choice</button>
      <button onClick={this.submitQ.bind(this)}>Submit Question</button>
    </div>;
    console.log(JSON.stringify(this.state));
    let choiceElements = this.state.choices.map(function(choice, i) {
      return <ChoiceLine key={i} choice={choice} i={i} choiceHandler={that.choiceHandler.bind(that, i)} answerHandler={that.answerHandler.bind(that, i)}/>;
    })

    return <div>
      <h2>New Question</h2>
      {buttonBar}
      <input type="text" placeholder="Type Question Here" value={this.state.question} onChange={this.questionHandler.bind(this)}/>
      {choiceElements}
    </div>;
  }
}

export {AddQ}

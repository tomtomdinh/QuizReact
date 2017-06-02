import React, {Component} from 'react';
// To convert from ints to letters
const numAlpha = ["a", "b", "c", "d", "e", "f"];

/* Stuff we will need to add:

A button bar with two buttons
    <button onClick={Your handler here}>Add Choice</button>
    <button onClick={Another handler}>Submit Question</button>

Create simple handlers that log to the console to initially test these.

To handle the "Add Choice" click we need to set the state with
an updated choices array:
  this.setState({choices: this.state.choices.concat([""])});

where we have used the JavaScript array.concat(...) method.

Text inputs (the question, and choices):

<input type="text" onChange={your change handler}
                    value={this.state.your_thing_here}/>

You will need change handlers...

    question -- questionChange(evt)
    choices -- choiceChange(i, evt)

Radio buttons for answer:
    <input type="radio" name="Choices" value={i} onChange={handler}/>

need a handler for answer:

    answerHandler(evt) {
        console.log(evt.currentTarget.value);
        this.setState({answer: evt.currentTarget.value})
    }

How to update state within an array:
        // Make shallow copy of state.choices with slice():
        let tempChoices = this.state.choices.slice();
        // Update copy, not original
        tempChoices[i] = evt.currentTarget.value;
        this.setState({choices: tempChoices});

*/

/*  My ChoiceLine component renders the input stuff for
    a line of a multiple choice question.
    Properties passed in:
        Current choice state
        Current choice index
        Choice change handler function
        Anwser Change handler function


*/
function ChoiceLine(props) {

  return <div >
    <label>{numAlpha[props.i]}.
    </label>
    <input type="text" placeholder="Insert Choice Here" value={props.choice} onChange={props.choiceHandler}/>
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
    // TODO: add question input below
    return <div>
      <h2>New Question</h2>
      {buttonBar}
      <input type="text" placeholder="Insert Question Here" value={this.state.question} onChange={this.questionHandler.bind(this)}/> {choiceElements}
    </div>;
  }
}

export {AddQ}

// import React, {Component} from 'react';
//
// class AddQ extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       question: '',
//       choices: [],
//       answer: 0
//     };
//   }
//
//   addChoice() {
//     console.log("sup");
//   }
//
//   handleSubmitForm(e) {
//     e.preventDefault();
//     console.log("submitted");
//   }
//
//   handleQuestion(e) {
//     this.setState({question: e.target.value})
//     console.log(this.state.question);
//   }
//
//   render() {
//     let style = {
//       listStyleType: "lower-alpha"
//     };
//
//     let submitForm = <form onSubmit={this.handleSubmitForm.bind(this)}>
//       <button onClick={this.addChoice.bind(this)}>
//         Add Choice</button>
//       <input type="submit" value="Submit"/>
//       <div>
//         <input type="text" placeholder="Insert Question Here" value={this.state.question} onChange={this.handleQuestion.bind(this)}/>
//         <ol style={style}></ol>
//       </div>
//     </form>
//
//     return <div>
//       <h2>New Question</h2>
//       <p>Stuff for Adding questions</p>
//       <div>
//         {submitForm}
//       </div>
//     </div>;
//   }
// }
//
// export {AddQ};

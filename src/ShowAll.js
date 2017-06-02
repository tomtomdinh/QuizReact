import React, {Component} from 'react';

function Question(props) {
  let choiceList = null;
  let listStyle = {
    listStyleType: "lower-alpha"
  };
  if (!props.short) { //
    // Use map to create an array of items
    let items = props.mcq.choices.map(function(choice, i) {
      // Finish this function and use the result
      return <li key={i}>
        {choice}</li>
    });
    choiceList = <ol style={listStyle}>{items}</ol>;
  }
  return <div>
    <p>{props.mcq.question}</p>
    {choiceList}
  </div>;

}

class ShowAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      short: true
    };
  }

  componentDidMount() {
    let that = this;
    console.log("Show All 'did mount'");
    // Always use fetch with full error handling to
    // at least aid debugging.
    fetch('/allQs').then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        let info = `Status code: ${response.status}, ${response.statusText}`;
        console.log(response);
        return Promise.reject(info);
      }
    }).then(function(data) {
      that.setState({questions: data.questions});
    }).catch(function(msg) {
      console.log("Something bad: " + msg);
    });
  }

  changeForm() {
    this.setState({
      short: !this.state.short
    });
    console.log(this.state.short);
  }

  render() {
    let that = this;
    let qs = this.state.questions;
    // Using the Question component with the map function
    // to render a list of components.
    let qElements = qs.map(function(mcq, i) {
      return <Question key={i} short={that.state.short} mcq={mcq}/>;
    })

    // Note that you still need to add a checkbox and handler
    // to update the state.short.
    return <div>
      <h2>All Questions</h2>
      <p>Short or long list of Qs.</p>
      <label>
        <input type="checkbox" checked={this.state.short} onChange={this.changeForm.bind(this)}/>
        Short form
      </label>
      {qElements}
    </div>

  }

  // render() {
  //   let questionPara;
  //
  //   if (this.state.short) {
  //     questionPara = this.state.questions.map(function(mcq, i) {
  //       return <p key={i}>{mcq.question}</p>;
  //     });
  //   } else {
  //     questionPara = this.state.questions.map(function(mcq, i) {
  //
  //       let choices = mcq.choices.map(function(c, index) {
  //         return <li key={index}>
  //           {c}</li>
  //       });
  //       let style = {
  //         listStyleType: "lower-alpha"
  //       };
  //       return <div key={i}>
  //         <p>{mcq.question}</p>
  //         <ol style={style}>
  //           {choices}
  //         </ol>
  //       </div>;
  //     });
  //   }
  //   return <div>
  //     <h2>Show All</h2>
  //     <p>Short or long list of Question's</p>
  //     <label>
  //       <input type="checkbox" checked={this.state.short} onChange={this.changeForm.bind(this)}/>
  //       Short form
  //     </label>
  //     {questionPara}
  //   </div>
  // }
}

export {ShowAll};

import React, {Component} from 'react';

function Question(props) {

  return <div>
    <input type = "checkbox" onChange = {props.selectHandler}/>
    <label>{props.mcq.question}</label>
  </div>;
}

class DeleteQ extends Component {
  constructor(props) {
    super(props);
    this.state = {questions: []};
  }

  selectHandler(i) {
    let tempChoices = this.state.questions.slice();
    tempChoices[i].selected = !tempChoices[i].selected;
    this.setState({questions: tempChoices});
  }

  deleteHandler() {
    console.log("delete handler");
    let deleteSelected = [];
    this.state.questions.map(function(d) {
      if(d.selected) {
        deleteSelected.push(d._id);
      }
    });
    fetch('/deleteQs', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
              deleteSelected
            })
        }).then(function(response) {
            console.log('Request status code: ', response.statusText, response.status, response.type);
            return response.json();
        });
  }
  // TODO: after deleting re render the contents
  componentDidMount() {
    let that = this;
    console.log("Delete Q 'did mount'");
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
      var addSelected = data.questions.map( x=> {
        x.selected = false;
        return x;
      });
      that.setState({questions: addSelected});
    }).catch(function(msg) {
      console.log("Something bad: " + msg);
    });
  }

  render() {
    let that = this;
    let qElements = this.state.questions.map(function(mcq,i) {
      return <Question key = {i} mcq = {mcq} i = {i} selectHandler = {that.selectHandler.bind(that,i)}/>
    })
    return <div>
         <h2>Delete Questions</h2>
         <button onClick = {this.deleteHandler.bind(this)}>Delete Selected</button>
            {qElements}
          </div>
  }

}


export {DeleteQ};

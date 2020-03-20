import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./PollCreator.css";
class PollCreation extends Component {
  state = {};
  render() {
    //console.log(this.props);
    let options = [];
    if (this.props.numOptions > 0) {
      options.push(<br></br>);
    }
    for (let i = 0; i < this.props.numOptions; i++) {
      let lab = "Option " + i;
      options.push(
        <TextField
          id={i + "option"}
          onChange={this.props.onChange}
          label={lab}
          variant="outlined"
        ></TextField>
      );
      options.push(
        <div>
          <br></br>
          <br></br>
        </div>
      );
    }
    return (
      <div id="main">
        <div id="inside">
          <p>Poll Name</p>
          <TextField
            id="name"
            label="Poll Name"
            variant="outlined"
            onChange={this.props.onChange}
          />
          {/* <input id="name" onChange={this.props.onChange}></input> */}
          <p>Number of Options</p>
          <br></br>
          <TextField
            id="numOptions"
            label="Number of Options"
            variant="outlined"
            onChange={this.props.onChange}
          />
          {/* <input id="numOptions" onChange={this.props.onChange}></input> */}
          <br></br>
          {options}
          <br></br>
          {/* <div>
          <input
            type="checkbox"
            id="multipleVotes"
            name="multipleVotes"
            value="Yes"
          />
          <label for="multipleVotes"> Multiple votes allowed</label>
          <br></br>
          <br></br>
          <input type="radio" id="noShowingVotes" name="gender" value="male" />
          <label for="noShowingVotes">Do not show votes</label>
          <br />
          <input
            type="radio"
            id="showVotesAfterVote"
            name="gender"
            value="female"
          />
          <label for="noShowingVotes">
            Show votes to user after they have voted
          </label>
          <br></br>
          <input
            type="radio"
            id="showVoteAtAnyTime"
            name="gender"
            value="female"
          />
          <label for="noShowingVotes">Show votes at anytime</label>
          <br></br>
          <br></br>
        </div> */}
          <Button variant="contained" onClick={this.props.onClick}>
            submit
          </Button>
          <br></br>
          <br></br>
          <div id="meow">
            <TextField
              id="poll"
              label="Poll Number"
              variant="outlined"
              onChange={this.props.onChange}
            />
            {/* <input id="posll" onChange={this.props.onChange}></input> */}
            <Button id="gtp" variant="contained" onClick={this.props.onClic}>
              Go to poll
            </Button>
            <Button
              id="brs"
              variant="contained"
              onClick={this.props.browserOnClick}
            >
              Browse some polls
            </Button>
          </div>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default PollCreation;

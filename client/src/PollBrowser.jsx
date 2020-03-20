import React, { Component } from "react";
import Button from "@material-ui/core/Button";
class PollBrowser extends Component {
  render() {
    let arr = [];
    for (let i = 0; i < this.props.polls.length; i++) {
      //console.log(this.props.polls);
      let poll = this.props.polls[i].poll;
      if (poll.poll !== undefined) {
        poll = poll.poll;
      }
      console.log(poll);
      arr.push(
        <div>
          <p>{poll.name}</p>
          <p>Id: {poll.id}</p>
          <Button
            variant="contained"
            onClick={() => this.props.onClick(poll.id)}
            display="inline"
          >
            Go to Poll
          </Button>
        </div>
      );
    }
    return <div id="main">{arr}</div>;
  }
}

export default PollBrowser;

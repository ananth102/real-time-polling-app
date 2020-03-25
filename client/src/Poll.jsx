import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

//import "./Poll.css";

class Poll extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.autoUpdate(this.props.poll.id);
      console.log("update!");
    }, 5000);
  }
  render() {
    let items = [];
    console.log(this.props.poll);
    for (let i = 0; i < this.props.poll.numOptions; i++) {
      items.push(
        <div id="wo">
          <p>
            {this.props.poll.labels[i]} has been chosen{" "}
            {this.props.poll.chosenCount[i]} times{" "}
          </p>
          <Button
            variant="contained"
            onClick={() => this.props.onClick(this.props.poll, i)}
          >
            {this.props.poll.labels[i]}
          </Button>
        </div>
      );
    }
    items.push(<br></br>);
    return (
      <div id="main">
        <div id="inside">{items}</div>
      </div>
    );
  }
}

export default Poll;

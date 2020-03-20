import React, { Component } from "react";
import Poll from "./Poll";
class CardList extends Component {
  render() {
    return (
      <Poll
        poll={this.props.poll}
        onClick={this.props.click}
        autoUpdate={this.props.autoUpdate}
      ></Poll>
    );
  }
}

export default CardList;

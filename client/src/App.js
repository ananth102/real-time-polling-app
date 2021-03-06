import React, { Component } from "react";
import logo from "./logo.svg";
import CardList from "./CardList";
import "./App.css";
import "./PollCreation";
import PollCreation from "./PollCreation";
import axios from "axios";
import "./PollBrowser";
import PollBrowser from "./PollBrowser";

const PROXY_URL = "";

class App extends Component {
  state = {
    poll: {},
    initPoll: false,
    voted: false,
    voteIndex: -1,
    pollCreatorView: true,
    pollName: "",
    numOptions: 0,
    optionsPollCreator: [],
    pollFormNumber: 0,
    browserView: false,
    pollsBrowserView: [],
    refresh: false
  };

  render() {
    if (this.state.initPoll === false) {
      let poll = this.getPoll(this.state.pollFormNumber);
      console.log(poll);
      this.setState({ poll });
      let initPoll = true;
      this.setState({ initPoll });
    }
    if (this.state.pollCreatorView && !this.state.browserView) {
      return (
        <div>
          <h1 id="title">Real Time Polling App</h1>
          <PollCreation
            onChange={this.onChangePollCreation}
            numOptions={this.state.numOptions}
            onClick={this.onSubmitPollCreator}
            onClic={this.onPollSubmit}
            browserOnClick={this.browserOnClick}
          ></PollCreation>
        </div>
      );
    }
    if (this.state.pollCreatorView && this.state.browserView) {
      if (!this.state.refresh) {
        let brow = axios
          .post(PROXY_URL + "/browsePolls", {
            //range: [0, 1]
          })
          .then(res => {
            brow = res.data;
            let pollsBrowserView = brow;
            let refresh = true;
            this.setState({ pollsBrowserView });
            this.setState({ refresh });
          });
      }

      return (
        <div>
          <h1 id="title">Real Time Polling App {this.state.poll.id}</h1>
          <PollBrowser
            polls={this.state.pollsBrowserView}
            onClick={this.pollTransitionFromBrows}
          />
        </div>
      );
    }
    return (
      <div>
        <h1 id="title">Real Time Polling App {this.state.poll.id}</h1>

        <React.Fragment>
          <CardList
            poll={this.state.poll}
            click={this.onClickPollButton}
            autoUpdate={this.autoUpdate}
          ></CardList>
        </React.Fragment>
      </div>
    );
  }
  getPoll = PolliD => {
    console.log("POST");
    return axios.post(PROXY_URL + "/polls", { id: PolliD }).then(response => {
      console.log("Data", response.data, response.data.poll === undefined);
      if (response.data.poll === undefined) return response.data;
      return response.data.poll;
    });
  };
  createPoll = (PolliD, labels, name) => {
    let chosenCount = [];

    for (let i = 0; i < 2; i++) {
      chosenCount.push(0);
    }
    return {
      name: name,
      id: PolliD,
      labels: labels,
      numOptions: labels.length,
      chosenCount: chosenCount,
      voteOnce: true
    };
  };

  //reee factor
  updateVote = (poll, voted, voteIndex, delta) => {
    console.log("dfsfdsffdsf");
    axios
      .post("/", {
        pollid: poll.id,
        delta: delta
      })
      .then(res => {
        console.log(res);
      });
    this.setState({ poll });
    this.setState({ voted });
    this.setState({ voteIndex });
  };

  onChange = element => {
    let str = element.target.id;
    if (this.state.form[str] != undefined) {
      let form = this.state.form;
      form[str] = element.target.value;
      this.setState({ form });
    }
    //str = str.substring(0, 10);
    console.log(str);
  };

  onChangePollCreation = element => {
    let id = element.target.id;
    let val = element.target.value;
    if (id === "numOptions") {
      if (Number(element.target.value) !== undefined) {
        let numOptions = Number(element.target.value);
        this.setState({ numOptions });
      }
    } else if (id.includes("option")) {
      let pollNum = parseInt(id, 10);
      console.log(pollNum);
      if (pollNum !== undefined) {
        let optionsPollCreator = this.state.optionsPollCreator;
        if (pollNum < this.state.optionsPollCreator.length) {
          optionsPollCreator[pollNum] = val;
        } else {
          let dif = pollNum + 1 - optionsPollCreator;
          for (let i = 0; i < dif; i++) {
            optionsPollCreator.push("");
          }
          optionsPollCreator[pollNum] = val;
        }
        this.setState({ optionsPollCreator });
      }
    } else if (id === "poll") {
      let pollFormNumber = Number(val);
      if (pollFormNumber !== undefined) {
        this.setState({ pollFormNumber });
      }
    } else if (id === "name") {
      let pollName = val;
      this.setState({ pollName });
    }
  };

  onClickPollButton = (polli, updateIndex) => {
    let delta = new Array(polli.chosenCount.length).fill(0);
    if (polli.voteOnce && this.state.voted) {
      if (this.state.voteIndex != updateIndex) {
        ++polli.chosenCount[updateIndex];
        --polli.chosenCount[this.state.voteIndex];
        ++delta[updateIndex];
        --polli[this.state.voteIndex];
        this.updateVote(polli, true, updateIndex, delta);
        return;
      }
      --polli.chosenCount[updateIndex];
      --delta[updateIndex];
      this.updateVote(polli, false, updateIndex, delta);
      return;
    }
    ++polli.chosenCount[updateIndex];
    ++delta[updateIndex];
    this.updateVote(polli, true, updateIndex, delta);
    //console.log(poll);
  };

  onSubmitPollCreator = () => {
    console.log(this.state.optionsPollCreator);
    let pollCreatorView = false;
    let poll = this.createPoll(
      45,
      this.state.optionsPollCreator,
      this.state.pollName
    );
    axios.post("/createPollAPI", poll).then(res => {
      poll = res.data;
      this.setState({ pollCreatorView });
      this.setState({ poll });
    });
    //pushTofirebase and that will return a poll object
  };

  onPollSubmit = () => {
    let pollCreatorView = false;
    axios
      .post(PROXY_URL + "/polls", { id: this.state.pollFormNumber })
      .then(response => {
        console.log("Data", response.data, response.data.poll === undefined);
        this.setState({ pollCreatorView });
        if (response.data.poll === undefined) {
          let poll = response.data;
          this.setState({ poll });
          console.log(poll);
        } else {
          let poll = response.data.poll;
          this.setState({ poll });
          console.log(poll);
        }
      });
  };
  autoUpdate = pollId => {
    axios.post(PROXY_URL + "/polls", { id: pollId }).then(response => {
      if (response.data.poll === undefined) {
        let poll = response.data;
        this.setState({ poll });
      } else {
        let poll = response.data.poll;
        this.setState({ poll });
      }
    });
  };
  pollTransitionFromBrows = number => {
    let pollCreatorView = false;
    let browserView = false;
    axios.post(PROXY_URL + "/polls", { id: number }).then(response => {
      this.setState({ browserView });
      this.setState({ pollCreatorView });
      if (response.data.poll === undefined) {
        let poll = response.data;
        this.setState({ poll });
      } else {
        let poll = response.data.poll;
        this.setState({ poll });
      }
    });
  };

  browserOnClick = () => {
    let browserView = true;
    this.setState({ browserView });
  };
}
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export default App;

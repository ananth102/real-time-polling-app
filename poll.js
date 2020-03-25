//handles the polling operations
//convert into a class maybe
//calls firebase
//add admin later
let firebase = require("firebase/app");
require("firebase/database");

var firebaseConfig = {
  apiKey: "AIzaSyDFuC5Jn-TjxuenQtHXLceNPjUwKrJf7pM",
  authDomain: "poll-doto-io.firebaseapp.com",
  databaseURL: "https://poll-doto-io.firebaseio.com",
  projectId: "poll-doto-io",
  storageBucket: "poll-doto-io.appspot.com",
  messagingSenderId: "181821422501",
  appId: "1:181821422501:web:250231b2636a04172dc64c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let initPollList = initPolls();
let polls = getPollsFromFireBase();
initPollList.then(data => {
  initPollList = data;
});
polls.then(data => {
  polls = data;
});

let vr = {};

//sets data to a value and gets if from firebase

function initPolls() {
  let v = {};
  return database
    .ref("polls/")
    .once("value")
    .then(snapshot => {
      let w = Object.keys(snapshot.val());
      let vals = {};
      for (let i = 0; i < w.length; i++) {
        vals[w[i]] = 1;
      }
      //console.log(.length);
      return vals;
    });
}
function getPollsFromFireBase() {
  let v = {};
  return database
    .ref("polls/")
    .once("value")
    .then(snapshot => {
      return snapshot.val();
    });
}

function createPoll(poll) {
  //retuns a pollId
  //sets poll to that
  //creates a poll id random ig
  //console.log(poll);
  let pollid = Math.floor(Math.random() * 90000);
  while (true) {
    if (initPollList.pollid === undefined) {
      poll.id = pollid;
      break;
    } else {
      pollid = Math.floor(Math.random() * 90000);
    }
  }
  database.ref("polls/" + pollid).set({ poll: poll });
  return poll;
}
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function getPollData(pollid) {
  //console.log(polls[pollid]);
  //console.log(pollid);
  return database
    .ref("polls/" + pollid)
    .once("value")
    .then(snapshot => {
      console.log("ddd", snapshot.val());
      return snapshot.val();
    });

  //console.log("ddsd", poll);
  return polls[pollid];
  //send request to firebase
}

function updatePollDataFireBase(pollid, change) {
  //console.log(polls[pollid]);

  database
    .ref("polls/" + pollid)
    .once("value")
    .then(snapshot => {
      //console.log("ddd", snapshot.val());
      let poll = snapshot.val();
      //console.log("val", poll);
      let votes = poll.poll.chosenCount;
      console.log("ddfsfd", change);
      //chosenCount

      votes = votes.map((val, index) => {
        return val + Number(change[index]);
      });
      //console.log(votes);
      poll.poll.chosenCount = votes;
      //console.log("firebase set", poll);
      database.ref("polls/" + pollid).set({ poll: poll });
      polls[pollid] = poll;
      console.log("updated", polls[pollid]);
    });
}

function updatePoll(pollid, change) {
  let poll = getPollData(pollid);

  //poll.then(pol => {
  //console.log(pollid);
  //console.log(polls[pollid + ""]);
  let votes = poll.poll.chosenCount;
  console.log("ddfsfd", pol.poll.poll);
  //chosenCount

  votes = votes.map((val, index) => {
    return val + change[index];
  });
  //console.log(votes);
  poll.poll.chosenCount = votes;
  //console.log("firebase set", poll);
  database.ref("polls/" + pollid).set({ poll: poll });
  polls[pollid] = poll;

  //console.log("current pollls", polls);
  //});

  //return poll;
  //push to firebased
}

function getAllPolls() {
  return getPollsFromFireBase();
}
function getPollsFromAccount(account) {}

//updates poll
//vals is the change
//sends updated value to firebase
// function updatePoll(pollid,da, vals) {
//   for (let i = 0; i < vals.length; i++) {
//     data[i] += vals;
//   }
//   return data;
//   //update to firebase
// }

//Maybe an only vote once + sign in
function updateSpecialPoll(vals) {}

module.exports = {
  getPollData: getPollData,
  updatePoll: updatePoll,
  createPoll: createPoll,
  getAllPolls: getAllPolls,
  updatePollDataFireBase: updatePollDataFireBase
};

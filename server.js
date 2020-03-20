//command line version of poll app
//creates a poll with the specified amount of elements
let polls = require("./poll.js");
let express = require("express");
let app = express();
let cors = require("cors");

let bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.get("/", (req, res) => {
  //Fetch data from database specifcally the part after /
  //Create a poll and send it
  res.send("hello");
});
app.get("/polls:id", (req, res) => {
  //Fetch data from database specifcally the part after /
  //Create a poll and send it
  let str = req.params.id + "";
  let sub = str.substring(1, str.length);
  console.log(sub);
  let pol = getPollData(Number(sub));
  pol.then(data => {
    res.send(data.poll);
  });
  console.log("polllll", pol);
});

app.post("/", (req, res) => {
  console.log(req.body);
  polls.updatePoll(req.body.pollid, req.body.delta);
  res.send("updated Poll");
});

app.post("/createPollAPI", (req, res) => {
  console.log(req.body);
  let pollupdate = polls.createPoll(req.body);
  res.send(pollupdate);
});

app.post("/browsePolls", (req, res) => {
  let pols = polls.getAllPolls();
  let polKeys = Object.keys(pols);
  let pollArray = [];
  let startIndex = 0;
  let endIndex = polKeys.length > 10 ? 10 : polKeys.length;
  if (req.body !== undefined) {
    if (req.body.range !== undefined) {
      if (typeof req.body.range[0] == Number) {
        startIndex = req.body.range[0];
        endIndex = req.body.range[1];
      }
    }
  }
  for (let i = startIndex; i < endIndex; i++) {
    pollArray.push(pols[polKeys[i]]);
  }
  res.send(pollArray);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

let port = process.env.PORT || 9000;

app.listen(port);
polls.getPollData(1);
console.log("done");
let currPoll = {};

function getPollData(pollId) {
  currPoll = polls.getPollData(pollId);
  return currPoll;
}

function updatePoll(pollId, diffrence) {
  currPoll = polls.getPollData(pollId);
  return updatePoll(pollId, currPoll, vals);
}
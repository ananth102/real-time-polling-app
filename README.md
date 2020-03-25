# real-time-polling-app

A polling app that allows for poll creation and poll voting all in real time.
Check it out [here](https://realtimepolling.herokuapp.com/)

How to run offline

1. Get rid of the proxy variable in package.json in the client folder
2. Replace instances of axios calls with "http://localhost:9000/"
3. Run `node server.js` in the main directory
4. Run `npm start` in the client Directory

Features

- Poll Creator
- Poll Browser
- Real time voting
- Poll Searcher

Technical Details

Node.JS

- Four endpoints for browsing/creating/updating/searching for polls
- Uses Express JS
- Connects to firebase database

React

- Uses Axios calls
- Material Ui for UI

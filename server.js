// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const path = require('path');
const { error } = require('console');

const accountSid = 'AC512a7091ec17836bbc605e4132e29ac7';
const authToken = '09d81a7088b82e9acb9131767fe74e3d';
const client = require('twilio')(accountSid, authToken);

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json({limit:'1mb'}))
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/new5.htm'));
});

app.post('/sendMessage',function (req,res) {
    console.log(req.body)
    const receiver = req.body.receiver
    const sendsmessage = req.body.message
    client.messages
      .create(
          {
            body: '# '+sendmessage,
            from: '+12024107229', 
            to: '+919960085483'
        })
      .then(message => console.log(message.sid));
})
app.listen(8080);const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

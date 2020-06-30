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
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json({limit:'1mb'}))
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/new5.html");
});

app.post('/sendMessage',function (req,res) {
    console.log(req.body)
    const receiver = req.body.receiver
    const sendsmessage = req.body.message
    client.messages
      .create(
          {
            body: '# '+sendsmessage,
            from: '+12024107229', 
            to: .ev
        })
      .then(message => console.log(message.sid));
})

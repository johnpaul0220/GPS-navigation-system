
const express = require("express");
const app = express();
const path = require('path');
const { error } = require('console');

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
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
            to: process.env.PHONE_NO
        })
      .then(message => console.log(message.sid));
})

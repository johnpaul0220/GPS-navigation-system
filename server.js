const express = require("express");
const fetch = require('node-fetch');
const app = express();
const path = require("path");
const { error } = require("console");

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require("twilio")(accountSid, authToken);
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json({ limit: "1mb" }));


app.get('/login',(req,res)=>{
  res.sendFile(__dirname+"/views/login.htm")
})
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/geofence/:latlng", async (req,res)=>{
  const layerID = 'TRAFFIC_LIGHT_FENCES';
  const HERE_API_KEY = process.env.HERE_API_KEY;
  let proximity = req.params.latlng;
  console.log(proximity)
  let keyAttribute = 'NAME'
  const apiURL = `https://fleet.ls.hereapi.com/2/search/proximity.json?layer_ids=${layerID}&apikey=${HERE_API_KEY}&proximity=${proximity}&key_attribute=${keyAttribute}`
  console.log(apiURL)
  let fence = await fetch(apiURL)
  let fencedata = await fence.json()
  await res.json(fencedata)
  console.log(fencedata)
})


app.post("/sendMessage", function(req, res) {
  console.log(req.body);
  const receiver = req.body.receiver;
  const sendsmessage = req.body.message;
  client.messages
    .create({
      body: "# " + sendsmessage,
      from: "+12024107229",
      to: process.env.PHONE_NO
    })
    .then(message => console.log(message.sid));
});

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
//require the newly installed modules inside app.js
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }


  const jsonData = JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/bdfa0011db"
  //the number after "us" should be replaced by your last number of api key
  //the string afrer "lists" is your list ID
  const options = {
    method: "POST",
    auth: "Aria0325:16fb2bcb22d07b6cdaebcf505be978dd-us10"
  };


  const request = https.request(url, options, function(response) {

if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html")
}
else{
  res.sendFile(__dirname + "/failure.html")
}

    response.on("data", function(data) {
      console.log(JSON.parse(data))
    })
  });

  request.write(jsonData);
  request.end();

})

app.post("/failure",function(req,res){
  res.redirect("/");
})



app.listen(process.env.PORT||3000, function() {
  //to get the port provided by Heroku
  console.log("Server is running on port 3000");
})



//api key
//16fb2bcb22d07b6cdaebcf505be978dd-us10

//list id
//bdfa0011db

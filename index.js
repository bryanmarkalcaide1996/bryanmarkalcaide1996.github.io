// dotenv for censoring sensitive file and data inputs.
require("dotenv").config();

// npm packages
// Express npm
const express = require("express");
const app = express();
// Mail Chimp npm
const mailchimp = require("@mailchimp/mailchimp_marketing");
// ejs npm
const ejs = require("ejs");

// data import
const data = require(__dirname + "/data.js");

//Express Config
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Mail Chimp Config
mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_PREFIX,
});
// ejs config
// this set method tells node to look for views folder in the directory and use ejs as the view engine in rendering .ejs extension files.
app.set("view engine", "ejs");

// This is a get method that renders the homepage / the index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Newsletter subscription handler
app.post("/", (req, res) => {
  if (req.body.button === "subscribe") {
    const run = async () => {
      const response = await mailchimp.lists.batchListMembers(
        process.env.AUDIENCE_ID,
        {
          members: [
            {
              // the req.body.email and req.body.fullName values came from the html form inputs.
              // using the name attribute of each input tag to grab its value, and assigning them in an object key-value pair required by the API so I can save them to my mailing list.
              email_address: req.body.email,
              status: "subscribed",
              merge_fields: {
                FNAME: req.body.fullName,
              },
            },
          ],
        }
      );
    };

    run();
  }

  res.redirect("/");
});

// get request pages

// will catch get request from /story1 route and will render story-1.html
app.get("/story1", (req, res) => {
  res.sendFile(__dirname + "/views/story-1.html");
});

// will catch get request from /story2 route and will render story-2.html
app.get("/story2", (req, res) => {
  res.sendFile(__dirname + "/views/story-2.html");
});

// will catch get request from /story3 route and will render story-3.html
app.get("/story3", (req, res) => {
  res.sendFile(__dirname + "/views/story-3.html");
});

// will catch get request from /story4 route and will render story-4.html
app.get("/story4", (req, res) => {
  res.sendFile(__dirname + "/views/story-4.html");
});

// will catch get request from /shop route and will render shop.ejs
app.get("/shop", (req, res) => {
  res.render("shop", { merchList: data.merch });
});

// 404 handler page. All gibberish endpoints will be catch by this function and will render 404.ejs
app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

// This port is a dynamic port, the process.env.PORT is an encrypted port provided by heroku when the app is deployed on the cloud.
// The 3000 is a local port used when running the app on a local server machine.
app.listen(process.env.PORT || 3000, () => {
  console.log("Server initiated on port 3000");
});

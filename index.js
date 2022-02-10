// dotenv for sensitive file and data
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

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Newsletter subscription handler
app.post("/", (req, res) => {
  if (req.body.button === "search") {
  } else if (req.body.button === "subscribe") {
    const run = async () => {
      const response = await mailchimp.lists.batchListMembers(
        process.env.AUDIENCE_ID,
        {
          members: [
            {
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

app.get("/story1", (req, res) => {
  res.sendFile(__dirname + "/views/story-1.html");
});

app.get("/story2", (req, res) => {
  res.sendFile(__dirname + "/views/story-2.html");
});

app.get("/story3", (req, res) => {
  res.sendFile(__dirname + "/views/story-3.html");
});

app.get("/story4", (req, res) => {
  res.sendFile(__dirname + "/views/story-4.html");
});

app.get("/shop", (req, res) => {
  res.render("shop", { merchList: data.merch });
});

app.listen(3000, () => {
  console.log("Server initiated on port 3000");
});

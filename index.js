// dotenv for sensitive file and data
require("dotenv").config();
const express = require("express");
const app = express();

// Mail Chimp Config
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_PREFIX,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Newsletter subscription handler
app.post("/", (req, res) => {
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
    console.log(response);
  };

  run();

  res.redirect("/");
});

app.get("/story1", (req, res) => {
  res.sendFile(__dirname + "/view/story-1.html");
});

app.get("/story2", (req, res) => {
  res.sendFile(__dirname + "/view/story-2.html");
});

app.get("/story3", (req, res) => {
  res.sendFile(__dirname + "/view/story-3.html");
});

app.get("/story4", (req, res) => {
  res.sendFile(__dirname + "/view/story-4.html");
});

app.get("/shop", (req, res) => {
  res.sendFile(__dirname + "/view/shop.html");
});

app.listen(3000, () => {
  console.log("Server initiated on port 3000");
});

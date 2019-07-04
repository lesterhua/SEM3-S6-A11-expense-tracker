const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("accounting");
});

app.listen(port, (req, res) => {
  console.log(`The app server is running on :http://localhost:${port}`);
});

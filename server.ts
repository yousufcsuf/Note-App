import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("<h1>Hello Yousuf</h1>");
});

app.listen(port, () => {
  console.log("Server is started");
});

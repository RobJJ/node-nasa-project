const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./routes/api");
//
const app = express();
//
// Middleware to handle requests coming in!
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);

// express matching *, passes it - route - to react if not found above... important
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
//
module.exports = app;
//
//
// By doing this shit here,, we are seperating the express middleware functions from the server - helps us organise our code better!

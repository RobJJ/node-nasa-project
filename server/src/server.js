const http = require("http");
const mongoose = require("mongoose");

// One way of creating express server - added benefit of seperating the express code from server code.. express is just a fancy listening function!
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

// Dev can setup their own chosen PORT - env
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
const MONGO_URL = `mongodb+srv://nasa-user-api:qU26yDDsRofkkHxY@nasa.lfa5ocv.mongodb.net/?retryWrites=true&w=majority`;

//event emiter - emits when connection is rdy or has errors (once())
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready mutherfkr!");
});

mongoose.connection.on("error", (err) => {
  console.error("Error: ", err);
});

// This async function serves as a way to await and load some shit before the server is started,, so the user has the 'data' it needs
async function startServer() {
  // connect to mongo before server starts listening
  // await mongoose.connect(MONGO_URL, {
  //   // 4 params otions on startup
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
  // });
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}... yea boi!`);
  });
}

startServer();
// using built in http server that node gives is a strong way of setting up your server as it allows you to respond to more incoming connections... like web sockets!
// Express is pretty much just middleware built ontop of the node http

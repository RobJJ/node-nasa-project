const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://nasa-user-api:qU26yDDsRofkkHxY@nasa.lfa5ocv.mongodb.net/?retryWrites=true&w=majority`;

//
//
// OLD WAY
// await mongoose.connect(MONGO_URL, {
//   // 4 params otions on startup
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });
// NEW WAY
//event emiter - emits when connection is rdy or has errors (once())
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready mutherfkr!");
});

mongoose.connection.on("error", (err) => {
  console.error("Error: ", err);
});

async function mongoConnect(params) {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(params) {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};

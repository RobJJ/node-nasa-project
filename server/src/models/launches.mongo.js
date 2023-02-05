const mongoose = require("mongoose");

// Schema - structure
const launchesSchema = new mongoose.Schema({
  flightNumber: {
    // can add lots of props here
    type: Number,
    required: true,
  },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  launchDate: { type: Date, required: true },
  target: {
    type: String,
    ref: "Planet",
    required: true,
  },
  customers: [String],
  upcoming: { type: Boolean, required: true },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// first argument is always singular name of the name this model represents... mongoose then lowercases it and plurals it.. which it uses to talk to the collection with that new name
// Connects launchesSchema with the "launches" collections
// Collections must be plural

module.exports = mongoose.model("Launch", launchesSchema);

// NOSQL approach
//target: {
// planets stored in their own collection, look for id
// type: mongoose.ObjectId,
// ref: "Planet",
//   },

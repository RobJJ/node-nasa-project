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

// NOSQL approach
//target: {
// planets stored in their own collection, look for id
// type: mongoose.ObjectId,
// ref: "Planet",
//   },

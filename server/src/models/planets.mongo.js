const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  keplerName: { type: String, required: true },
});

// try match frontend and backend naming schema

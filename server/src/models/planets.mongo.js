const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  keplerName: { type: String, required: true },
});

// created this object model to use!
module.exports = mongoose.model("Planet", planetsSchema);

// try match frontend and backend naming schema

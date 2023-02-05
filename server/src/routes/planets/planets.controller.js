// Controller takes in actions and requests from user and work with them to update the models!!!
const { getAllPlanets } = require("../../models/planets.model");
//

// use http function keyword for functions that use req,res
async function httpGetAllPlanets(req, res) {
  // only ever set the status once - so return
  return res.status(200).json(await getAllPlanets());
  // lets use the mongoose find operation
}
//
module.exports = { httpGetAllPlanets };

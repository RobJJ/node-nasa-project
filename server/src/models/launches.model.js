const launchesDataBase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();
// add state to server for flight number
let latestFlightNumber = 100;
// eg of data structure
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer TTPQ",
  launchDate: new Date("April 20, 2030"),
  target: "Kepler-442 b",
  customers: ["NASA", "SPACE-X"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

//
function existLaunchWithId(launchId) {
  return launches.has(launchId);
}
//
async function getAllLaunches() {
  // lets get data from mongoDB
  // find operation, empty object is find all docs in collection
  return await launchesDataBase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function saveLaunch(launch) {
  // add validation on planets model

  // upsert!
  // updateOne, 1st param: does this prop exist, 2nd param: if exists - update with this object,
  await launchesDataBase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      //add property to the existing obj
      // this data can be done on server side,, not by client
      success: true,
      upcoming: true,
      customers: ["NASA", "SPACE-X"],
      flightNumber: latestFlightNumber,
    })
  );
}
//
function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}
// Lets use the built in JS MAP data structure
module.exports = {
  existLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};

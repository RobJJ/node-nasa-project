const axios = require("axios");
const launchesDataBase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

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

const SPACEX_API_URL = `https://api.spacexdata.com/v4/launches/query`;

async function loadLaunchData(params) {
  console.log("getting data from api");
  await axios.post(SPACEX_API_URL, {});
}
//
async function existLaunchWithId(launchId) {
  // use mongoose
  return await launchesDataBase.findOne({
    flightNumber: launchId,
  });
}
//
async function getLatestFlightNumber(params) {
  // get this var. using model operations
  const latestLaunch = await launchesDataBase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  //sort decending order... add "-" infront of prop name
  return latestLaunch.flightNumber;
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
  // add validation on planets model -
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    // signal error here
    throw new Error("No matching planet was found");
  }
  // upsert!
  // updateOne, 1st param: filter: does this prop exist, 2nd param: if exists - update with this object, 3rd: upsert option
  await launchesDataBase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["NASA", "SPACE-X"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

//
async function abortLaunchById(launchId) {
  // use mongoose now - dont want to use upsert 3rd param here. We know the doc exists
  const aborted = await launchesDataBase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  console.log(aborted);
  // return meta data from mongoose
  return aborted.modifiedCount === 1;
}
// Lets use the built in JS MAP data structure
module.exports = {
  loadLaunchData,
  existLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};

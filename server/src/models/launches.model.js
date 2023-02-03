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
// set key-value combo...
launches.set(launch.flightNumber, launch);
//
function existLaunchWithId(launchId) {
  return launches.has(launchId);
}
//
function getAllLaunches() {
  // convert the data to the format that the controller needs here instead of doing it in the controller!
  return Array.from(launches.values());
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

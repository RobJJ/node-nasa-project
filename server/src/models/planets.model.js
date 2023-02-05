const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
//
const planets = require("./planets.mongo");
//

function isHabitablePlanet(planet) {
  return (
    //some checks for planetary possiblity
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
//
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
          // mongoDB - follows mongoose schema structure
        }
      })
      .on("error", (err) => {
        console.log("Something went wrong: ", err);
        reject(err);
      })
      .on("end", async () => {
        // get amount of planets in mongo collection
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} planets found!!`);
        resolve();
      });
  });
}
// lecture 169 for more info on this find operation called on the model
async function getAllPlanets() {
  return await planets.find(
    {},
    {
      //lets use this para to tell mongoose to exclude some stuff. 1 is yes, 0 is no for inclusive props...
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  // insert + update = upset -> like an insert but only inserts if the document doesnt exist.. perfect for onstart (lecture170)
  try {
    await planets.updateOne(
      {
        // match name in csv file
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Could not save a planet: ${error}`);
  }
}
//
//
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};

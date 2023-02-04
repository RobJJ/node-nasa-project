const request = require("supertest");
const app = require("../../app");
//
// Lets write some API tests! -> Use SuperTest library - alternating between the jest functionality and the superTest built on func
//
//
// GET REQUEST TESTING
describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    // pass the app into the superTest
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
    // expect(response.statusCode).toBe(200);
  });
  //
});
//
//
// POST REQUEST TESTING
describe("Test POST /launch", () => {
  // Code sitting here can be resused in the diff tests..
  const completeLaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-199 f",
    launchDate: "January 4, 2028",
  };
  const launchDataWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-199 f",
  };
  const launchDateWithInvalidDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-199 f",
    launchDate: "incorrect date",
  };
  //
  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);
    // valueOf() to get the matching nums?
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);
    // toMatchObject matching loosely
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  //
  //
  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    // toStrictEqual is for strcit matching,, type and structures
    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  //
  //
  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDateWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    // toStrictEqual is for strcit matching,, type and structures
    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});

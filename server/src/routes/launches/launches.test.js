const request = require("supertest");
const app = require("../../app");
//
// Lets write some API tests! -> Use SuperTest library
//
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
describe("Test POST /launch", () => {
  test("It should respond with 201 success", async () => {
    const res = await request(app)
      .post("/launches")
      .send({
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-199 f",
        launchDate: "January 4, 2028",
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });
  //
  test("It should catch missing required properties", () => {});
  //
  test("It should catch invalid dates", () => {});
});

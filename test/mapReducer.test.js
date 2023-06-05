import { mapReducer } from "../src/transducer";

describe("mapReducer", () => {
  test("returns a reducer", () => {
    const reducer = mapReducer();
    console.log(reducer);
  });
});

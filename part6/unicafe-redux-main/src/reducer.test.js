import deepFreeze from "deep-freeze";
import counterReducer from "./reducers/reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 5,
    ok: 4,
    bad: 2,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };
    deepFreeze(state);
    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 6,
      ok: 4,
      bad: 2,
    });
  });
  test("ok is incremented", () => {
    const action = {
      type: "OK",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 5,
      ok: 5,
      bad: 2,
    });
  });
  test("bad is incremented", () => {
    const action = {
      type: "BAD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 5,
      ok: 4,
      bad: 3,
    });
  });
  test("state is reseted", () => {
    const action = {
      type: "ZERO",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(
      counterReducer(state, { type: "GOOD" }),
      action,
    );
    expect(newState).toEqual({
      good: 5,
      ok: 4,
      bad: 2,
    });
  });
});

import userReducer from "./user.reducer.js";

describe("Testing LOGIN in user reducer", () => {
  const state1 = {
    currUserDetails: null,
    authorizationToken: null,
  };
  const action1 = {
    type: "LOGIN",
    payload: {
      email: "test@gmail.com",
      username: "Test User",
      quizAttempted: [],
      isDarkModeSelected: false,
      authorizationToken: "ABCDEF",
    },
  };
  const state2 = {
    currUserDetails: {
      email: "test@gmail.com",
      username: "Test User",
      quizAttempted: [],
      isDarkModeSelected: false,
    },
    authorizationToken: "ABCDEF",
  };
  test("action.type=LOGIN 1 user.reducer Method", () => {
    const res = userReducer(state1, action1);
    expect(res).toStrictEqual(state2);
  });

  const action2 = {
    type: "LOGIN",
    payload: {
      email: "test@gmail.com",
      username: "Test User",
      quizAttempted: ["abshabs", "asnaks"],
      isDarkModeSelected: false,
      authorizationToken: "ABCDEF",
    },
  };
  const state3 = {
    currUserDetails: {
      email: "test@gmail.com",
      username: "Test User",
      quizAttempted: ["abshabs", "asnaks"],
      isDarkModeSelected: false,
    },
    authorizationToken: "ABCDEF",
  };
  test("action.type=LOGIN 2 user.reducer Method", () => {
    const res = userReducer(state1, action2);
    expect(res).toStrictEqual(state3);
  });
});

describe("LOGOUT in user reducer", () => {
  const state1 = {
    currUserDetails: {
      email: "test@gmail.com",
      username: "Test User",
      quizAttempted: ["abshabs", "asnaks"],
      isDarkModeSelected: false,
    },
    authorizationToken: "ABCDEF",
  };
  const action = {
    type: "LOGOUT",
    payload: {},
  };
  const state2 = {
    currUserDetails: null,
    authorizationToken: null,
  };
  test("action.type=LOGOUT", () => {
    const res = userReducer(state1, action);
    expect(res).toStrictEqual(state2);
  });
});

describe("UPDATE_USER_DETAILS in user reducer", () => {
  const state1 = {
    currUserDetails: {
      email: "test@gmail.com",
      username: "Test User",
      quizAttempted: ["abshabs", "asnaks"],
      isDarkModeSelected: false,
    },
    authorizationToken: "ABCDEF",
  };
  const action1 = {
    type: "UPDATE_USER_DETAILS",
    payload: {
      quizAttempted: ["abshabs", "asnaks", "ksksks"],
    },
  };
  const state2 = {
    currUserDetails: {
      email: "test@gmail.com",
      username: "Test User",
      quizAttempted: ["abshabs", "asnaks", "ksksks"],
      isDarkModeSelected: false,
    },
    authorizationToken: "ABCDEF",
  };
  test("action.type=UPDATE_USER_DETAILS", () => {
    const res = userReducer(state1, action1);
    expect(res).toStrictEqual(state2);
  });
});

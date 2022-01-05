export default function userReducer(prevState, action) {
  switch (action.type) {
    case "LOGIN":
      const { authorizationToken } = action.payload;
      const currUserDetails = {
        email: action.payload.email,
        username: action.payload.username,
        quizAttempted: action.payload.quizAttempted,
        isDarkModeSelected: action.payload.isDarkModeSelected,
      };
      localStorage.setItem("user", JSON.stringify(currUserDetails));
      localStorage.setItem("authorizationToken", authorizationToken);
      return {
        ...prevState,
        currUserDetails: currUserDetails,
        authorizationToken,
      };
    case "LOGOUT":
      localStorage.setItem("authorizationToken", null);
      localStorage.setItem("user", null);
      return {
        ...prevState,
        currUserDetails: null,
        authorizationToken: null,
      };
    default:
      break;
  }
}

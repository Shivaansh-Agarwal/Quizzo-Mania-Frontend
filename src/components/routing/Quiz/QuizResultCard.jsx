import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/auth-context.jsx";
import { useLoadingScreen } from "@contexts/loadingScreen-context";
import { updateUserDetailsAPI } from "@apis";

export const QuizResultCard = ({ score, quizId }) => {
  const { setShowLoadingScreen } = useLoadingScreen();
  const { currentUser, authorizationToken, logout, authUserDispatch } =
    useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl mb-6">Results</div>
      <div className="mb-16">
        Final Score: <span className="text-2xl">{score}</span>
      </div>
      <button
        className="bg-red-500 text-white pt-2 pb-2 pl-6 pr-6"
        onClick={() => {
          //Mark this quiz as completed
          updateUserDetails({
            currentUser,
            authorizationToken,
            logout,
            quizId,
            setShowLoadingScreen,
            authUserDispatch,
          });
          navigate("/");
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

async function updateUserDetails({
  currentUser,
  authorizationToken,
  logout,
  quizId,
  setShowLoadingScreen,
  authUserDispatch,
}) {
  setShowLoadingScreen(true);
  const response = await updateUserDetailsAPI({
    email: currentUser.email,
    authorizationToken,
    quizId,
  });
  if (response.status === "success") {
    authUserDispatch({
      type: "UPDATE_USER_DETAILS",
      payload: response.data,
    });
  } else {
    if (response.statusCode === 204) {
      console.log("No Update Required, user has already attempted this quiz");
    } else {
      console.error("Update user details failed", response.message);
      if (response.statusCode === 401) {
        logout();
      }
    }
  }
  setShowLoadingScreen(false);
}

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/auth-context.jsx";
import { useLoadingScreen } from "./loadingScreen-context";

export const QuizResultCard = ({ score, quizId }) => {
  const { setShowLoadingScreen } = useLoadingScreen();
  const { currentUser, authorizationToken, logout, setCurrentUser } = useAuth();
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
            setCurrentUser,
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
  setCurrentUser,
}) {
  const config = {
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
    },
  };
  try {
    setShowLoadingScreen(true);
    axios.post();
    const response = await axios.post(
      "https://QuizAppBackend.shivaansh98.repl.co/api/v1/user",
      { email: currentUser.email, completedQuizId: quizId },
      config
    );
    const { quizAttempted } = response.data.data;
    setCurrentUser((userDetails) => {
      return { ...userDetails, quizAttempted: quizAttempted };
    });
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const updatedUserDetails = { ...userDetails, quizAttempted: quizAttempted };
    localStorage.setItem("user", JSON.stringify(updatedUserDetails));
    setShowLoadingScreen(false);
  } catch (e) {
    console.error(e.response);
  }
}

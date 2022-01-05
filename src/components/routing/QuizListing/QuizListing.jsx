import React, { useState, useEffect } from "react";
import { useAuth } from "@contexts/auth-context.jsx";
import { useLoadingScreen } from "@contexts/loadingScreen-context";
import { QuizCard } from "./QuizCard";
import { showErrorToastMessage } from "@utils/utility.js";
import { getQuizListAPI } from "@apis";

export function QuizListing() {
  const [quizList, setQuizList] = useState([]);
  const { setShowLoadingScreen } = useLoadingScreen();
  const { currentUser, authorizationToken, logout } = useAuth();
  useEffect(() => {
    getQuizList({
      setShowLoadingScreen,
      authorizationToken,
      setQuizList,
      logout,
    });
  }, [authorizationToken]);
  const quizAttemptedList = currentUser.quizAttempted;
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-4 overflow-auto h-full p-4 bg-slate-100">
      {quizList.length === 0
        ? "No Quiz is available at the moment!"
        : quizList.map((quiz) => {
            if (quizAttemptedList.includes(quiz._id)) {
              quiz.isAttempted = true;
            } else {
              quiz.isAttempted = false;
            }
            return <QuizCard key={quiz._id} {...quiz} />;
          })}
    </div>
  );
}

async function getQuizList({
  setShowLoadingScreen,
  authorizationToken,
  setQuizList,
  logout,
}) {
  setShowLoadingScreen(true);
  const response = await getQuizListAPI({ authorizationToken });
  if (response.status === "success") {
    setQuizList(response.data);
  } else {
    console.error(response.message);
    showErrorToastMessage(response.message);
    if (response.statusCode === 401) {
      logout();
    }
  }
  setShowLoadingScreen(false);
}

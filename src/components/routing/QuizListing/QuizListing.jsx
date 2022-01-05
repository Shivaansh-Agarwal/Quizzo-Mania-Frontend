import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@contexts/auth-context.jsx";
import { useLoadingScreen } from "./loadingScreen-context";
import { QuizCard } from "./QuizCard";
import { showErrorToastMessage } from "@utils/utility.js";

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
  const quizAttemptedList = currentUser.quizAttempted; // To be used later in QuizCard component to display some overlay.
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-4 overflow-auto h-full p-4 bg-slate-100">
      {quizList.length === 0
        ? "No Quiz is available at the moment!"
        : quizList.map((quiz) => {
            if (quizAttemptedList.includes(quiz._id)) {
              quiz.isAttempted = true;
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
  const config = {
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
    },
  };
  try {
    setShowLoadingScreen(true);
    const response = await axios.get(
      "https://QuizAppBackend.shivaansh98.repl.co/api/v1/quizzes",
      config
    );
    setQuizList(response.data.data);
  } catch (e) {
    console.error(e.response);
    showErrorToastMessage(e.response.data.message);
    if (e.response.status === 401) {
      logout();
    }
  } finally {
    setShowLoadingScreen(false);
  }
}

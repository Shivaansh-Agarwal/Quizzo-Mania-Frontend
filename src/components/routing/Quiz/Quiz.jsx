import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@contexts/auth-context.jsx";
import axios from "axios";
import { QuizInstructions } from "./QuizInstructions.jsx";
import { QuizQuestionCard } from "./QuizQuestionCard.jsx";
import { QuizResultCard } from "./QuizResultCard.jsx";
import { LoadingScreen } from "@components/common";

export function Quiz() {
  const [screen, setScreen] = useState({
    questionNumber: 0,
    isInstructionsScreen: true,
    isResultScreen: false,
  });
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [quizDetails, setQuizDetails] = useState({});
  const [score, setScore] = useState(0);
  const { authorizationToken } = useAuth();
  const { quizId } = useParams();
  const { questionNumber, isInstructionsScreen, isResultScreen } = screen;
  const isQuestionsScreen = !isInstructionsScreen && !isResultScreen;
  useEffect(() => {
    getQuestionsForCurrentQuiz({
      quizId,
      authorizationToken,
      setQuizDetails,
      setShowLoadingScreen,
    });
  }, [quizId, authorizationToken]);
  let correctAnsPoints = quizDetails?.correctAnsPoints;
  let wrongAnsPoints = quizDetails.wrongAnsPoints;
  let questions = quizDetails.questions;
  let questionsCount = null;
  let currQuestion = null;
  let currQuesOptions = null;
  questionsCount = questions?.length;
  if (isQuestionsScreen && Object.keys(quizDetails).length !== 0) {
    currQuestion = questions[questionNumber - 1].question;
    currQuesOptions = questions[questionNumber - 1].options;
  }
  return (
    <div className="flex flex-col justify-center items-center h-fit mx-4 mt-16 mb-4 sm:m-0 w-[18rem] sm:w-[36rem] max-w-xl overflow-auto">
      <LoadingScreen showLoadingScreen={showLoadingScreen} />
      {isInstructionsScreen && (
        <QuizInstructions
          correctAnsPoints={correctAnsPoints}
          wrongAnsPoints={wrongAnsPoints}
          questionsCount={questionsCount}
          setScreen={setScreen}
        />
      )}
      {isQuestionsScreen && (
        <QuizQuestionCard
          question={currQuestion}
          options={currQuesOptions}
          questionsCount={questionsCount}
          questionNumber={questionNumber}
          correctPoints={correctAnsPoints}
          inCorrectPoints={wrongAnsPoints}
          setScreen={setScreen}
          score={score}
          setScore={setScore}
        />
      )}
      {isResultScreen && <QuizResultCard score={score} />}
    </div>
  );
}

async function getQuestionsForCurrentQuiz({
  quizId,
  authorizationToken,
  setQuizDetails,
  setShowLoadingScreen,
}) {
  try {
    setShowLoadingScreen(true);
    const config = {
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
    };
    const response = await axios.get(
      `https://QuizAppBackend.shivaansh98.repl.co/api/v1/questions/${quizId}`,
      config
    );
    setQuizDetails(response.data.data);
  } catch (e) {
    console.error("Failed to fetch Questions for the current quiz");
    console.error(e.response);
  } finally {
    setShowLoadingScreen(false);
  }
}

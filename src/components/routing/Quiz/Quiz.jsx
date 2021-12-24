import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizInstructions } from "./QuizInstructions.jsx";
import { QuizQuestionCard } from "./QuizQuestionCard.jsx";
import { QuizResultCard } from "./QuizResultCard.jsx";
import { quizQuestions } from "../../../data/Questions.js";

export function Quiz() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState({
    questionNumber: 0,
    isInstructionsScreen: true,
    isResultScreen: false,
  });
  const { quizId } = useParams();
  const { questionNumber, isInstructionsScreen, isResultScreen } = screen;
  const currQuizQuestionsObj =
    !isInstructionsScreen && !isResultScreen
      ? quizQuestions.find((quiz) => quiz.id === parseInt(quizId))
      : null;
  const currQuestionObj =
    currQuizQuestionsObj && currQuizQuestionsObj.questions
      ? currQuizQuestionsObj.questions.find(
          (ques) => ques.id === questionNumber
        )
      : null;
  let question, options;
  if (currQuestionObj) {
    question = currQuestionObj.question;
    options = currQuestionObj.options;
  }
  const questionsCount = currQuizQuestionsObj?.questions?.length;
  return (
    <div className="flex flex-col justify-center items-center h-fit mx-4 mt-16 mb-4 sm:m-0 w-[18rem] sm:w-[36rem] max-w-xl overflow-auto">
      {isInstructionsScreen && <QuizInstructions />}
      {!isInstructionsScreen && !isResultScreen && (
        <QuizQuestionCard
          question={question}
          options={options}
          questionsCount={questionsCount}
          questionNumber={questionNumber}
        />
      )}
      {isResultScreen && <QuizResultCard />}
      <section className="mt-4">
        {!isResultScreen && (
          <button
            className="bg-red-500 text-white pt-2 pb-2 pl-6 pr-6"
            onClick={() => {
              if (questionsCount === questionNumber) {
                setScreen((screen) => {
                  return { ...screen, isResultScreen: true };
                });
              } else {
                setScreen((screen) => {
                  return {
                    ...screen,
                    isInstructionsScreen: false,
                    questionNumber: screen.questionNumber + 1,
                  };
                });
              }
            }}
          >
            {questionsCount === questionNumber ? "Finish" : "NEXT"}
          </button>
        )}
        {isResultScreen && (
          <button
            className="bg-red-500 text-white pt-2 pb-2 pl-6 pr-6"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Dashboard
          </button>
        )}
      </section>
    </div>
  );
}

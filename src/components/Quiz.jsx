import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizInstructions } from "./QuizInstructions";
import { QuizQuestionCard } from "./QuizQuestionCard";
import { questionsList } from "../data/Questions";

export function Quiz() {
  const navigate = useNavigate();
  const [isInstructionsScreen, setIsInstructionsScreen] = useState(true);
  const [isResultScreen, setIsResultScreen] = useState(false);
  const [currQuestionNum, setCurrQuestionNum] = useState(0);
  const params = useParams();
  const { quizId } = params;
  if (!isInstructionsScreen && !isResultScreen) {
    var currQuizquestions = questionsList.find(
      (quiz) => quiz.id === parseInt(quizId)
    );
    var questionObj = currQuizquestions.questions.find(
      (ques) => ques.id === currQuestionNum
    );
    var { question, options } = questionObj;
    var questionsCount = currQuizquestions.questions.length;
  }
  return (
    <div className="flex flex-col justify-center items-center h-fit mx-4 mt-16 mb-4 sm:m-0 w-[18rem] sm:w-[36rem] max-w-xl overflow-auto">
      {isInstructionsScreen && <QuizInstructions />}
      {!isInstructionsScreen && !isResultScreen && (
        <QuizQuestionCard
          question={question}
          options={options}
          questionsCount={questionsCount}
          questionNumber={currQuestionNum}
        />
      )}
      {isResultScreen && <ResultScreen />}
      <section className="mt-4">
        {!isResultScreen && (
          <button
            className="bg-red-500 text-white pt-2 pb-2 pl-6 pr-6"
            onClick={() => {
              if (questionsCount === currQuestionNum) {
                setIsResultScreen(true);
              } else {
                setIsInstructionsScreen(false);
                setCurrQuestionNum((currQuestionNum) => currQuestionNum + 1);
              }
            }}
          >
            {questionsCount === currQuestionNum ? "Finish" : "NEXT"}
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

const ResultScreen = () => {
  return <div>Result Screen</div>;
};

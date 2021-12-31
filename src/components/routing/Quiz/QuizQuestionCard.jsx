import { useEffect, useState } from "react";

export const QuizQuestionCard = ({
  question,
  options,
  questionsCount,
  questionNumber,
  correctPoints,
  inCorrectPoints,
  score,
  setScore,
  setScreen,
}) => {
  return (
    <div className="mt-2 p-4 sm:mt-4 sm:p-8 border flex flex-col justify-center w-full">
      <div className="flex flex-row justify-between text-sm sm:text-base">
        <div className="text-gray-500">
          Question: {questionNumber}/{questionsCount}
        </div>
        <div className="text-gray-500">Current Score: {score}</div>
      </div>
      <div className="mt-2 sm:mt-4 font-bold text-base sm:text-lg">
        <span className="pr-2">Q.</span>
        {question}
      </div>
      <div className="mt-4">
        {options.map(({ choice, isCorrect }, index) => {
          const optionKey = String.fromCharCode(97 + index);
          return (
            <Choice
              key={index}
              optionKey={optionKey}
              choice={choice}
              questionNumber={questionNumber}
              questionsCount={questionsCount}
              isCorrect={isCorrect}
              correctPoints={correctPoints}
              inCorrectPoints={inCorrectPoints}
              setScore={setScore}
              setScreen={setScreen}
            />
          );
        })}
      </div>
    </div>
  );
};

const Choice = ({
  optionKey,
  choice,
  isCorrect,
  correctPoints,
  inCorrectPoints,
  setScore,
  setScreen,
  questionNumber,
  questionsCount,
}) => {
  /**
   * onClick of a choice, highlight whether that answer is right or wrong.
   * and highlight the correct answer also.
   *
   * Disable click for all options.
   */
  let timer = null;
  function proceed() {
    timer = setTimeout(() => {
      setScreen((screen) => {
        if (questionsCount === questionNumber) {
          return {
            ...screen,
            isResultScreen: true,
            questionNumber: screen.questionNumber + 1,
          };
        }
        return { ...screen, questionNumber: screen.questionNumber + 1 };
      });
    }, 1000);
  }
  useEffect(() => {
    return clearTimeout(timer);
  });
  return (
    <div
      className={
        "border cursor-pointer my-2 p-2 flex text-sm sm:text-base bg-slate-100"
      }
      onClick={() => {
        if (isCorrect) {
          setScore((score) => score + correctPoints);
        } else {
          setScore((score) => score + inCorrectPoints);
        }
        proceed();
      }}
    >
      <div className="mr-2 font-semibold text-cyan-900">{optionKey}.</div>
      <div>{choice}</div>
    </div>
  );
};

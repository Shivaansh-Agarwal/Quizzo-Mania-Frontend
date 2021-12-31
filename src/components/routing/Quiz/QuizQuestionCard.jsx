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
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (userAnswer) {
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
        setUserAnswer(null);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [userAnswer]);
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
        {options.map(({ _id, choice, isCorrect }, index) => {
          const optionKey = String.fromCharCode(97 + index);
          return (
            <Choice
              key={_id}
              _id={_id}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
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
  _id,
  userAnswer,
  setUserAnswer,
  isCorrect,
  correctPoints,
  inCorrectPoints,
  setScore,
  setScreen,
  questionNumber,
  questionsCount,
}) => {
  function getChoiceBgColor(userAnswer) {
    if (userAnswer && isCorrect) {
      return "bg-green-100";
    } else if (userAnswer && userAnswer === _id && !isCorrect) {
      return "bg-red-100";
    }
    return "bg-slate-100";
  }
  let bgColor = getChoiceBgColor(userAnswer);
  return (
    <div
      className={`border cursor-pointer my-2 p-2 flex text-sm sm:text-base ${bgColor}`}
      onClick={() => {
        if (isCorrect) {
          setScore((score) => score + correctPoints);
        } else {
          setScore((score) => score + inCorrectPoints);
        }
        setUserAnswer(_id);
      }}
    >
      <div className="mr-2 font-semibold text-cyan-900">{optionKey}.</div>
      <div>{choice}</div>
    </div>
  );
};

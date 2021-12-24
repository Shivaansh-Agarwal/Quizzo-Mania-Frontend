export const QuizQuestionCard = ({
  question,
  options,
  questionsCount,
  questionNumber,
}) => {
  return (
    <div className="mt-2 p-4 sm:mt-4 sm:p-8 border flex flex-col justify-center w-full">
      <div className="flex flex-row justify-between text-sm sm:text-base">
        <div className="text-gray-500">
          Question: {questionNumber}/{questionsCount}
        </div>
        <div className="text-gray-500">Current Score:</div>
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
              isCorrect={isCorrect}
            />
          );
        })}
      </div>
    </div>
  );
};

const Choice = ({ optionKey, choice, isCorrect }) => {
  return (
    <div className="border bg-slate-100 cursor-pointer my-2 p-2 flex text-sm sm:text-base">
      <div className="mr-2 font-semibold text-cyan-900">{optionKey}.</div>
      <div>{choice}</div>
    </div>
  );
};

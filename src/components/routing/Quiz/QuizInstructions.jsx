export const QuizInstructions = ({
  quizName = "Quiz Name",
  quizCategory = "Sports",
  questionsCount = 0,
  correctAnsPoints = 0,
  wrongAnsPoints = 0,
  prevBestScore = null,
  setScreen,
}) => {
  const instructions = [
    { item: "Quiz Category: ", value: quizCategory },
    { item: "Total Questions: ", value: questionsCount },
    {
      item: "Correct Answer Points: ",
      value: correctAnsPoints,
      valueColor: "text-green-700",
    },
    {
      item: "Incorrect Answer Points: ",
      value: wrongAnsPoints,
      valueColor: "text-red-700",
    },
    {
      item: "Maximum attainable score: ",
      value: correctAnsPoints * questionsCount,
    },
  ];
  return (
    <div className="mt-2 sm:mt-4 bg-gray-200 flex flex-col justify-center items-center p-6">
      <div className="text-lg sm:text-2xl">{quizName}</div>
      <section className="mt-2 sm:mt-4">
        <div className="mb-1 sm:mb-2 text-center text-sm">
          Please read the following points carefully before proceeding.
        </div>
        <ul className="list-disc pl-6 text-sm sm:text-base">
          {instructions.map(({ item, value, valueColor }, index) => {
            return (
              <QuizInstructionsListItem
                key={index}
                item={item}
                value={value}
                valueColor={valueColor}
              />
            );
          })}
          {prevBestScore && (
            <QuizInstructionsListItem
              item="Your previous best score in the quiz is: "
              value={prevBestScore}
            />
          )}
        </ul>
      </section>
      <button
        className="bg-red-500 text-white pt-2 pb-2 pl-6 pr-6"
        onClick={() => {
          setScreen((screen) => {
            return {
              ...screen,
              isInstructionsScreen: false,
              questionNumber: screen.questionNumber + 1,
            };
          });
        }}
      >
        NEXT
      </button>
    </div>
  );
};

const QuizInstructionsListItem = ({
  item,
  value,
  valueColor = "text-slate-600",
}) => {
  return (
    <li className="mt-0.5">
      <span className="font-semibold">{item}</span>
      <span className={valueColor}>{value}</span>
    </li>
  );
};

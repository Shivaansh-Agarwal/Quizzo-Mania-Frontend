export const QuizInstructions = ({
  quizName = "Quiz Name",
  quizCategory = "Sports",
  questionsCount = 10,
  correctAnsPoints = 5,
  wrongAnsPoints = -4,
  prevBestScore = null,
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

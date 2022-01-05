import React from "react";
import { useNavigate } from "react-router-dom";

export function QuizCard({
  _id,
  name,
  category,
  isAttempted,
  prevScore,
  thumbnail,
}) {
  const navigate = useNavigate();
  function navigateToQuizPage() {
    navigate(`quiz/${_id}`);
  }
  return (
    <div
      className={`flex flex-col justify-center items-center rounded-lg drop-shadow-md p-3 bg-white`}
    >
      <section className="relative">
        {isAttempted && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-800 opacity-60 z-10 text-white flex justify-center items-center font-bold">
            ATTEMPTED
          </div>
        )}
        <img src={thumbnail} alt="QuizThubnail" />
      </section>
      <section className="flex flex-col justify-center items-center z-20">
        <div>{name}</div>
        <div>
          <button
            className="pt-2 pb-2 pr-6 pl-6 text-white bg-pink-500"
            onClick={navigateToQuizPage}
          >
            Start Quiz
          </button>
        </div>
      </section>
    </div>
  );
}

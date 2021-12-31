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
    <div className="flex flex-col justify-center items-center rounded-lg drop-shadow-md p-3 bg-white">
      <section>
        <img src={thumbnail} alt="QuizThubnail" />
      </section>
      <section className="flex flex-col justify-center items-center">
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

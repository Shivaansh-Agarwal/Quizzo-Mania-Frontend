import { useNavigate } from "react-router-dom";

export const QuizResultCard = ({ score }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl mb-6">Results</div>
      <div className="mb-16">
        Final Score: <span className="text-2xl">{score}</span>
      </div>
      <button
        className="bg-red-500 text-white pt-2 pb-2 pl-6 pr-6"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

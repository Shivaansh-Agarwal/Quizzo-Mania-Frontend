import { useNavigate } from "react-router-dom";

export const QuizResultCard = () => {
  const navigate = useNavigate();
  return (
    <div>
      Result Screen
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

import React from "react";
import { QuizCard } from "./QuizCard";
import { quizData } from "../../../data/Quiz.js";

export function QuizListing() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-4 overflow-auto h-full p-4 bg-slate-100">
      {quizData.map((quiz) => {
        return <QuizCard key={quiz.id} {...quiz} />;
      })}
    </div>
  );
}

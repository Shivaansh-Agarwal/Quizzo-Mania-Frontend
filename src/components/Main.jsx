import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { QuizCardsContainer } from "./QuizCardsContainer.jsx";
import { Quiz } from "./Quiz.jsx";

export function Main({ minHeight, maxHeight }) {
  return (
    <main
      className="flex justify-center items-center overflow-auto"
      style={{ minHeight, maxHeight }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <QuizCardsContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </main>
  );
}

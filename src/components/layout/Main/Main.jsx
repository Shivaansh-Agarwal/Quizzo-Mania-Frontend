import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  SignUp,
  QuizListing,
  Quiz,
  ProtectedRoute,
} from "../../routing";

export const Main = ({ minHeight, maxHeight }) => {
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
              <QuizListing />
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
};

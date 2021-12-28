import { useAuth } from "@contexts/auth-context.jsx";

export const Header = ({ minHeight, maxHeight }) => {
  const { currentUser, logout } = useAuth();
  return (
    <header
      className="pl-4 pr-4 flex flex-row justify-between items-center w-full bg-gray-200"
      style={{ minHeight, maxHeight }}
    >
      <div className="font-permanentmarker text-2xl w-36 md:text-4xl md:w-fit">
        Quizzo Mania
      </div>
      {currentUser && (
        <div className="flex flex-col justify-center items-center">
          <h1>Hi! {currentUser.username}</h1>
          <button
            className="text-blue-700 hover:underline pl-8 pr-8 pt-2 pb-2 w-fit cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

import { useNavigate } from "react-router-dom";

export default function ChooseAuth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center bg-base-100 shadow-xl rounded-xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Welcome 👋</h1>
        <p className="mb-8 text-sm text-gray-500">Please choose an option to continue:</p>

        <div className="flex flex-col gap-4">
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
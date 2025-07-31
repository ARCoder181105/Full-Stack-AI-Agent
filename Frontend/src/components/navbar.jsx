import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar fixed w-full top-0 z-50 bg-[#0f0f0f]/70 backdrop-blur-md  text-white font-mono">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl normal-case text-purple-400">
          Ticket AI
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        {!token ? (
          <>
            <Link to="/signup" className="btn btn-md px-4 py-2 hover:bg-purple-600 border-purple-500 text-white">
              Signup
            </Link>
            <Link to="/login" className="btn btn-md px-4 py-2 hover:bg-pink-600 border-pink-500 text-white">
              Login
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm">Hi, {user?.email}</p>
            {user?.role === "admin" && (
              <Link to="/admin" className="btn btn-md px-4 py-2 border-blue-500 hover:bg-blue-600 text-white">
                Admin
              </Link>
            )}
            <button onClick={logout} className="btn btn-md px-4 py-2 border-red-500 hover:bg-red-600 text-white">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

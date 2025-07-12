import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div
          className="text-2xl font-bold text-blue-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Skill<span className="text-blue-900">Swap</span>
        </div>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li
            onClick={() => navigate("/home")}
            className="hover:text-blue-700 cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={() => navigate("/requests")}
            className="hover:text-blue-700 cursor-pointer"
          >
            Requests
          </li>
          <li className="hover:text-blue-700 cursor-pointer">Browse Skills</li>
        </ul>

        {/* user icon */}
        <div
          className="text-2xl cursor-pointer hover:text-blue-700"
          onClick={() => navigate("/dashboard")}
          title="Dashboard"
        >
          👤
        </div>
      </div>
    </nav>
  );
}

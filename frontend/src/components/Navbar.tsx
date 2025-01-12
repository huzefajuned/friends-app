import { Link, Navigate, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import React, { useEffect } from "react";

const Navbar = () => {
  // const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useStore();

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/");
  // }, []);

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          FriendConnect
        </Link>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.username}!</span>
            <button
              onClick={logout}
              className="bg-indigo-500 hover:bg-indigo-700 px-3 py-1 rounded transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-2">
            <Link
              to="/login"
              className="bg-indigo-500 hover:bg-indigo-700 px-3 py-1 rounded transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-500 hover:bg-indigo-700 px-3 py-1 rounded transition duration-200"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

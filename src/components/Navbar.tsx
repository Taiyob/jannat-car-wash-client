/* eslint-disable @typescript-eslint/no-unused-vars */
import { LogOut, Moon, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  logOut,
  selectCurrentUser,
} from "../redux/features/auth/userCredentialSlice";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Header = () => {
  const navigate = useNavigate();
  const products = useAppSelector((store) => store.cart.products);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("You are logged out successfully");
    navigate("/");
  };

  return (
    <header className="bg-gray-700 text-white rounded-sm px-3">
      <nav className="container mx-auto flex items-center justify-between space-x-10 py-4">
        <Link to={"/"}>
          <h1 className="text-4xl font-bold">Car-Wash</h1>
        </Link>

        <div className="hidden md:flex items-center space-x-5">
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                to={"/services"}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                to={"/about"}
              >
                About
              </Link>
            </li>
            <li>
              {user?.email && (
                <Link
                  to={`/dashboard/${user.userRole}`}
                  className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                >
                  Dashboard
                </Link>
              )}
            </li>
            <li className="relative">
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                to={"/orders"}
              >
                <ShoppingCart size={24} />
              </Link>
              <span className="rounded-full absolute top-[-10px] left-[20px] bg-primary text-white text-center size-[25px]">
                {products.length}
              </span>
            </li>

            <li>
              {user?.email ? (
                <button
                  onClick={handleLogout}
                  // onClick={handleToggleTheme}
                  className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                >
                  {/* <Moon size={24} /> */}
                  <LogOut size={24} />
                </button>
              ) : (
                <Link
                  to="/registration"
                  // onClick={handleToggleTheme}
                  className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
                >
                  <User size={24} />
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-5 mt-4">
          <li>
            <Link
              className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
              to={"/products"}
              onClick={handleMenuToggle}
            >
              Products
            </Link>
          </li>
          <li>
            <a
              className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
              href="#"
              onClick={handleMenuToggle}
            >
              About
            </a>
          </li>
          <li className="relative">
            <Link
              className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
              to={"/cart"}
              onClick={handleMenuToggle}
            >
              <ShoppingCart size={24} />
            </Link>
            <span className="rounded-full absolute top-[-10px] left-[20px] bg-primary text-white text-center size-[25px]">
              2
            </span>
          </li>
          <li>
            <button
              // onClick={handleToggleTheme}
              className="rounded-lg backdrop-blur-[2px] p-1 inline-block"
            >
              <Moon size={24} />
            </button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;

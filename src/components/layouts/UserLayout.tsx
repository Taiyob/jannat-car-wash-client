import React from "react";
import { Link, Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="drawer drawer-mobile">
      <div className="flex justify-start items-center">
        <div className="drawer-side h-full">
          <ul className="menu bg-fuchsia-100 text-base-content w-80 h-screen p-4">
            {/* Sidebar content here */}
            <li className="bg-fuchsia-200 rounded mb-2">
              <Link to="/">📍Home</Link>
            </li>
            <li className="bg-fuchsia-200 rounded">
              <Link to="/dashboard/user/my-list">📝My list</Link>
            </li>
          </ul>
        </div>
        <div className="drawer-content flex justify-between items-center">
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open Menu
          </label>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

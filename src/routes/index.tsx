import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Slots from "../pages/Slots";
import Orders from "../pages/Orders";
import Booking from "../pages/Booking";
import AdminLayout from "../components/layouts/AdminLayout";
import UserLayout from "../components/layouts/UserLayout";
import AdminDashboardHome from "../pages/AdminDashboardHome";
import UserDashboardHome from "../pages/UserDashboardHome";
import CreateService from "../pages/CreateService";
import CreateSlot from "../pages/CreateSlot";
import BookingList from "../pages/BookingList";
import MyBookingList from "../pages/MyBookingList";
import Services from "../pages/Services";
import Unauthenticate from "../components/Unauthenticate";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import About from "../pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/slots/:id",
        element: <Slots />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/bookings/:id",
        element: <Booking />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/about",
        element: <About />,
      },

    ],
  },
  {
    path: "/registration",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/unauthorize",
    element: (
      <Unauthenticate
        message="You are not authorized!!!"
        address="/"
        label="Back"
      />
    ),
  },
  {
    path: "/dashboard/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboardHome />,
      },
      {
        path: "create-service",
        element: <CreateService />,
      },
      {
        path: "create-slot",
        element: <CreateSlot />,
      },
      {
        path: "booking-list",
        element: <BookingList />,
      },
    ],
  },
  {
    path: "/dashboard/user",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboardHome />,
      },
      {
        path: "my-list",
        element: <MyBookingList />,
      },
    ],
  },
]);

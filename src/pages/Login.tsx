import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useLoginUserMutation } from "../redux/api/auth/authApi";
import { toast } from "sonner";
import {
  setUser,
  setUserToken,
  TUser,
} from "../redux/features/auth/userCredentialSlice";
import {
  setLoginEmail,
  setLoginPassword,
} from "../redux/features/auth/loginSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email: loginEmail, password: loginPassword } = useAppSelector(
    (state: RootState) => state.login
  );
  const [loginUser] = useLoginUserMutation();

  const handleSubmitForLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toasterId = toast.loading("Logging in...");

    const loginData = { email: loginEmail, password: loginPassword };

    try {
      const { data } = await loginUser(loginData).unwrap();
      const { token } = data;
      const user = jwtDecode(token) as TUser;
      console.log(token, "User info:", user);

      dispatch(setUserToken(token));
      dispatch(setUser(user));

      dispatch(setLoginEmail(""));
      dispatch(setLoginPassword(""));

      toast.success("Login successful!", {
        id: toasterId,
        duration: 2000,
      });

      // navigate(`/${user?.userRole}-dashboard`);
      navigate(`/`);
    } catch (e) {
      toast.error("Login failed. Please try again.", {
        id: toasterId,
        duration: 2000,
      });
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Login Here!!!
        </h1>
        <form onSubmit={handleSubmitForLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 float-start"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={loginEmail}
              onChange={(e) => dispatch(setLoginEmail(e.target.value))}
              className="border border-gray-300 p-3 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 float-start"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={loginPassword}
              onChange={(e) => dispatch(setLoginPassword(e.target.value))}
              className="border border-gray-300 p-3 w-full rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Are you new here?{" "}
          <Link to="/registration" className="text-blue-500 hover:underline">
            Please registered
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

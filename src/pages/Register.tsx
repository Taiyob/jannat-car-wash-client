import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { toast } from "sonner";
import {
  setAddress,
  setEmail,
  setName,
  setPassword,
  setPhone,
} from "../redux/features/auth/registerSlice";
import { useCreateUserMutation } from "../redux/api/auth/authApi";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, email, phone, address, password, role } = useAppSelector(
    (state: RootState) => state.register
  );
  const [createUser, { reset }] = useCreateUserMutation();

  const handleSubmitForRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toasterId = toast.loading("User creating....");
    const registerData = { name, email, phone, address, password, role };

    try {
      const register = await createUser(registerData).unwrap();
      navigate("/");

      toast.success("Account created successfully!!!", {
        id: toasterId,
        duration: 2000,
      });

      dispatch(setName(""));
      dispatch(setEmail(""));
      dispatch(setPhone(""));
      dispatch(setAddress(""));
      dispatch(setPassword(""));
      reset();
      console.log(register);
    } catch (e) {
      toast.error("something went wrong", { id: toasterId, duration: 2000 });
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Please Register Here!!!
        </h1>
        <form onSubmit={handleSubmitForRegistration}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 float-start"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              className="border border-gray-300 p-3 w-full rounded"
              required
            />
          </div>
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
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
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
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="border border-gray-300 p-3 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 float-start"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => dispatch(setAddress(e.target.value))}
              className="border border-gray-300 p-3 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 float-start"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => dispatch(setPhone(e.target.value))}
              className="border border-gray-300 p-3 w-full rounded"
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="role">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={role}
              className="border border-gray-300 p-3 w-full rounded"
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Are you already registered?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Please login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

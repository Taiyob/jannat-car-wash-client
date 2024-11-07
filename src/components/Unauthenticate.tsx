import React from "react";
import { Link } from "react-router-dom";

type TAuthenticateProps = {
  message: string;
  address: string;
  label: string;
};

const Unauthenticate = ({ message, address, label }: TAuthenticateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5 pb-16">
      <p className="text-xl text-gray-600 lg:text-3xl">{message}</p>
      <Link to={address}>
        <button>{label}</button>
      </Link>
    </div>
  );
};

export default Unauthenticate;

import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { name, description, price, _id } = service;

  return (
    <div className="relative">
      <div className="border rounded-lg shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col h-full">
        <img
          src=""
          alt=""
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-75"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-green-700 mb-2">{name}</h3>
          <p className="text-gray-700 mb-4 flex-grow">{description}</p>
          <p className="text-lg font-bold text-red-600 mb-4">{price}</p>
          <Link
            to={`/slots/${_id}`}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

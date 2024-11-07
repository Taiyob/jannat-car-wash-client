import React from "react";

const Banner = () => {
  return (
    <div className="mt-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Car Washing Center
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
          Your trusted partner for top-notch auto care and exceptional service.
        </p>
        <a
          href="/products"
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 shadow-lg"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default Banner;

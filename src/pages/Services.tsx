import React from "react";
import { useGetServiceQuery } from "../redux/api/service/serviceApi";
import ServiceCard from "../components/ServiceCard";
import { SerializedError } from "@reduxjs/toolkit";

const Services = () => {
  const { data, isLoading, isError, error } = useGetServiceQuery(undefined);

  if (isLoading) return <div>Loading services...</div>;
  if (isError) {
    const errorMessage =
      (error as SerializedError).message || "An unknown error occurred.";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="container">
      <h1 className="text-4xl font-bold my-10">All Services</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {data?.data.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;

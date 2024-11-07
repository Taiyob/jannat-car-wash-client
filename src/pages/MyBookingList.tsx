import React from "react";
import MyBookingTable from "../components/MyBookingTable";
import { useGetmyBookingQuery } from "../redux/api/booking/bookingApi";

const MyBookingList = () => {
  const { data } = useGetmyBookingQuery(undefined);
  console.log(data);

  let i = 1;

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 h-screen">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        My Booking table
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="bg-gray-300">
            <tr className="text-left">
              <th className="p-3">SL #</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Service</th>
              <th className="p-3">Slot</th>
              <th className="p-3 text-right">Vehical Type</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((booking, index) => (
              <MyBookingTable key={index} booking={booking} i={i++} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookingList;

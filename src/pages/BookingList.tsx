import React, { useEffect, useState } from "react";
import { useGetBookingQuery } from "../redux/api/booking/bookingApi";
import BookingListTable from "../components/BookingListTable";

const BookingList = () => {
  const { data } = useGetBookingQuery(undefined);
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    setBookingList(data?.data || []);
  }, [data]);

  const handleBookingComplete = (completedBookingId) => {
    setBookingList((prevList) =>
      prevList.filter((booking: any) => booking._id !== completedBookingId)
    );
  };

  let i = 1;

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 h-screen">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        Booking table
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
            {bookingList.map((booking, index) => (
              <BookingListTable
                key={index}
                booking={booking}
                i={i++}
                onBookingComplete={handleBookingComplete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;

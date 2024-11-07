import React, { useState } from "react";
import { formatDate } from "../utils/dateFormate";
import {
  useCompleteBookingMutation,
  useDeleteBookingMutation,
} from "../redux/api/booking/bookingApi";
import Swal from "sweetalert2";

const BookingListTable = ({ booking, i, onBookingComplete }) => {
  const [completeBooking] = useCompleteBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const handleBooking = async () => {
    const updatedInfo = {
      id: booking?._id,
      data: {
        status: "completed",
      },
    };
    const competedBooking = await completeBooking(updatedInfo);
    console.log(competedBooking);
    if (competedBooking?.data?.status === "completed") {
      onBookingComplete(booking._id);
    }
  };

  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleCanceledBooking = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const canceledBio = {
          id: booking?._id,
          data: {
            status: "canceled",
          },
        };

        const canceledBooking = await deleteBooking(canceledBio);

        if (canceledBooking?.data?.status === "canceled") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Booking canceled successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
        <td className="p-3">
          <p>{i}</p>
        </td>
        <td className="p-3">
          <p>{booking?.customer?.name}</p>
        </td>
        <td className="p-3">
          <p className="text-gray-600">{booking?.service?.name}</p>
        </td>
        <td className="p-3">
          <p>{formatDate(booking?.slot?.date)}</p>
          <p className="text-gray-600">
            {booking?.slot?.startTime} - {booking?.slot?.endTime}
          </p>
        </td>
        <td className="p-3 text-right">
          <p>{booking?.vehicleType}</p>
        </td>
        <td className="p-3 text-right flex gap-2">
          <button
            onClick={handleBooking}
            className="px-3 py-1 font-semibold rounded-md bg-violet-600 text-gray-50"
          >
            <span>Pending</span>
          </button>
          <button
            onClick={() => openDetailsModal(booking)}
            className="px-3 py-1 font-semibold rounded-md bg-pink-300 text-gray-50"
          >
            <span>Details</span>
          </button>
          <button
            onClick={handleCanceledBooking}
            className="px-3 py-1 font-semibold rounded-md bg-red-600 text-gray-50"
          >
            <span>Cancel</span>
          </button>
        </td>
      </tr>

      {/* Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <div>
              <p>
                <strong>Customer Name:</strong>{" "}
                {selectedBooking?.customer?.name}
              </p>
              <p>
                <strong>Service:</strong> {selectedBooking?.service?.name}
              </p>
              <p>
                <strong>Booking Date:</strong>{" "}
                {formatDate(selectedBooking?.slot?.date)}
              </p>
              <p>
                <strong>Time:</strong> {selectedBooking?.slot?.startTime} -{" "}
                {selectedBooking?.slot?.endTime}
              </p>
              <p>
                <strong>Vehicle Type:</strong> {selectedBooking?.vehicleType}
              </p>
              {/* Add any other booking details you want to show */}
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingListTable;

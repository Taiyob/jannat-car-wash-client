import React, { useState } from "react";
import { formatDate } from "../utils/dateFormate";
import Swal from "sweetalert2";
import Modal from "react-modal";

const MyBookingTable = ({ booking, i }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePayment = async () => {
    // Open the modal for payment confirmation
    setIsModalOpen(true);
  };

  const handleConfirmPayment = () => {
    // Simulate payment process
    setIsModalOpen(false);

    // Show success message with SweetAlert2
    Swal.fire({
      title: "Payment Completed!",
      text: "Your payment has been successfully processed.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleCancelPayment = () => {
    // Close the modal if payment is canceled
    setIsModalOpen(false);
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
        <td className="p-3 text-right w-full">
          <button
            onClick={handlePayment}
            className="px-3 py-2 font-semibold rounded-md bg-violet-600 text-gray-50"
          >
            <span>
              {booking?.status === "completed"
                ? "proceed to payment"
                : "pending"}
            </span>
          </button>
        </td>
      </tr>

      {/* Modal for Payment */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancelPayment}
        contentLabel="Payment Modal"
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">Payment Confirmation</h2>
        <p>
          <strong>Customer Name:</strong> {booking?.customer?.name}
        </p>
        <p>
          <strong>Service:</strong> {booking?.service?.name}
        </p>
        <p>
          <strong>Date:</strong> {formatDate(booking?.slot?.date)}
        </p>
        <p>
          <strong>Time:</strong> {booking?.slot?.startTime} -{" "}
          {booking?.slot?.endTime}
        </p>
        <p>
          <strong>Vehicle Type:</strong> {booking?.vehicleType}
        </p>

        <div className="mt-6">
          <button
            onClick={handleConfirmPayment}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md mr-4"
          >
            Confirm Payment
          </button>
          <button
            onClick={handleCancelPayment}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MyBookingTable;

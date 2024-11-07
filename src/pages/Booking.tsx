import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/userCredentialSlice";
import { useParams } from "react-router-dom";
import { useGetSlotsByIdQuery } from "../redux/api/slot/slotApi";
import { useGetSingleServiceQuery } from "../redux/api/service/serviceApi";
import { formatDate } from "../utils/dateFormate";
import { useCreateBookingMutation } from "../redux/api/booking/bookingApi";
import { toast } from "sonner";
import { clearCart } from "../redux/features/cartSlice";

const Booking = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { id } = useParams();

  const { data } = useGetSlotsByIdQuery(id);
  const singleSlot = data?.data?.map((slot) => ({
    service: slot?.service,
    startTime: slot?.startTime,
    endTime: slot?.endTime,
    date: slot?.date,
  }));
  const firstService = singleSlot?.[0]?.service;
  const slotStartTime = singleSlot?.[0]?.startTime;
  const slotEndTime = singleSlot?.[0]?.endTime;
  const slotDate = singleSlot?.[0]?.date;

  const { data: serviceInformation } = useGetSingleServiceQuery(firstService);
  const [createBooking] = useCreateBookingMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    const form = e.target;
    const customer = form.customer.value;
    const service = serviceInformation?.data?._id;
    const slot = id;
    const vehicleType = form.vehicleType.value;
    const vehicleBrand = form.vehicleBrand.value;
    const vehicleModel = form.vehicleModel.value;
    const manufacturingYear = Number(form.manufacturingYear.value);
    const registrationPlate = form.registrationPlate.value;

    form.reset();

    const bookingDetailInfo = {
      customer,
      service,
      slot,
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    };

    try {
      const booking = await createBooking(bookingDetailInfo);
      if (booking?.data?.statusCode === 200) {
        toast.success("Booking successully completed!!!");
        dispatch(clearCart());
      }
    } catch (error) {
      console.log(error);
      toast.error("Booking failed!!!");
    }
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
        Booking Form
      </h2>
      <form onSubmit={handleSubmit} className="mb-8">
        {/* Row 1 */}
        <div className="flex flex-wrap justify-between mb-4">
          <input
            type="text"
            name="customer"
            value={user?.user?.name}
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
            readOnly
          />
          <input
            type="text"
            name="service"
            placeholder="service"
            value={serviceInformation?.data?.name}
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
            readOnly
          />
          <input
            type="text"
            name="slot"
            placeholder="slot"
            value={`${slotStartTime} - ${slotEndTime}`}
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1"
            readOnly
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap justify-between mb-4">
          <select
            name="vehicleType"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
            required
          >
            <option value="" disabled>
              Select Vehicle Type
            </option>
            <option value="car">Car</option>
            <option value="truck">Truck</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="suv">SUV</option>
            <option value="van">Van</option>
          </select>

          <input
            type="text"
            name="vehicleBrand"
            placeholder="vehicleBrand"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
            required
          />
          <input
            type="text"
            name="vehicleModel"
            placeholder="vehicleModel"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1"
            required
          />
        </div>

        {/* Row 3 */}
        <div className="flex flex-wrap justify-between mb-4">
          <input
            type="text"
            name="manufacturingYear"
            placeholder="manufacturingYear"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
            required
          />
          <input
            type="text"
            name="registrationPlate"
            placeholder="registrationPlate"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
            required
          />
          <input
            type="text"
            name="date"
            value={formatDate(slotDate)}
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Booking;

import React, { useState } from "react";
import { useGetServiceQuery } from "../redux/api/service/serviceApi";
import { useCreateSlotMutation } from "../redux/api/slot/slotApi";
import { toast } from "sonner";

const CreateSlot = () => {
  const { data } = useGetServiceQuery(undefined);
  const [createSlot] = useCreateSlotMutation();

  const [selectedService, setSelectedService] = useState("");

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const generateTimes = (): string[] => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const service = form.service.value;
    const date = form.date.value;
    const startTime = form.startTime.value;
    const endTime = form.endTime.value;

    form.reset();

    const slotInformation = {
      service,
      date,
      startTime,
      endTime,
    };

    try {
      const slot = await createSlot(slotInformation).unwrap();
      if (slot?.statusCode === 201) {
        toast.success("Slot created successfully!!!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="px-20 h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
        Create Slot
      </h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-wrap justify-between mb-4 w-[600px]">
          <select
            name="service"
            value={selectedService}
            onChange={handleServiceChange}
            className="border border-gray-300 rounded-lg p-3 mb-4 w-full"
            required
          >
            <option value="" disabled>
              Select Service
            </option>
            {data?.data &&
              data.data.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-wrap justify-between mb-4">
          <label className="mr-2" htmlFor="startTime">
            Date:{" "}
          </label>
          <input
            type="date"
            name="date"
            placeholder="Date"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
            required
          />
        </div>

        <div className="flex flex-wrap justify-between mb-4">
          <label className="mr-2" htmlFor="startTime">
            Pick start time:{" "}
          </label>
          <select
            id="startTime"
            name="startTime"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
          >
            {generateTimes().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap justify-between mb-4">
          <label className="mr-2" htmlFor="startTime">
            Pick end time:{" "}
          </label>
          <select
            id="endTime"
            name="endTime"
            className="border border-gray-300 rounded-lg p-3 mb-4 flex-1 md:mr-2"
          >
            {generateTimes().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className=" mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg"
        >
          Create Slot
        </button>
      </form>
    </div>
  );
};

export default CreateSlot;

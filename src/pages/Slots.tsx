import React, { useState } from "react";
import { useGetSlotByServiceQuery } from "../redux/api/slot/slotApi";
import { useParams } from "react-router-dom";
import SlotCard from "../components/SlotCard";

const Slots = () => {
  const { id } = useParams();
  const { data } = useGetSlotByServiceQuery(id);
  console.log(data?.data);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const handleSlotSelect = (slotId) => {
    setSelectedSlotId(slotId);
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-bold my-10">All Slots</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {data?.data.map((slot) => (
          <SlotCard
            key={slot._id}
            slot={slot}
            onSelect={handleSlotSelect}
            disabled={selectedSlotId !== null && selectedSlotId !== slot._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Slots;

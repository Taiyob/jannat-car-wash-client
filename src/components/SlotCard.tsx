import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addToCart } from "../redux/features/cartSlice";

const SlotCard = ({ slot, onSelect, disabled }) => {
  const dispatch = useDispatch();
  const { date, startTime, endTime, _id } = slot;

  const handleAddToCart = () => {
    dispatch(addToCart(slot));

    // Show toast notification
    toast.success(
      `Slot on ${date} from ${startTime} to ${endTime} added to cart!`
    );

    onSelect(_id);
  };

  return (
    <div className="relative">
      <div className="border rounded-lg shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col h-full">
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Slot Date: {date}
          </h3>
          <p className="text-lg font-bold text-red-600 mb-4">
            Slot start: {startTime}
          </p>
          <p className="text-lg font-bold text-red-600 mb-4">
            Slot end: {endTime}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={disabled} // Disable button if prop is true
            className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg ${
              disabled ? "cursor-not-allowed" : ""
            }`}
          >
            {disabled ? "Slot Selected" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotCard;

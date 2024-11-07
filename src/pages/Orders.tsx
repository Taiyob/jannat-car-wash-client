import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Trash2 } from "lucide-react";
import { clearCart } from "../redux/features/cartSlice";
import { useGetSingleServiceQuery } from "../redux/api/service/serviceApi";
import { Link } from "react-router-dom";

const Orders = () => {
  const cartSlots = useAppSelector((store) => store.cart.products);
  const dispatch = useAppDispatch();

  let id = "";

  const serviceIds = [...new Set(cartSlots.map((slot) => slot.service))];

  const { data, isLoading } = useGetSingleServiceQuery(
    serviceIds.length > 0 ? serviceIds : undefined
  );

  if (isLoading) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const formatDate = (dateString) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-5xl font-bold mb-10 text-center text-gray-900">
        Your Orders
      </h1>

      {cartSlots.length === 0 ? (
        <p className="text-xl text-center text-gray-600">
          No slots selected yet.
        </p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {cartSlots.map((slot) => {
            id = slot?._id;

            const service = data?.data?._id === slot.service ? data.data : null;

            return (
              <div
                key={slot._id}
                className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105"
              >
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Slot Date: {formatDate(slot.date)}
                </h3>
                <p className="text-lg font-bold text-yellow-300 mb-1">
                  Start: {slot.startTime}
                </p>
                <p className="text-lg font-bold text-yellow-300 mb-4">
                  End: {slot.endTime}
                </p>

                {service && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-lg font-semibold text-white">
                      Service:{" "}
                      <span className="font-bold text-yellow-200">
                        {service.name}
                      </span>
                    </h4>
                    <p className="text-white">
                      Price: <span className="font-bold">${service.price}</span>
                    </p>
                    <p className="text-white">
                      Duration:{" "}
                      <span className="font-bold">
                        {service.duration} minutes
                      </span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            to={`/bookings/${id}`}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md transition duration-200 flex items-center justify-center mt-24 w-1.5/3 h-1/3"
          >
            Submit booking
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition duration-200 flex items-center justify-center mt-24 w-1.5/3 h-1/3"
          >
            <span>Clear Cart</span>
            <Trash2 className="ml-2" width={20} height={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;

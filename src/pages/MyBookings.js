import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function MyBookings({ currentUserId }) {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    api.get(`/bookings/passenger/${currentUserId}`).then((res) => setBookings(res.data));
  };

  useEffect(() => {
    fetchBookings();
  }, [currentUserId]);

  const handleCancel = async (id) => {
    await api.patch(`/bookings/${id}/cancel`);
    fetchBookings();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-gray-800 text-lg">
                  {b.ride.sourceCity} → {b.ride.destinationCity}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Driver: {b.ride.driver?.fullName} · {b.seatsBooked} seat(s)
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {new Date(b.ride.departureTime).toLocaleString("en-IN")}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-indigo-600">₹{b.totalPrice}</div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    b.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : b.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            </div>
            {b.status === "CONFIRMED" && (
              <button
                onClick={() => handleCancel(b.id)}
                className="text-xs text-red-500 hover:underline mt-3"
              >
                Cancel booking
              </button>
            )}
          </div>
        ))}
        {bookings.length === 0 && (
          <div className="text-center py-16 text-gray-400">No bookings yet.</div>
        )}
      </div>
    </div>
  );
}
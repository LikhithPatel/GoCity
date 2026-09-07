import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function RideDetails({ rideId, currentUserId, navigate }) {
  const [ride, setRide] = useState(null);
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (rideId) api.get(`/rides/${rideId}`).then((res) => setRide(res.data));
  }, [rideId]);

  const handleBook = async () => {
    setMessage("");
    try {
      await api.post("/bookings", {
        rideId: ride.id,
        passengerId: currentUserId,
        seatsBooked: Number(seats),
      });
      setMessage("✅ Booking confirmed!");
      const res = await api.get(`/rides/${rideId}`);
      setRide(res.data);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Booking failed"));
    }
  };

  if (!ride) return <div className="text-center py-16 text-gray-400">Loading ride...</div>;

  const date = new Date(ride.departureTime);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
      <button onClick={() => navigate("home")} className="text-indigo-600 text-sm mb-4">
        ← Back to search
      </button>

      <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-2">
        <span>{ride.sourceCity}</span>
        <span className="text-indigo-500">→</span>
        <span>{ride.destinationCity}</span>
      </div>
      <p className="text-gray-500 mb-6">
        {date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} at{" "}
        {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div>
          <div className="font-semibold text-gray-800">{ride.driver?.fullName}</div>
          <div className="text-sm text-gray-500">
            ⭐ {ride.driver?.ratingAverage?.toFixed(1) || "New"} · {ride.driver?.totalRides || 0} rides
          </div>
        </div>
        <div className="text-sm text-gray-500 text-right">
          {ride.vehicle?.make} {ride.vehicle?.model}
          <br />
          {ride.vehicle?.color} · {ride.vehicle?.plateNumber}
        </div>
      </div>

      {ride.notes && (
        <div className="mb-6 text-sm text-gray-600 bg-indigo-50 rounded-xl p-4">📝 {ride.notes}</div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-3xl font-bold text-indigo-600">₹{ride.pricePerSeat}</div>
          <div className="text-sm text-gray-400">per seat · {ride.availableSeats} left</div>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Seats:</label>
          <input
            type="number"
            min="1"
            max={ride.availableSeats}
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-20 px-3 py-2 rounded-xl border border-gray-200 outline-none"
          />
        </div>
      </div>

      {message && <div className="text-sm mb-4">{message}</div>}

      <button
        onClick={handleBook}
        disabled={ride.availableSeats === 0 || ride.status !== "SCHEDULED"}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-xl font-semibold transition"
      >
        {ride.availableSeats === 0 ? "Fully Booked" : "Book Now"}
      </button>
    </div>
  );
}
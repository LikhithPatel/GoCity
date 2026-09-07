import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function PostRide({ currentUserId, navigate }) {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    vehicleId: "",
    sourceCity: "",
    destinationCity: "",
    departureTime: "",
    totalSeats: 1,
    pricePerSeat: "",
    notes: "",
    instantBooking: true,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/vehicles/owner/${currentUserId}`).then((res) => setVehicles(res.data));
  }, [currentUserId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post(`/rides/driver/${currentUserId}/vehicle/${form.vehicleId}`, {
        sourceCity: form.sourceCity,
        destinationCity: form.destinationCity,
        departureTime: form.departureTime,
        totalSeats: Number(form.totalSeats),
        pricePerSeat: Number(form.pricePerSeat),
        notes: form.notes,
        instantBooking: form.instantBooking,
      });
      setMessage("✅ Ride posted successfully!");
      setTimeout(() => navigate("myrides"), 1000);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Failed to post ride"));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Post a Ride</h1>

      {vehicles.length === 0 && (
        <div className="bg-amber-50 text-amber-700 p-4 rounded-xl mb-6 text-sm">
          You need to add a vehicle in your Profile before posting a ride.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
            <input
              name="sourceCity"
              value={form.sourceCity}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
            <input
              name="destinationCity"
              value={form.destinationCity}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Departure Date & Time</label>
          <input
            type="datetime-local"
            name="departureTime"
            value={form.departureTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Vehicle</label>
          <select
            name="vehicleId"
            value={form.vehicleId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
          >
            <option value="">Select vehicle</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.make} {v.model} ({v.plateNumber}) — {v.totalSeats} seats
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Seats Offered</label>
            <input
              type="number"
              name="totalSeats"
              min="1"
              value={form.totalSeats}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Price per Seat (₹)</label>
            <input
              type="number"
              name="pricePerSeat"
              min="0"
              value={form.pricePerSeat}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="instantBooking" checked={form.instantBooking} onChange={handleChange} />
          Allow instant booking
        </label>

        {message && <div className="text-sm">{message}</div>}

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
        >
          Post Ride
        </button>
      </form>
    </div>
  );
}
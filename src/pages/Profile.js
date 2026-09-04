import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Profile({ currentUserId }) {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [vehicleForm, setVehicleForm] = useState({
    make: "",
    model: "",
    color: "",
    plateNumber: "",
    totalSeats: 4,
    vehicleType: "SEDAN",
  });
  const [reviews, setReviews] = useState([]);

  const loadProfile = () => {
    api.get(`/profiles/${currentUserId}`).then((res) => {
      setProfile(res.data);
      setForm(res.data);
    }).catch(() => setProfile(null));
  };

  const loadVehicles = () => {
    api.get(`/vehicles/owner/${currentUserId}`).then((res) => setVehicles(res.data));
  };

  const loadReviews = () => {
    api.get(`/reviews/profile/${currentUserId}`).then((res) => setReviews(res.data));
  };

  useEffect(() => {
    loadProfile();
    loadVehicles();
    loadReviews();
  }, [currentUserId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    if (profile) {
      await api.put(`/profiles/${currentUserId}`, form);
    } else {
      await api.post("/profiles", form);
    }
    setEditing(false);
    loadProfile();
  };

  const handleVehicleChange = (e) => setVehicleForm({ ...vehicleForm, [e.target.name]: e.target.value });

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    await api.post(`/vehicles/owner/${currentUserId}`, vehicleForm);
    setVehicleForm({ make: "", model: "", color: "", plateNumber: "", totalSeats: 4, vehicleType: "SEDAN" });
    loadVehicles();
  };

  const handleDeleteVehicle = async (id) => {
    await api.delete(`/vehicles/${id}`);
    loadVehicles();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          {profile && !editing && (
            <button onClick={() => setEditing(true)} className="text-sm text-indigo-600 font-medium">
              Edit
            </button>
          )}
        </div>

        {!editing && profile && (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
              {profile.fullName?.[0] || "?"}
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800">{profile.fullName}</div>
              <div className="text-sm text-gray-500">{profile.email} · {profile.phoneNumber}</div>
              <div className="text-sm text-gray-500 mt-1">
                ⭐ {profile.ratingAverage?.toFixed(1) || "New"} · {profile.totalRides} rides · {profile.city}
              </div>
              {profile.bio && <div className="text-sm text-gray-600 mt-2">{profile.bio}</div>}
            </div>
          </div>
        )}

        {(editing || !profile) && (
          <form onSubmit={handleSave} className="space-y-4">
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email || ""}
              onChange={handleChange}
              required
              disabled={!!profile}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 disabled:bg-gray-100"
            />
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            />
            <input
              name="city"
              placeholder="City"
              value={form.city || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            />
            <textarea
              name="bio"
              placeholder="Short bio"
              value={form.bio || ""}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold">
                Save
              </button>
              {profile && (
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {profile && (
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">My Vehicles</h2>
          <div className="space-y-2 mb-4">
            {vehicles.map((v) => (
              <div key={v.id} className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                <div className="text-sm text-gray-700">
                  {v.make} {v.model} · {v.color} · {v.plateNumber} · {v.totalSeats} seats
                </div>
                <button onClick={() => handleDeleteVehicle(v.id)} className="text-xs text-red-500 hover:underline">
                  Remove
                </button>
              </div>
            ))}
            {vehicles.length === 0 && <div className="text-sm text-gray-400">No vehicles added yet.</div>}
          </div>

          <form onSubmit={handleAddVehicle} className="grid grid-cols-2 gap-2">
            <input name="make" placeholder="Make" value={vehicleForm.make} onChange={handleVehicleChange} required className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <input name="model" placeholder="Model" value={vehicleForm.model} onChange={handleVehicleChange} required className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <input name="color" placeholder="Color" value={vehicleForm.color} onChange={handleVehicleChange} className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <input name="plateNumber" placeholder="Plate Number" value={vehicleForm.plateNumber} onChange={handleVehicleChange} required className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <input name="totalSeats" type="number" min="1" placeholder="Seats" value={vehicleForm.totalSeats} onChange={handleVehicleChange} required className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <select name="vehicleType" value={vehicleForm.vehicleType} onChange={handleVehicleChange} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
              <option value="SEDAN">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="HATCHBACK">Hatchback</option>
              <option value="MINIVAN">Minivan</option>
            </select>
            <button type="submit" className="col-span-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold">
              + Add Vehicle
            </button>
          </form>
        </div>
      )}

      {profile && (
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Reviews</h2>
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="bg-gray-50 rounded-xl p-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{r.reviewer?.fullName}</span>
                  <span>{"⭐".repeat(r.rating)}</span>
                </div>
                {r.comment && <div className="text-sm text-gray-500 mt-1">{r.comment}</div>}
              </div>
            ))}
            {reviews.length === 0 && <div className="text-sm text-gray-400">No reviews yet.</div>}
          </div>
        </div>
      )}
    </div>
  );
}
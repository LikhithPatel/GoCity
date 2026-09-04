import React, { useEffect, useState } from "react";
import api from "../api/api";
import RideCard from "../components/RideCard";

export default function MyRides({ currentUserId, navigate }) {
  const [rides, setRides] = useState([]);

  const fetchRides = () => {
    api.get(`/rides/driver/${currentUserId}`).then((res) => setRides(res.data));
  };

  useEffect(() => {
    fetchRides();
  }, [currentUserId]);

  const handleCancel = async (id) => {
    await api.patch(`/rides/${id}/cancel`);
    fetchRides();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Posted Rides</h1>
        <button
          onClick={() => navigate("post")}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm"
        >
          + Post New Ride
        </button>
      </div>

      <div className="grid gap-4">
        {rides.map((ride) => (
          <div key={ride.id} className="relative">
            <RideCard ride={ride} onClick={() => navigate("details", ride.id)} />
            <div className="flex items-center gap-2 mt-1 px-1">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  ride.status === "SCHEDULED"
                    ? "bg-green-100 text-green-700"
                    : ride.status === "CANCELLED"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {ride.status}
              </span>
              {ride.status === "SCHEDULED" && (
                <button
                  onClick={() => handleCancel(ride.id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Cancel ride
                </button>
              )}
            </div>
          </div>
        ))}
        {rides.length === 0 && (
          <div className="text-center py-16 text-gray-400">You haven't posted any rides yet.</div>
        )}
      </div>
    </div>
  );
}
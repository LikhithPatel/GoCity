import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostRide from "./pages/PostRide";
import Profile from "./pages/Profile";
import MyRides from "./pages/MyRides";
import MyBookings from "./pages/MyBookings";
import RideDetails from "./pages/RideDetails";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(1); // placeholder until auth is added

  const navigate = (target, rideId = null) => {
    setPage(target);
    if (rideId) setSelectedRideId(rideId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navigate={navigate} currentPage={page} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {page === "home" && <Home navigate={navigate} currentUserId={currentUserId} />}
        {page === "post" && <PostRide currentUserId={currentUserId} navigate={navigate} />}
        {page === "profile" && <Profile currentUserId={currentUserId} />}
        {page === "myrides" && <MyRides currentUserId={currentUserId} navigate={navigate} />}
        {page === "mybookings" && <MyBookings currentUserId={currentUserId} />}
        {page === "details" && (
          <RideDetails rideId={selectedRideId} currentUserId={currentUserId} navigate={navigate} />
        )}
      </main>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostRide from "./pages/PostRide";
import Profile from "./pages/Profile";
import MyRides from "./pages/MyRides";
import MyBookings from "./pages/MyBookings";
import RideDetails from "./pages/RideDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [page, setPage] = useState("home");
  const [authPage, setAuthPage] = useState("login");
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("gocity_user");
    if (stored) setCurrentUser(JSON.parse(stored));
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("gocity_user", JSON.stringify(user));
    setCurrentUser(user);
    setPage("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("gocity_user");
    setCurrentUser(null);
    setAuthPage("login");
  };

  const navigate = (target, rideId = null) => {
    setPage(target);
    if (rideId) setSelectedRideId(rideId);
  };

  if (!currentUser) {
    return authPage === "login" ? (
      <Login onLogin={handleLogin} navigate={setAuthPage} />
    ) : (
      <Register onLogin={handleLogin} navigate={setAuthPage} />
    );
  }

  const currentUserId = currentUser.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navigate={navigate} currentPage={page} onLogout={handleLogout} userName={currentUser.fullName} />
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
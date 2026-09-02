import React, {useState} from "react";
import Navbar from "./components/Navbar";

export default function App(){
  const[page,setPage]=useState("home");
  const[selectedRideId, setSelectedRideId]=useState(null);
  const[currentUserId, setCurrentUserId]=useState(1);

  const navigate = (target, rideId = null) => {
    setPage(target);
    if (rideId) setSelectedRideId(rideId);
  };

  return(
    <div className="min-h-screen bg-gray-50">
      <Navbar navigate={navigate} currentPage={page}/>
      <main className="max-w-6xl mx-auto px-4 py-8"></main>
    </div>
  )
}

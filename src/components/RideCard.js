import React from "react";

export default function RideCard({ride,onClick}){
    const date=new Date(ride.departureTime);
    const formattedDate=date.toLocaleDateString("en-IN", {weekday:"short", day:"numeric", month:"short"});
    const formattedTime=date.toLocaleTimeString("en-IN", {hour:"2-digit", minute:"2-digit"});

    return(
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer p-5 border border-gray-100">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <span>{formattedDate}</span>
                            <span>•</span>
                            <span>{formattedTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800 text-lg">{ride.sourceCity}</span>
                            <span className="text-indigo-500">→</span>
                            <span className="font-semibold text-gray-800 text-lg">{ride.destinationCity}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                            <span>{ride.driver?.fullName}</span>
                            <span>{ride.driver?.ratingAverage?.toFixed(1) || "New"}</span>
                            <span>{ride.availableSeats} seats left</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600">₹{ride.pricePerSeat}</div>
                        <div className="text-xs text-gray-400">per seat</div>
                    </div>
                </div>
            </div>
    )
}
import React from "react";

export default function Navbar({navigate,currentPage}){
    const links=[
        {key:"home", label:"Find a Ride"},
        {key:"post", label:"Post a Ride"},
        {key:"myrides", label:"My Rides"},
        {key:"mybookings", label:"My Bookings"},
        {key:"profile", label:"Profile"},
    ];

    return(
        <nav className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
                <div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate("home")}>
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                         G
                    </div>
                    <span className="text-xl font-bold text-gray-800">GoCity</span>
                </div>
                <div className="flex gap-1">
                    {links.map((link) => (
                        <button
                            key={link.key}
                            onClick={() => navigate(link.key)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                currentPage === link.key
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}
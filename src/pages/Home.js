import React, {useEffect,useState} from "react";
import api from "../api/api";
import RideCard from "../components/RideCard";

export default function Home({navigate}){
    const[rides, setRides]=useState([]);
    const[loading,setLoading]=useState(true);
    const[search,setSearch]=useState({source:"",destination:"",date:""});

    const fetchAllRides=async()=>{
        setLoading(true);
        try{
            const res=await api.get("/rides");
            setRides(res.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchAllRides();
    },[]);

    const handleSearch=async(e)=>{
        e.preventDefault();
        if(!search.source || !search.destination || !search.date){
            fetchAllRides();
            return;
        }
        setLoading(true);
        try{
            const res=await api.post("/rides/search", search);
            setRides(res.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    };

    return(
        <div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded 3-xl p-8 mb-8 text-white">
                <h1 className="text-3xl font-bold mb-1">Find your ride across the state</h1>
                <p className="text-indigo-100 mb-6">Affordable, social and convenient carpooling with GoCity</p>
                <form omSubmit={handleSearch} className="bg-white rounded-2xl p-3 flex flex-wrap gap-2">
                    <input className="flex-1 min-w-[150px] px-4 py-3 rounded-xl text-gray-800 outline-none"
                           placeholder="From"
                           value={search.source}
                           onChange={(e)=>setSearch({...search, source:e.target.value})} />

                    <input className="flex-1 min-w-[150px] px-4 py-3 rounded-xl text-gray-800 outline-none"
                           placeholder="To"
                           value={search.destination}
                           onChange={(e)=>setSearch({...search, destination:e.target.value})} />
                    <input className="flex-1 min-w-[150px] px-4 py-3 rounded-xl text-gray-800 outline-none"
                           placeholder="Date"
                           value={search.date}
                           onChange={(e)=>setSearch({...search, date:e.target.value})} />

                    <button type="submit"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition">
                    Search
                    </button>
                </form>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {loading ? "Loading rides...": `${rides.length} rides available`}
            </h2>
            <div className="grid gap-4">
                {rides.map((ride) => (
                    <RideCard key={ride.id} ride={ride} onClick={() => navigate("details", ride.id)} />
                ))}
                 {!loading && rides.length === 0 && (
                    <div className="text-center py-16 text-gray-400">No rides found.</div>
                )}
             </div>
        </div>
    )
}
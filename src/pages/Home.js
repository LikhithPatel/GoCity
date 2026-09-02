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
}
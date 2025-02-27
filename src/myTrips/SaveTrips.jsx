import TripCard from "@/Components/TripCard";
import { db } from "@/service/firebaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SaveTrips = () => {
  const navigation = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    getTrips();
  }, []);
  const getTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return;
    }

    const q = query(collection(db, "Trips"), where("Email", "==", user?.email));
    try {
      const querySnapshot = await getDocs(q);
      setUserTrips([]);
      // console.log(querySnapshot);
      console.log("Query snapshot size:", querySnapshot.size);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips((prevVal) => [...prevVal, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => <TripCard trip={trip} key={index} />)
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default SaveTrips;

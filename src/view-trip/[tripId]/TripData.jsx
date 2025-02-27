import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseconfig";
import { useEffect } from "react";
import InformationSection from "@/Components/InformationSection";
import Hotels from "@/Components/Hotels";
import PlacesVisit from "@/Components/PlacesVisit";

const TripData = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "Trips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InformationSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesVisit trip={trip} />
    </div>
  );
};

export default TripData;

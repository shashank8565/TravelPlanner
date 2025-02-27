import { PHOTO_REF_URL } from "@/service/Places";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const PlaceCard = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      let photoName;
      if (
        resp.data.places[0] &&
        resp.data.places[0].photos &&
        resp.data.places[0].photos[3] &&
        resp.data.places[0].photos[3].name
      ) {
        photoName = resp.data.places[0].photos[3].name;
      } else if (
        resp.data.places[1] &&
        resp.data.places[1].photos &&
        resp.data.places[1].photos[3] &&
        resp.data.places[1].photos[3].name
      ) {
        photoName = resp.data.places[1].photos[3].name;
      } else if (
        resp.data.places[2] &&
        resp.data.places[2].photos &&
        resp.data.places[2].photos[3] &&
        resp.data.places[2].photos[3].name
      ) {
        photoName = resp.data.places[2].photos[3].name;
      } else {
        photoName = null; // Or set a default value if no photo is found
      }

      if (photoName) {
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(PhotoUrl);
      } else {
        console.log("No valid photo name found in places[0] or places[1]");
        setPhotoUrl(""); // Or handle the "no photo" case as needed
      }
    });
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div
        className="border rounded-xl p-3 mt-2 flex gap-5 
          hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      >
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h3 className="font-bold text-lg">{place.placeName}</h3>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h3 className="mt-2">🕙 {place.timeToTravel}</h3>
          <h3 className="mt-2">🎟️ {place.ticketPricing}</h3>
          {/* <Button size="sm"><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;

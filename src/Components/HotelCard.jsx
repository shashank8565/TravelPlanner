import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PHOTO_REF_URL } from "@/service/Places";

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          className="rounded-xl h-[180px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h3 className="font-medium ">{hotel?.hotelName}</h3>
          <h3 className="text-xs text-gray-500 ">📍 {hotel?.hotelAddress}</h3>
          <h3 className="text-sm">💰 {hotel?.price}</h3>
          <h3 className="text-sm">⭐ {hotel?.rating}</h3>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;

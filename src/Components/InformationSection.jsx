import React from "react";

import { useState } from "react";
import { Button } from "./ui/button";
import { IoIosSend } from "react-icons/io";
import { useEffect } from "react";
import { PHOTO_REF_URL } from "@/service/Places";

const InformationSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
    <div>
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className=" my-5 flex flex-col gap-2">
          <h3 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h3>
          <div className=" hidden sm:flex gap-5">
            <h3 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              📅 {trip.userSelection?.noOfDays} Day
            </h3>
            <h3 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰 {trip.userSelection?.budget} Budget
            </h3>
            <h3 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              🥂 No. Of Traveler: {trip.userSelection?.traveler}{" "}
            </h3>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default InformationSection;

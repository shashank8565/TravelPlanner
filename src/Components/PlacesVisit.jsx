import React from "react";
import PlaceCard from "./PlaceCard";

const PlacesVisit = ({ trip }) => {
  return (
    <div>
      <h3 className="font-bold text-lg">Places to Visit</h3>

      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div className="mt-5">
            <h3 className="font-medium text-lg">{item.day}</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {item.plan.map((place, index) => (
                <div className="">
                  <h3 className="font-medium text-sm text-orange-600">
                    {place.time}
                  </h3>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesVisit;

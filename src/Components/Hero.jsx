import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[40px] text-center mt-16">
        <span className="text-[#0702a6]"> WanderWise </span>- Your Smart Travel
        Companion
      </h1>
      <h2 className="font-extrabold text-[20px] text-center mt-1">
        Plan. Explore. Experience.
      </h2>
      <p className="text-xl text-gray-500 text-center">
        Effortless Travel Planning at Your Fingertips Say goodbye to the hassle
        of organizing your trips! Our AI-powered Trip Planner helps you create
        personalized itineraries, find the best travel routes, and explore top
        destinations—all in one place.
      </p>
      <Link to={"/createTrip"}>
        <Button variant="outline">Lets Travel</Button>
      </Link>
    </div>
  );
};

export default Hero;

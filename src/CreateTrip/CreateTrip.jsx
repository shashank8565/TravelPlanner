import React, { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState } from "react";
import { SelectBudgetOptions } from "../constants/options";
import { SelectTravelesList } from "../constants/options";
import { ToastContainer, toast } from "react-toastify";
import { AI_PROMPT } from "../constants/options";
import { chatSession } from "../service/Gemini";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseconfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  function handleInputChange(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  useEffect(() => {
    console.log(place);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onClickGenerate = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast(" Error occured ");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result.response.text());

    SaveTrip(result.response.text());
  };

  const SaveTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = Date.now().toString();
    await setDoc(doc(db, "Trips", id), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      Email: user?.email,
      id: id,
    });

    navigate("/view-trip/" + id);
    location.reload();
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        // console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onClickGenerate();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-15 flex flex-col gap-10">
        <div>
          <h2 className=" my-3 mb-5 ">What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
                console.log("Selected Place:", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="my-3 mb-5">
            How many days are you planning your trip?
          </h2>
          <Input
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium mt-10">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer 
              rounded-lg hover:shadow-lg
              ${formData?.budget == item.title && "shadow-lg border-black"}
              `}
            >
              <h3 className="text-4xl">{item.icon}</h3>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <h3 className="text-sm text-gray-500">{item.desc}</h3>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="my-3 mt-10">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-8">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border cursor-pointer rounded-lg
               hover:shadow-lg
               ${formData?.traveler == item.people && "shadow-lg border-black"}
               `}
            >
              <h3 className="text-4xl">{item.icon}</h3>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <h3 className="text-sm text-gray-500">{item.desc}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="my-3 mt-5 flex justify-end">
        <Button onClick={() => onClickGenerate()}>Generate Trip</Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/Main.svg" />
              <h3 className="font-bold text-lg mt-7">Sign In With Google</h3>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FaGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./CreateTrip/CreateTrip.jsx";
import Header from "./Components/Header.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import path from "path";
import TripData from "./view-trip/[tripId]/tripData";
import SaveTrips from "./myTrips/SaveTrips";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/createTrip",
    element: <CreateTrip />,
  },

  {
    path: "/view-trip/:tripId",
    element: <TripData />,
  },
  {
    path: "/my-trips",
    element: <SaveTrips />,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);

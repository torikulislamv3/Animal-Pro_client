
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Component Files/Root";
import Home from "./Component Files/Home";
import ErrorPage from "./error-page";
import PetListing from "./Component Files/Pet Listing/PetListing";
import DetailsPet from "./Component Files/Pet Listing/DetailsPet";
import LoginPage from "./Component Files/Authentication/LoginPage";
import Register from "./Component Files/Authentication/Register";
import PrivetRoute from "./PrivateRoute/PrivetRoute";
import DonationCamp from "./Component Files/Donation Campaigns/DonationCamp";
import DashboardRoot from "./Component Files/Dashboard Layout/DashboardRoot";
import AddPet from "./Component Files/Dashboard Layout/Add PET/AddPet";
import AddedPetTable from "./Component Files/Dashboard Layout/Add PET/AddedPetTable";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AuthProvider from "./Component Files/Provider/AuthProvider";
import React from "react";
import UpdatePet from "./Component Files/Dashboard Layout/Add PET/UpdatePet";
import CreateCamp from "./Component Files/Dashboard Layout/CreateDonationCamp/CreateCamp";
import MyDonationCamp from "./Component Files/Dashboard Layout/CreateDonationCamp/MyDonationCamp";
import UpdateCamp from "./Component Files/Dashboard Layout/CreateDonationCamp/UpdateCamp";
import MyDonation from "./Component Files/Dashboard Layout/My Donation/MyDonation";
import AllUsers from "./Component Files/Dashboard Layout/Admin Dashboard/AllUsers";
import AllPets from "./Component Files/Dashboard Layout/Admin Dashboard/AllPets";
import AllDonation from "./Component Files/Dashboard Layout/Admin Dashboard/AllDonation";
import DetailsDonation from "./Component Files/Donation Campaigns/DetailsDonation";
import PaymentDetails from "./Component Files/Donation Campaigns/PaymentDetails";
import AdoptionReq from "./Component Files/Dashboard Layout/AdoptionReq";
const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/petListing",
        element: <PetListing></PetListing>,
        // loader: () => fetch("http://localhost:5000/all-animals"),
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/donationCamp",
        element: <DonationCamp></DonationCamp>,
        loader: ()=> fetch('http://localhost:5000/DonationCamp')
      },
      {
        path : "/DonationCamp/:id",
        element: <PrivetRoute>
          <DetailsDonation></DetailsDonation>
        </PrivetRoute>,
        loader: ({ params }) =>fetch(`http://localhost:5000/DonationCamp/${params.id}`)
      },
      {
        path: "/Payment/:id",
        element: <PaymentDetails></PaymentDetails>,
        loader: ({ params }) =>fetch(`http://localhost:5000/DonationCamp/${params.id}`)

      },
      {
        path: "/animals/:id",
        element: 
          <PrivetRoute>
            <DetailsPet></DetailsPet>
          </PrivetRoute> ,
        loader: ({ params }) =>fetch(`http://localhost:5000/animals/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardRoot></DashboardRoot>,
    children: [
      {
        path: "/dashboard/addPet",
        element: (
          <PrivetRoute>
            <AddPet></AddPet>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/myPetItems",
        element: <PrivetRoute>
          <AddedPetTable></AddedPetTable>
        </PrivetRoute>,
        loader: () => fetch("http://localhost:5000/animals"),
        
      },
      {
        path: "/dashboard/AdoptedReq",
        element: <PrivetRoute>
          <AdoptionReq></AdoptionReq>
        </PrivetRoute>,
        // loader: () => fetch("http://localhost:5000/adoption-request")
      },
      {
        path: "/dashboard/updatePet/:id",
        element: <PrivetRoute>
          <UpdatePet></UpdatePet>
        </PrivetRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/animals/${params.id}`)
      },
      {
        path: "/dashboard/updateCamp/:id",
        element: <PrivetRoute>
          <UpdateCamp></UpdateCamp>
        </PrivetRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/DonationCamp/${params.id}`)
      },
      {
        path: "/dashboard/createDonation",
        element: <PrivetRoute>
          <CreateCamp></CreateCamp>
        </PrivetRoute>
      },
      {
        path: '/dashboard/MyDonationCamp',
        element: <PrivetRoute>
          <MyDonationCamp></MyDonationCamp>
        </PrivetRoute>,
        loader: () => fetch("http://localhost:5000/DonationCamp"),
      },
      {
        path: "/dashboard/myDonation",
        element: <PrivetRoute>
          <MyDonation></MyDonation>
        </PrivetRoute>,
        loader: ()=> fetch("http://localhost:5000/own-donation")

      },
      // admin routes
      {
        path: "/dashboard/allUser",
        element:<PrivetRoute>
           <AllUsers></AllUsers>
        </PrivetRoute>
      },
      {
        path: "/dashboard/allPets",
        element: <PrivetRoute>
          <AllPets></AllPets>
        </PrivetRoute>
      },
      {
        path: "/dashboard/allDonation",
        element: <PrivetRoute>
          <AllDonation></AllDonation>
        </PrivetRoute>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);

import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../Component Files/Provider/AuthProvider";

const useDonationList = () => {
    const {user} =  useContext(AuthContext);
    const axiosHook = useAxios();
    const { refetch ,data : donationList = []} = useQuery({
        queryKey: ["donationList", user?.email],
        queryFn: async () =>{
            const res = await axiosHook.get(`/DonationCampOwn?email=${user.email}`)
            return res.data;
        }
    })
    return  [donationList, refetch]
};

export default useDonationList;
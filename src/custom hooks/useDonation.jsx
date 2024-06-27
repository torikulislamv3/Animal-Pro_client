import { useContext } from "react";
import { AuthContext } from "../Component Files/Provider/AuthProvider";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useDonation = () => {
    const {user} =  useContext(AuthContext);
    const axiosHook = useAxios();
    const { refetch ,data : donation = []} = useQuery({
        queryKey: ["donation", user?.email],
        queryFn: async () =>{
            const res = await axiosHook.get(`/own-donation?email=${user.email}`)
            return res.data;
        }
    })
    return [donation, refetch]
}

export default useDonation;
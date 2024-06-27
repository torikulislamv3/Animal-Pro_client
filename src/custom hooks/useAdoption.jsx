import { useContext } from "react";
import { AuthContext } from "../Component Files/Provider/AuthProvider";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useAdoption = () => {
    
        const {user} =  useContext(AuthContext);
        const axiosHook = useAxios();
        const { refetch ,data : adoptionRequest = []} = useQuery({
            queryKey: ["adoptionRequest", user?.email],
            queryFn: async () =>{
                const res = await axiosHook.get(`/adoption-request?email=${user.email}`)
                return res.data;
            }
        })
        return [adoptionRequest, refetch]
    
};

export default useAdoption;
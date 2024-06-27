import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../Component Files/Provider/AuthProvider";

const useAddedPet = () => {
    const {user} =  useContext(AuthContext);
    const axiosHook = useAxios();
    const { refetch ,data : addedPet = []} = useQuery({
        queryKey: ["addedPet", user?.email],
        queryFn: async () =>{
            const res = await axiosHook.get(`/animals?email=${user.email}`)
            return res.data;
        }
    })
    return [addedPet, refetch]
};

export default useAddedPet;
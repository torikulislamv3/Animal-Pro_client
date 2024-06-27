import { useContext } from "react";
import { AuthContext } from "../Component Files/Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useAdmin = () => {
   const {user} = useContext(AuthContext);
   const axiosHook = useAxios()
   const {data : isAdmin} = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async()=>{
        const res = await axiosHook.get(`/users/admin/${user?.email}`, {
            headers: {
              authorization : `Bearer ${localStorage.getItem('access-token')}`
            }
          })
          //console.log(res.data);
          return res.data?.isAdmin
    }
   })
   return isAdmin
};

export default useAdmin;


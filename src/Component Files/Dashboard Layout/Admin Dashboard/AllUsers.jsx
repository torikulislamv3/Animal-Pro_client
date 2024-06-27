import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../custom hooks/useAxios";
import { RiAdminFill } from "react-icons/ri";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosHook = useAxios();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosHook.get("/users",{
        headers: {
          authorization : `Bearer ${localStorage.getItem('access-token')}`
        }
      });
      return res.data;
    },
  });

  const handleMakeAdmin = user =>{
    axiosHook.patch(`/users/admin/${user._id}`)
    .then(res=>{
        //console.log(res.data);
        if(res.data.modifiedCount > 0){
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is an Admin now!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
  }
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>
              <h1>S.L</h1>
            </th>
            <th>image</th>
            <th>name</th>
            <th>email</th>
            <th>role</th>
           
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={users._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={user.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <th>
                {user.role==="admin" ? <span className="text-yellow-600">admin</span> : <button
                onClick={()=>handleMakeAdmin(user)}
                title="make admin"
                className="btn btn-ghost btn-xl">
                <RiAdminFill className="text-3xl" />
                </button>}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;

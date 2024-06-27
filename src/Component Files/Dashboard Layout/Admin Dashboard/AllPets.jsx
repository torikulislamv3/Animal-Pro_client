import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../custom hooks/useAxios";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const AllPets = () => {
    const axiosHook = useAxios();
    const { data: animals = [], refetch } = useQuery({
        queryKey: ["animals"],
        queryFn: async () => {
          const res = await axiosHook.get("/all-animals-admin",{
            headers: {
              authorization : `Bearer ${localStorage.getItem('access-token')}`
            }
          });
          return res.data;
        },
      });


      const handeDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosHook.delete(`/animals/${id}`).then((res) => {
              if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
            });
          }
        });
      };
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
            <th> pet name</th>
            <th>age</th>
            <th>location</th>
            <th>added date</th>
            <th>category</th>
            <th>Delete</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {animals?.map((animal, index) => (
            <tr key={animals._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={animal.petImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{animal.petName}</td>
              <td>{animal.petAge}</td>
              <th>
                {animal.petLocation}
              </th>
              <th>
                {animal.addedDate}
              </th>
              <td>
                {animal.category}
              </td>
              <td>
              <Link to={`/dashboard/updatePet/${animal._id}`}>
                  <button className="btn btn-ghost btn-xs">
                    <FaEdit
                      className="font-bold text-xl text-black"
                      title="update"
                    ></FaEdit>
                  </button>
                </Link>
              </td>
              <td>
                <button
                onClick={() => handeDelete(animal._id)}
                className="btn btn-outline hover:bg-red-700">
                
                <MdDeleteForever className="text-2xl" />
                </button>
              </td>
              <td className="flex gap-2">
                <button className="btn hover:bg-yellow-400">adopted</button>
                <button className="btn hover:bg-yellow-400">not adopted</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default AllPets;
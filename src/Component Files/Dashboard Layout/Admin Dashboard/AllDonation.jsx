import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../custom hooks/useAxios";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllDonation = () => {

    const axiosHook = useAxios();
    const { data: donation = [], refetch } = useQuery({
        queryKey: ["donation"],
        queryFn: async () => {
          const res = await axiosHook.get("/DonationCamp",{
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
            axiosHook.delete(`/DonationCamp/${id}`).then((res) => {
              if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                  title: "Deleted!",
                  text: "iYour fle has been deleted.",
                  icon: "success",
                });
              }
            });
          }
        });
      };
    return (
        <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <h1>S.L</h1>
            </th>
            <th>image</th>
            <th>name</th>
            <th>owner</th>
            <th>status</th>
            <th>update</th>
            <th>delete</th>
            <th>donation</th>
          </tr>
        </thead>
        <tbody>
          {donation?.map((donate, index) => (
            <tr key={donate._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={donate.petImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{donate.petName}</td>
              <td>{donate.owner_name}</td>
              <th>
                <button className="btn btn-ghost btn-xs">$ <span className="text-red-700">{donate.MaxAmount
                }</span></button>
              </th>
              <th>
                <Link to={`/dashboard/updatePet/${donate._id}`}>
                  <button className="btn btn-ghost btn-xs">
                    <FaEdit
                      className="font-bold text-xl text-black"
                      title="update"
                    ></FaEdit>
                  </button>
                </Link>
              </th>
              <th>
                <Link>
                  <button
                    onClick={() => handeDelete(donate._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTrash
                      className="font-bold text-xl text-black"
                      title="delete"
                    ></FaTrash>
                  </button>
                </Link>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs">pause Now!</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default AllDonation;
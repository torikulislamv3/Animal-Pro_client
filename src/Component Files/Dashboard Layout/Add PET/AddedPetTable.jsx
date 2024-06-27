import { FaEdit, FaTrash } from "react-icons/fa";
import useAddedPet from "../../../custom hooks/useAddedPet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../../custom hooks/useAxios";

const AddedPetTable = () => {
  const [addedPet, refetch] = useAddedPet();
  const axios = useAxios();

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
        axios.delete(`/animals/${id}`).then((res) => {
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
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <h1>S.L</h1>
            </th>
            <th>image</th>
            <th>name</th>
            <th>category</th>
            <th>status</th>
            <th>update</th>
            <th>delete</th>
            <th>adopted</th>
          </tr>
        </thead>
        <tbody>
          {addedPet?.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.petImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{item.petName}</td>
              <td>{item.category}</td>
              <th>
                <button className="btn btn-ghost btn-xs">status</button>
              </th>
              <th>
                <Link to={`/dashboard/updatePet/${item._id}`}>
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
                    onClick={() => handeDelete(item._id)}
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
                <button className="btn btn-ghost btn-xs">adopted</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddedPetTable;

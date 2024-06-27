import { FaEdit } from "react-icons/fa";
// import useAddedPet from "../../../custom hooks/useAddedPet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import useAxios from "../../../custom hooks/useAxios";
import useDonationList from "../../../custom hooks/useDonationList";
import { HiPauseCircle } from "react-icons/hi2";

const MyDonationCamp = () => {
    const [addedPet] = useDonationList()
    // const axios = useAxios()

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
              <th>max amount</th>
              <th>progress</th>
              <th>edit</th>
              <th>pause</th>
              <th>details</th>
              
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
                <td>${item.MaxAmount}</td>
                <th>
                <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{"--value":0}} role="progressbar">0%</div>
                </th>
                <th>
                  <Link to={`/dashboard/updateCamp/${item._id}`}>
                    <button className="btn btn-ghost btn-xs">
                      <FaEdit
                        className="font-bold text-xl text-black"
                        title="update"
                      ></FaEdit>
                    </button>
                  </Link>
                </th>
                <th>
                 <button className="btn btn-outline">
                 <h1>pause</h1>
                 <HiPauseCircle className="text-3xl" />
                 </button>
                </th>
                <th>
                  <button className="btn btn-ghost btn-xs">view details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default MyDonationCamp;
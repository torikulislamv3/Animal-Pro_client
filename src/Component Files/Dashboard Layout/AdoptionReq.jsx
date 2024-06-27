import { Link, useLoaderData } from "react-router-dom";
import useAxios from "../../custom hooks/useAxios";
import useAdoption from "../../custom hooks/useAdoption";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdoptionReq = () => {
    const [adoptionRequest] = useAdoption();
    //console.log(adoptionRequest);
    const axios = useAxios();
    return (
        <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <h1>S.L</h1>
            </th>
            
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>location</th>
            <th>action</th>
            
          </tr>
        </thead>
        <tbody>
          {adoptionRequest?.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
              
              <td>{item.name}</td>
              <td>{item.email}</td>
              <th>
                {item.number}
              </th>
              <th>
               {item.location}
              </th>
              <th className="flex gap-2">
                <button className="btn btn-outline"><h2>accept</h2></button>
                <button className="btn btn-outline"><h2>reject</h2></button>
              </th>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default AdoptionReq;
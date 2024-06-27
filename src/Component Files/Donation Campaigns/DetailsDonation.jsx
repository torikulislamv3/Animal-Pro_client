import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";

const DetailsDonation = () => {
  const { user } = useContext(AuthContext);
  const item = useLoaderData();
  const {
    petImage,
    petName,
    petAge,
    petLocation,
    addedDate,
    _id,
    MaxAmount,
    LastDate,
    shortDescription,
  } = item;
  return (
    <div className="bg-red-400">
      <div className="card mx-auto text-[#FFF] h-full w-96 bg-slate-800 hover:bg-yellow-600 shadow-xl">
        <figure>
          <img className="h-[300px]" src={petImage} alt={petName} />
        </figure>
        <div className="card-body hover:text-blue-950">
          <div className="flex justify-between">
            <h2 className="card-title text-xl font-bold justify-center -mt-6">
              Name : {petName}
            </h2>
            <h2 className="card-title text-2xl font-bold justify-center -mt-6">
              Max : ${MaxAmount}
            </h2>
          </div>
          <h2 className="card-title text-2xl font-bold justify-center">
            Last-Date : {LastDate}
          </h2>
          <h2 className="card-title text-2xl font-bold justify-center">
            Description : {shortDescription} month
          </h2>
          <h2 className="card-title text-2xl font-bold justify-center">
            {/* Date : {addedDate} month */}
          </h2>
          <p className="text-center text-xl"> ID : {_id}</p>
          <div className="card-actions justify-center">
            {/* <Link to="/Payment"> */}
            <Link to={`/payment/${item._id}`}>
              <button className="btn btn-primary bg-white text-black w-full hover:text-yellow-500 hover:bg-gray-950">
                <span className="font-bold text-2xl">Donate</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
               
    </div>
  );
};

export default DetailsDonation;

import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardListing = ({ item }) => {
  const { category, petImage, petName, petAge, petLocation, addedDate, _id } = item;
  return (
    <div>
      <div className="card text-[#FFF] h-full w-96 bg-slate-800 hover:bg-yellow-600 shadow-xl">
        <figure>
          <img
          className="h-[300px]"
            src={petImage}
            alt={name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-5xl font-bold justify-center -mt-6">{petName}</h2>
          <p className="text-center mt-1 text-xl">Age : {petAge}</p>
          <p className="text-center mt-1 text-xl"> Location: {petLocation}</p>
          <div className="card-actions justify-center">
           <Link to={`/animals/${_id}`}>
           <button className="btn btn-primary bg-white text-black w-full hover:text-yellow-500 hover:bg-gray-950"><span className="font-bold text-2xl">Details</span></button>
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardListing;

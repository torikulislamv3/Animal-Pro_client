import { Link } from "react-router-dom";

const CardCategory = ({ item }) => {
  const { category, short_description, img, name } = item;
  return (
    <div>
      <div className="card text-[#FFF] h-full w-96 bg-slate-800 hover:bg-yellow-600 shadow-xl">
        <figure>
          <img
          className="h-[300px]"
            src={img}
            alt={name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-5xl font-bold justify-center -mt-6">{category}</h2>
          <p className="text-center mt-5 text-xl">{short_description}</p>
          <div className="card-actions justify-center">
           <Link to="/petListing">
           <button className="btn btn-primary bg-white text-black w-full hover:text-yellow-500 hover:bg-gray-950"><span className="font-bold text-2xl">Pet List</span></button>
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCategory;

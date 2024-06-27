import { Link } from "react-router-dom";

const CardImotion = ({item}) => {
    const {satisfaction_description, img, category} = item;
    return (
        <div className="card text-[#FFF] bg-slate-800 hover:bg-yellow-600 lg:card-side shadow-xl  mt-10">
  <figure><img className="w-5/6" src={img} alt={category}/></figure>
  <div className="card-body">
    <h2 className="card-title text-5xl font-bold">{category}</h2>
    <p className="text-xl">{satisfaction_description}</p>
    <div className="card-actions justify-end">
      <Link to="/donationCamp">
      <button className="btn btn-primary bg-white text-black w-full hover:text-yellow-500 hover:bg-gray-950"><span className="font-bold text-2xl">Action</span></button>
      </Link>
    </div>
  </div>
</div>
    );
};

export default CardImotion;
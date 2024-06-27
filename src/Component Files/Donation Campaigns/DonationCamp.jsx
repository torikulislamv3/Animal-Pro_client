import { Link, useLoaderData } from "react-router-dom";
import Banner from "./Banner";

const DonationCamp = () => {
  const donationCamp = useLoaderData();


  return (
    <div>
      <Banner></Banner>
      <section className="grid gap-2 lg:grid-cols-3 md:grid-cols-2">
        {donationCamp?.map((item) => ( 
          <div key={item._id}>
            <div className="card text-[#FFF] h-full w-96 bg-slate-800 hover:bg-yellow-600 shadow-xl">
              <figure>
                <img className="h-[300px]" src={item.petImage} alt={name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-5xl font-bold justify-center -mt-6">
                  {item.petName}
                </h2>
                <p className="text-center mt-1 text-xl">Max-Amount : {item.MaxAmount}</p>
                <p className="text-center mt-1 text-xl">
                  {" "}
                 Donated Amount: {0}
                </p>
                <div className="card-actions justify-center">
                  <Link to={`/DonationCamp/${item._id}`}>
                    <button className="btn btn-primary bg-white text-black w-full hover:text-yellow-500 hover:bg-gray-950">
                      <span className="font-bold text-2xl">Details</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DonationCamp;

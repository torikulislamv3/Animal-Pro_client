import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import  { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const DetailsPet = () => {
  const {user} = useContext(AuthContext)
  const item = useLoaderData();
  const { owner_email , category, petImage, petName, petAge, petLocation, addedDate, _id } =
    item;
    //console.log(item);

    const handleAdopt = e =>{
      e.preventDefault()
      const form = e.target;
      const email = form.email.value;
      const name = form.name.value;
      const location = form.location.value;
      const number = form.number.value;
      const petName = form.petName.value;
      const category = form.category.value;
      const id = form.id.value;
      const owner_email = form.owner_email.value;
      const AdoptItem = 
       { id: id,
         category : category,
          petName : petName,
          number : number,
          location : location,
          name : name,
          email : email,
          owner_email : owner_email
        }
        ;
        //console.log(AdoptItem);
        fetch('http://localhost:5000/adoption', {
          method : 'POST',
          headers :  {
              'content-type' : 'application/json'
            },
            body: JSON.stringify(AdoptItem)
            
        })
        .then(res => res.json())
            .then(data => {
              //console.log(data);
              if(data.insertedId){
                Swal.fire("Successfully Adopt Your Item");
              }
            })

    }
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
              Category : {category}
            </h2>
          </div>
          <h2 className="card-title text-2xl font-bold justify-center">
            Location : {petLocation}
          </h2>
          <h2 className="card-title text-2xl font-bold justify-center">
            Age : {petAge} month
          </h2>
          <h2 className="card-title text-2xl font-bold justify-center">
            Date : {addedDate} month
          </h2>
          <p className="text-center text-xl"> ID : {_id}</p>
          <div className="card-actions justify-center">
            <div
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <button className="btn btn-primary bg-white text-black w-full hover:text-yellow-500 hover:bg-gray-950">
                <span className="font-bold text-2xl">Adopt</span>
              </button>
            </div>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
               
                
                <div className="card card-side bg-gray-700 shadow-xl text-white">
                  <figure>
                    <img src={petImage} alt="loading.." />
                  </figure>
                  <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                </div>
                <form onSubmit={handleAdopt} className="mt-5">
              
                   
                  <div className="flex">
                  <h3>Pet Name:</h3>
                    <input  type="text" name="petName" className="grow text-center text-yellow-600"defaultValue={petName} disabled />
                  </div>
                   
                   <div className="flex">
                   <h3>Category:</h3>
                    <input  type="text" name="category" className="grow text-center text-yellow-600"defaultValue={category} disabled />
                   </div>
                   <div className="flex">
                   <h3>ID : </h3>
                    <input  type="text" name="id" className="grow text-center text-yellow-600"defaultValue= {_id} disabled />
                   </div>
                   <div className="flex">
                   <h3>owner_email : </h3>
                    <input  type="text" name="owner_email" className="grow text-center text-yellow-600"defaultValue= {owner_email} disabled />
                   </div>
                 
                  <div className="flex gap-1">
                    <label className="input input-bordered flex items-center gap-2">
                      <input name="email" type="text" placeholder="Email" className="grow text-yellow-700" defaultValue={user?.email} disabled />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <input
                      name="name"
                        type="text"
                        className="grow text-yellow-700"
                        placeholder="Username"
                        defaultValue={user?.displayName}
                        disabled
                      />
                    </label>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                      name="location"
                        type="text"
                        className="grow"
                        placeholder="Location"
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                      <input
                      name="number"
                        type="number"
                        className="grow"
                        placeholder="Phone Number"
                      />
                    </label>
                    
                    
                  </div>
                  {/* <label className="mt-2 input input-bordered flex items-center gap-2">
                      <input
                      name="owner-email"
                        type="email"
                        className="grow"
                        // placeholder="Your Email"
                        defaultValue={owner_email}

                      />
                    </label> */}
                  <input
                  
                    className="w-full border p-2 mt-2 w-2/3 mx-auto rounded-lg bg-green-600 text-white font-bold text-2xl hover:text-black hover:bg-white"
                    type="submit"
                    value="Submit Now"
                  />
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPet;




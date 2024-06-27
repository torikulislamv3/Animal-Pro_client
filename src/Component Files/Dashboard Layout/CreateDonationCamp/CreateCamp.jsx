import { useContext} from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const imgHostingKey = import.meta.env.VITE_imgbb_key;
//console.log(imgHostingKey);
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const CreateCamp = () => {

  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //console.log(data);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const response = await fetch(img_hosting_api, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      //console.log("Image uploaded successfully:", responseData);

      if (responseData.success) {
        const petItem = {
          petName :data.petName,
          petImage: responseData.data.display_url,
          owner_email: data.userEmail,
          owner_name: data.userName,
          shortDescription : data.shortDescription,
          longDescription: data.longDescription,
          LastDate : data.LastDate,
          MaxAmount : data.MaxAmount,

        };
        //console.log(petItem);
        fetch('http://localhost:5000/DonationCamp', {
          method : 'POST',
          headers :  {
              'content-type' : 'application/json'
            },
            body: JSON.stringify(petItem)
        })
        .then(res=> res.json())
        .then(data=>{
      
          if(data.insertedId){
            Swal.fire({
              icon: "success",
              title: "Congratulation!",
              text: "Your Campaign has been Added",
              footer: '<p>Thank You</p>'
            })
          }
        })
        
      } else {
        console.error("Image upload failed:", responseData);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  return (
    <div>
       <div className="mt-[20%]">
      <h1 className="text-center w-3/4 border text-yellow-600 text-2xl font-bold mb-5 bg-yellow-200">
        Create Your Campaign
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:flex border w-3/4 text-center p-10 bg-black bg-opacity-45">
          <div>
            <h2>user email</h2>
            <input
              defaultValue={user.email}
              {...register("userEmail")}
              type="text"
              placeholder="Email"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            <h2>maximum amount for donation</h2>
            <input
              {...register("MaxAmount", { required: true })}
              type="text"
              placeholder="$"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            {errors.MaxAmount && (
              <span className="text-red-900">This field is required</span>
            )}
              <h2>Last date of donation</h2>
            <input
              {...register("LastDate", { required: true })}
              type="date"
              placeholder="Pet Age"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            {errors.LastDate && (
              <span className="text-red-900">This field is required</span>
            )}
                <h2>Pet Name</h2>
            <input
              {...register("petName", { required: true })}
              type="text"
              placeholder="Pet Name"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            {errors.petLocation && (
              <span className="text-red-900">This field is required</span>
            )}

              input img file
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
            />
            {errors.image && (
              <span className="text-red-900">This field is required</span>
            )}
          </div>
          <div>
            user name
            <input
              defaultValue={user?.displayName}
              {...register("userName")}
              type="text"
              placeholder="UserName"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            <h2>short description for pet</h2>
            <input
              {...register("shortDescription", { required: true })}
              type="text"
              placeholder="Short Description"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            {errors.shortDescription && (
              <span className="text-red-900">This field is required</span>
            )}

                  <h2>long description</h2>
            <textarea
              {...register("longDescription", { required: true })}
              className="textarea textarea-warning w-full"
              placeholder="Long Description for details your pet"
            ></textarea>
            {errors.longDescription && (
              <span className="text-red-900">This field is required</span>
            )}
          </div>
          <input
            className="border lg:ml-10 bg-yellow-100 text-blue-900 font-bold text-2xl p-3 rounded-full hover:bg-red-400 hover:text-white"
            type="submit"
            value="Add Campaign"
          />
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateCamp;

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const imgHostingKey = import.meta.env.VITE_imgbb_key;
//console.log(imgHostingKey);
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const AddPet = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedOption, setSelectedOption] = useState(null);

  const onSubmit = async (data) => {
    data.category = selectedOption.value;
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
          category: data.category,
          petImage: responseData.data.display_url,
          petName: data.petName,
          petAge: data.petAge,
          petLocation: data.petLocation,
          owner_email: data.userEmail,
          owner_name: data.userName,
          shortDescription : data.shortDescription,
          longDescription: data.longDescription
        };
        //console.log(petItem);
        fetch('http://localhost:5000/animals', {
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
              text: "Your Pet has been Added",
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

  const options = [
    { value: "Cat", label: "Cat" },
    { value: "Dog", label: "Dog" },
    { value: "Parrot", label: "Parrot" },
    { value: "Hamster", label: "Hamster" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "GoldFish", label: "GoldFish" },
  ];

  return (
    <div className="mt-[20%]">
      <h1 className="text-center w-3/4 border text-yellow-600 text-2xl font-bold mb-5 bg-yellow-200">
        Add Your Pet
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:flex border w-3/4 text-center p-10 bg-black bg-opacity-45">
          <div>
            <input
              defaultValue={user.email}
              {...register("userEmail")}
              type="text"
              placeholder="Email"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            <input
              {...register("petName", { required: true })}
              type="text"
              placeholder="Pet Name"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            {errors.petName && (
              <span className="text-red-900">This field is required</span>
            )}

            <input
              {...register("petAge", { required: true })}
              type="text"
              placeholder="Pet Age"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            {errors.petAge && (
              <span className="text-red-900">This field is required</span>
            )}

            <input
              {...register("petLocation", { required: true })}
              type="text"
              placeholder="Pet Location"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            {errors.petLocation && (
              <span className="text-red-900">This field is required</span>
            )}

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
            <input
              defaultValue={user?.displayName}
              {...register("userName")}
              type="text"
              placeholder="UserName"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            <input
              {...register("shortDescription", { required: true })}
              type="text"
              placeholder="Short Description"
              className="input input-bordered input-accent w-full max-w-xs mb-4"
            />
            {errors.shortDescription && (
              <span className="text-red-900">This field is required</span>
            )}

            <Select
              className="input input-bordered input-accent w-full max-w-xs mb-4"
              placeholder="Category"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            {errors.category && (
              <span className="text-red-900">This field is required</span>
            )}

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
            value="Add Now"
          />
        </div>
      </form>
    </div>
  );
};

export default AddPet;

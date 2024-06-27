import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const imgHostingKey = import.meta.env.VITE_imgbb_key;
//console.log(imgHostingKey);
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const Register = () => {
  const { createUser, signInWithGithub, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const apiKey = imgHostingKey;
    const url = img_hosting_api;
    const response = await axios.post(url, formData);
    return response.data.data.url;
  };

  const onSubmit = async (data) => {
    try {
      const imageUrl = await uploadImageToImgbb(data.photoURL[0]);
      data.photoURL = imageUrl;
      //console.log(data);

      const result = await createUser(data.email, data.password);
      const user = result.user;

      const userInfo = {
        name: data.name,
        email: data.email,
        image : data.photoURL
      };

      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      Swal.fire({
        title: "Congratulations",
        text: "Your Account Created Successfully",
        icon: "success",
      });

      //console.log(user);
      await updateUserProfile(data.name, data.photoURL);
      //console.log("Profile is updated");

      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong!",
        icon: "error",
      });
    }
  };

  const handleGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        navigate("/");
        //console.log(result.user);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          image : result.user?.photoURL
        };
  
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
        .then(res =>{
          //console.log(res.data);
        })
        Swal.fire({
          title: "Congratulations",
          text: "Your Google account logged In",
          icon: "success",
        });
        //console.log(result.user);
      })

  };

  const handleGithub = () => {
    signInWithGithub()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          image : result.user?.photoURL
        };
  
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
        .then(res =>{
          //console.log(res.data);
        })
        navigate("/");
        Swal.fire({
          title: "Congratulations",
          text: "Your Github account logged In",
          icon: "success",
        });
        //console.log(result.user);
      })
      .catch((error) => {
        //console.log(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-yellow-900">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center max-w-screen-sm lg:text-left">
          <img
            className="rounded-lg"
            src="https://i.ibb.co/wSmxbqG/access-3579221-1280.jpg"
            alt="authentication"
          />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="flex text-center mx-auto gap-10 text-4xl ">
              <p
                onClick={handleGoogle}
                className="text-white border rounded-full p-3 bg-stone-500 hover:text-green-700 hover:bg-white hover:scale-110"
              >
                <FaGoogle />
              </p>
              <p
                onClick={handleGithub}
                className="text-white border rounded-full p-3 bg-stone-500 hover:text-green-700 hover:bg-white hover:scale-110"
              >
                <FaGithub />
              </p>
            </div>
            <div>
              <hr className="w-2/4 mx-auto mt-4 text-red-600" />
              <p className="text-center">or</p>
              <hr className="w-2/4 mx-auto" />
            </div>
            <div className="">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  name="name"
                  type="text"
                  placeholder="Your Full Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-700">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-700">Email is required</span>
                )}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern:
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
                })}
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-700">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-700">
                  Password must be 8 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-700">
                  Password not more than 20 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-700">
                  Password must be 1 uppercase, 1 lowercase and using special
                  (@$!%*?&) characters
                </span>
              )}
              <div className="flex justify-between mt-2 text-purple-500">
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Already have an account?
                  </a>
                </label>
                <Link to="/login">
                  <button className="border p-[2px] rounded-lg hover:uppercase">
                    Login Now
                  </button>
                </Link>
              </div>
              <h1>Choose Your Photo</h1>
              <input
                {...register("photoURL", { required: true })}
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-3"
              />
            </div>
            {errors.photoURL && (
              <span className="text-red-700">PHOTO is required</span>
            )}
            <div className="form-control mt-6">
              <input
                className="btn bg-yellow-900 text-white hover:text-black text-xl"
                type="submit"
                value="Registration"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

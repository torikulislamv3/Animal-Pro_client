import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  // const from = location.state?.pathname || "/";

  const { signIn, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password).then((result) => {
      navigate("/");
      Swal.fire({
        title: "Congratulations",
        text: "Logged In Successfully",
        icon: "success",
      });
      const user = result.user;
      //console.log(user);
    });
  };

  const handleGoogle = () => {
    signInWithGoogle()
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
        }).then((res) => {
          //console.log(res.data);
        });
        navigate("/");
        Swal.fire({
          title: "Congratulations",
          text: "Your Google account logged In",
          icon: "success",
        });
        //console.log(result.user);
      })

      .catch((error) => {
        //console.log(error.message);
      });
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
          text: "Your Google account logged In",
          icon: "success",
        });
        //console.log(result.user);
      })
      .catch((error) => {
        //console.log(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-yellow-950">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center max-w-screen-sm lg:text-left">
          <img
            className="rounded-lg"
            src="https://i.ibb.co/wSmxbqG/access-3579221-1280.jpg"
            alt="authentication"
          />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="input your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="input your password"
                className="input input-bordered"
                required
              />
              <div className="flex justify-between mt-2 text-purple-500">
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Don't have an account?
                  </a>
                </label>
                <Link to="/register">
                  <button className="border p-[2px] rounded-lg hover:uppercase">
                    Register Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn bg-yellow-900 text-white hover:text-black text-xl"
                type="submit"
                value="Login"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

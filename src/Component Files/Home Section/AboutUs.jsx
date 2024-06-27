import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-yellow-900 mt-10 mb-5">
        Abut Us
      </h2>
      <section>
        <div className="grid lg:grid-cols-2 lg:card-side bg-yellow-700 shadow-xl">
          <figure>
            <img
              className="w-full"
              src="https://i.ibb.co/9VpQtYV/AboutUs.jpg"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-white text-5xl font-bold">
              Animals Pro!
            </h2>
            <p className="text-purple-800 font-semibold text-3xl">
              why our website ?
            </p>
            <p className="text-white lg:-mt-[200px]">
              Our website is dedicated to connecting compassionate individuals
              with animals in need. By facilitating donations and adoptions, we
              strive to provide better lives for pets while promoting animal
              welfare. Our platform allows donors to contribute easily to
              various animal rescue campaigns and supports adopters in finding
              their perfect furry friends. We believe every animal deserves a
              loving home and a happy life. Our mission is to create a
              supportive community of animal lovers who are committed to making
              a positive impact. Join us in our effort to ensure that every pet
              gets the care and attention they deserve.
            </p>
            <h3 className="font-normal text-2xl text-black lg:-mt-[200px]">
              You can connect with us.
            </h3>
            <div className="flex gap-4">
              <button className="hover:scale-y-105 hover:text-blue-900">
                <FaFacebook className="font-bold text-white text-4xl"></FaFacebook>
              </button>

              <button className="hover:scale-y-105 ">
                <FaTwitter className="font-bold text-white text-4xl"></FaTwitter>
              </button>

              <button className="hover:scale-y-105 hover:text-blue-900">
                <FaInstagram className="font-bold text-white text-4xl"></FaInstagram>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

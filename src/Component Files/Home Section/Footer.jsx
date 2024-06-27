import { Elements } from "@stripe/react-stripe-js";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import CheckoutForm from "../Donation Campaigns/CheckoutForm";

const Footer = () => {
  return (
    <div>
      
      <footer className="footer p-10 bg-yellow-200 text-neutral-content mt-5 items-center">
        <aside>
          <img
            className="size-[100px]"
            src="https://i.ibb.co/cFrcN2g/Logo.jpg"
            alt="logo"
          />
          <p className="text-black font-bold text-2xl">
            Animals Pro Ltd.
            <br />
            Providing reliable tech since 2000
          </p>
          <form>
              <h6 className="footer-title text-fuchsia-900">Newsletter</h6>
              <fieldset className="form-control w-80">
                <label className="label">
                  <span className="label-text">Enter your email address</span>
                </label>
                <div className="join">
                  <input
                    type="text"
                    placeholder="username@site.com"
                    className="input input-bordered join-item"
                  />
                  <button className="btn btn-primary join-item">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>
        </aside>
        <nav>
          <h6 className=" text-black font-semibold text-xl">Why chose us?</h6>
          <p className="text-black text-lg font-bold">
            Our website fosters a community of animal lovers dedicated to
            improving <br /> the lives of pets in need. We simplify donations
            and adoptions, ensuring every <br /> animal finds a loving home.
            Born from a passion for animal welfare, our <br /> mission is to
            create a compassionate world for all pets.
          </p>
          <div className="flex gap-4">
            <button className="hover:scale-y-105 hover:text-blue-900">
              <FaFacebook className="font-bold text-black text-4xl"></FaFacebook>
            </button>

            <button className="hover:scale-y-105 ">
              <FaTwitter className="font-bold text-black text-4xl"></FaTwitter>
            </button>

            <button className="hover:scale-y-105 hover:text-blue-900">
              <FaInstagram className="font-bold text-black text-4xl"></FaInstagram>
            </button>
          </div>
         
        </nav>
      </footer>
    </div>
  );
};

export default Footer;

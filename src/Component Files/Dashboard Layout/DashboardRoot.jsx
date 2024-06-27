import { BiDonateBlood } from "react-icons/bi";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { FcDonate, FcHome } from "react-icons/fc";
import { IoMdAdd } from "react-icons/io";
import { IoCreate } from "react-icons/io5";
import { LuGitPullRequestClosed } from "react-icons/lu";
import {
  MdOutlineBookmarkAdded,
  MdOutlineCampaign,
  MdOutlinePets,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../custom hooks/useAdmin";

const DashboardRoot = () => {
  //TODO: isAdmin value from the database
  const isAdmin = useAdmin();
  //console.log(isAdmin);
  // const isAdmin = true;

  return (
    <div className="flex gap-10">
      {isAdmin ? (
        <div className="w-1/3 lg:w-64 min-h-svh bg-yellow-900 text-center">
          <p className="text-xl underline font-bold text-black">Admin Dashboard</p>
          <ul>
            <li className="pt-10 flex lg:gap-5 items-center">
              {/* <IoMdAdd className="text-3xl text-white" /> */}
              <FaUsersBetweenLines className="text-3xl text-white" />
              <NavLink
                to="/dashboard/allUser"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                All Users
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-5 items-center">
              <MdOutlinePets className="text-3xl text-white" />
              <NavLink
                to="/dashboard/allPets"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                All Pets
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-3 items-center">
              <BiDonateBlood className="text-3xl text-white" />

              <NavLink to="/dashboard/allDonation" className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white">
                All Donations
              </NavLink>
            </li>

            <hr />
            <li className="pt-5 flex lg:gap-3 items-center">
              {/* <FcHome className="text-3xl text-white" /> */}
              {/* <NavLink
                to="/"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                HOme
              </NavLink> */}
            </li>
          </ul>



<p className="text-xl underline font-bold text-black">User Dashboard</p>


          <div className="w-1/3 lg:w-64 min-h-svh bg-yellow-900 text-center">
          <ul>
            <li className="pt-10 flex lg:gap-5 items-center">
              <IoMdAdd className="text-3xl text-white" />
              <NavLink
                to="/dashboard/addPet"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                Add a pet
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-5 items-center">
              <MdOutlineBookmarkAdded className="text-3xl text-white" />
              <NavLink
                to="/dashboard/myPetItems"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                My added pets
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-3 items-center">
              <LuGitPullRequestClosed className="text-3xl text-white" />
              <NavLink to="/dashboard/AdoptedReq" className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white">
                Adoption Request
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-3 items-center">
              <IoCreate className="text-3xl text-white" />
              <NavLink
                to="/dashboard/createDonation"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                Create Donation Campaign
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-3 items-center">
              <MdOutlineCampaign className="text-3xl text-white" />
              <NavLink
                to="/dashboard/MyDonationCamp"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                My Donation Campaigns
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-3 items-center">
              <FcDonate className="text-3xl text-white" />
              <NavLink
                to="/dashboard/myDonation"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                My Donations
              </NavLink>
            </li>
            <hr />
            <li className="pt-5 flex lg:gap-3 items-center">
              <FcHome className="text-3xl text-white" />
              <NavLink
                to="/"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                HOme
              </NavLink>
            </li>
          </ul>
        </div>
        </div>





      ) : (
        <div className="w-1/3 lg:w-64 min-h-svh bg-yellow-900 text-center">
          <ul>
            <li className="pt-10 flex lg:gap-5 items-center">
              <IoMdAdd className="text-3xl text-white" />
              <NavLink
                to="/dashboard/addPet"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                Add a pet
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-5 items-center">
              <MdOutlineBookmarkAdded className="text-3xl text-white" />
              <NavLink
                to="/dashboard/myPetItems"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                My added pets
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-3 items-center">
              <LuGitPullRequestClosed className="text-3xl text-white" />
              <NavLink to="/dashboard/AdoptedReq" className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white">
                Adoption Request
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-3 items-center">
              <IoCreate className="text-3xl text-white" />
              <NavLink
                to="/dashboard/createDonation"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                Create Donation Campaign
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-3 items-center">
              <MdOutlineCampaign className="text-3xl text-white" />
              <NavLink
                to="/dashboard/MyDonationCamp"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                My Donation Campaigns
              </NavLink>
            </li>
            <li className="pt-5 flex lg:gap-3 items-center">
              <FcDonate className="text-3xl text-white" />
              <NavLink
                to="/dashboard/myDonation"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                My Donations
              </NavLink>
            </li>
            <hr />
            <li className="pt-5 flex lg:gap-3 items-center">
              <FcHome className="text-3xl text-white" />
              <NavLink
                to="/"
                className="uppercase text-white text-xl font-semibold rounded-lg lg:rounded-lg lg:p-2 hover:text-green-700 hover:bg-white"
              >
                HOme
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardRoot;

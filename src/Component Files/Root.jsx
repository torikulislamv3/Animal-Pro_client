import { Outlet } from "react-router-dom";
import Navbar from "./Home Section/Navbar";
import Footer from "./Home Section/Footer";

const Root = () => {
    return (
        <div>
           
             <Navbar></Navbar>
           
            <Outlet></Outlet>
           
            <Footer></Footer>
           
        </div>
    );
};

export default Root;
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
            <Navbar></Navbar>
         <div className="flex-grow">  <Outlet></Outlet></div>
           <Footer></Footer>
        </div>
    );
};

export default MainLayout;
// import Home from "../../components/Home/Home";
import "../../App.css";
import Navbar from "../../components/Navber/Navbar";
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className="bg-color">
            <Navbar></Navbar>
            <Outlet></Outlet>
      
        </div>
    );
};

export default Main;
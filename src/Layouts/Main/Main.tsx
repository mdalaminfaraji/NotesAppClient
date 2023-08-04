// import Home from "../../components/Home/Home";

import Navbar from "../../components/Navber/Navbar";
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
      
        </div>
    );
};

export default Main;
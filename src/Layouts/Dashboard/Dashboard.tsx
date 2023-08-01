import Header from "./Header";
import {Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;
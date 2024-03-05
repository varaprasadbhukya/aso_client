import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const SideNav = () => {
    return (<>

        <div>
            <Sidebar />
            <Outlet />
        </div>

    </>
    )
};

export default SideNav;
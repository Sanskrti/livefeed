import AppRoutes from "../../Routes/Routes";
import SideBar from "../SideBarContainer/SideBarDisplay";

import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../Dashboard";
import LiveFeedPage from "../LiveFeedContainer/LiveFeedDisplay";
import UserManagement from "../../Routes/UserManagement";
import { useSelector } from "react-redux";

const RouteWrapper = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <SideBar />}
        <AppRoutes
          Dashboard={Dashboard}
          LiveFeedPage={LiveFeedPage}
          UserManagement={UserManagement}
        />
      </div>
    </Router>
  );
};

export default RouteWrapper;

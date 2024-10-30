import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Routes/UserManagement/store/Store";
import Sidebar from "./components/SideBarContainer/SideBarDisplay";
import Routes from "./Routes/Routes";
import LiveFeedPage from "./components/LiveFeedContainer";
import UserManagement from "./Routes/UserManagement";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Sidebar />
          <Routes 
            Dashboard={Dashboard} 
            LiveFeedPage={LiveFeedPage} 
            UserManagement={UserManagement} 
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

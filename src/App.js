import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Routes/UserManagement/store/Store';
import AppRoutes from './Routes/Routes';
// import Sidebar from './components/SideBarContainer/SideBarDisplay';


import Dashboard from './components/Dashboard';
import LiveFeedPage from "./components/LiveFeedContainer/LiveFeedDisplay";
import UserManagement from './Routes/UserManagement';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
        
          {/* <Sidebar /> */}
          <AppRoutes 
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

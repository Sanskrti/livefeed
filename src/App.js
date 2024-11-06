import React from "react";
import { Provider } from "react-redux";
import store from "./Routes/UserManagement/store/Store";
import RouteWrapper from "./components/RouteWrapper";

function App() {
  return (
    <Provider store={store}>
      <RouteWrapper />
    </Provider>
  );
}

export default App;

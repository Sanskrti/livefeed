import React from "react";
import { Link } from "react-router-dom";
import "./SideBarStyling.scss";
import { useDispatch } from "react-redux";
import { setUserAuthenticated } from "../../Routes/UserManagement/Reducers/userSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const pages = ["dashboard", "mango"];
  return (
    <div className="sidebar">
      <ul>
        <li>
          {pages.map((item, index) => (
            <Link to={item}>
              <span>{item}</span>
            </Link>
          ))}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

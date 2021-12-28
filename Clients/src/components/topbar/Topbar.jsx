import "./Topbar.css";

import { NavLink, Link } from "react-router-dom";
import { Context } from "../context/context";
import { useContext } from "react";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:8000/images/";
  const handleLogout = () => {
    const confirmLogout = prompt("CONFIRM");

    if (confirmLogout === "CONFIRM") {
      dispatch({ type: "LOG_OUT" });
      window.location.replace("/")
   
    }
  };
  return (
    <>
      <div className=" topIcon top">
        <div className=" topIcon topLeft">
          <i className=" topIcon fab fa-facebook"></i>
          <i className=" topIcon fab fa-twitter-square"></i>
          <i className=" topIcon fab fa-instagram"></i>
          <i className=" topIcon fab fa-whatsapp"></i>
        </div>
        <div className="topCenter">
          <ul className="listUl">
            <li className="topListItems">
              <NavLink to="/">
                <span>HOME </span>
              </NavLink>
            </li>

            <li className="topListItems">
              <NavLink to="/single">
                <span> SINGLE</span>
              </NavLink>
            </li>
            {
              user &&          <li className="topListItems">
              <NavLink to="/write">
                <span> PUBLISH</span>
              </NavLink>
            </li>
            }
   
            {user ? (
              <li className="topListItems" onClick={handleLogout}>
                <span> LOGOUT</span>
              </li>
            ) : (
              <>
                <li className="topListItems">
                  <NavLink to="/login">
                    <span> LOGIN</span>
                  </NavLink>
                </li>
                <li className="topListItems">
                  <NavLink to="/register">
                    <span> REGISTER</span>
                  </NavLink>
                </li>
              </>
            )}
        {  user && 
            <li className="topListItems">
              <NavLink to="/setting">
                <span> SETTING</span>
              </NavLink>
            </li>
}
          </ul>
        </div>
        <div className="topRight">
          <Link to={"/setting"}>
            {user && (
              <img className="topImg" src={PF + user.profilePic} alt="" />
            )}
          </Link>

          <i className=" topSearch fab fa-searchengin"></i>
        </div>
      </div>
    </>
  );
}

import "./Sidebar.css";
import SidebarImg from "../Img/profile.jpg";
import { useState } from "react";
import axiosCall from "../../Axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const res = await axiosCall.get("/category");

      setCat(res.data);
    };
    getCat();
  }, []);

  return (
    <>
      <div className="sideBar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img className="sideBarImg" src={SidebarImg} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora,
            vitae aut! Iste cupiditate necessitatibus odit iure adipisci placeat
            repellendus perspiciatis nesciunt. Id pariatur accusamus consectetur
            asperiores et magni ad magnam?
          </p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {cat.map((e, index) => (
              <Link key={index} to={`/?cat=${e.name}`}>
                <li className="sidebarListItems">{e.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className=" sidebarIcon fab fa-facebook"></i>
            <i className=" sidebarIcon fab fa-twitter-square"></i>
            <i className=" sidebarIcon fab fa-instagram"></i>
            <i className=" sidebarIcon fab fa-whatsapp"></i>
          </div>
        </div>
      </div>
    </>
  );
}

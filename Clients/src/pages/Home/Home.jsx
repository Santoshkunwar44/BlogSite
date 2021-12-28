import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";

import axiosCall from "../../Axios";
import "./Home.css";
export default function Home() {
  const { search } = useLocation();
  const [post, setpost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axiosCall.get("/posts" + search);
      setpost(request.data);
    }
    fetchData();
  }, [search]);

  return (
    <>
      <div className="home">
        <Header />
        <div className="Innerhome">
          {post === null ? <p> LOADING </p> : <Posts postes={post} />}

      
        </div>
      </div>
    </>
  );
}
